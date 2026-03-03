use std::env;
use std::fs;
use std::path::{Path, PathBuf};

use anyhow::{Context, Result, bail};
use serde::Deserialize;
use typst::diag::{FileError, FileResult, SourceDiagnostic, Warned};
use typst::foundations::Bytes;
use typst::layout::PagedDocument;
use typst::syntax::{FileId, Source, VirtualPath};
use typst::text::{Font, FontBook};
use typst::utils::LazyHash;
use typst::{Library, LibraryExt, World};
use typst_kit::fonts::{FontSlot, Fonts};
use typst_pdf::PdfOptions;

fn main() -> Result<()> {
    let options = CliOptions::parse(env::args().skip(1))?;
    let yaml = fs::read_to_string(&options.input)
        .with_context(|| format!("failed to read {}", options.input.display()))?;
    let template = fs::read_to_string(&options.template)
        .with_context(|| format!("failed to read {}", options.template.display()))?;
    let document = serde_yaml::from_str::<KataFile>(&yaml)
        .with_context(|| format!("failed to parse {}", options.input.display()))?;
    let typst_source = build_typst_document(&template, &document)?;
    let world = RenderWorld::new(typst_source);

    let Warned { output, warnings } = typst::compile::<PagedDocument>(&world);
    for warning in &warnings {
        eprintln!("warning: {}", format_diagnostic(warning));
    }

    let rendered = output.map_err(|errors| {
        anyhow::anyhow!(
            "typst compilation failed:\n{}",
            errors
                .iter()
                .map(format_diagnostic)
                .collect::<Vec<_>>()
                .join("\n")
        )
    })?;

    let pdf = typst_pdf::pdf(&rendered, &PdfOptions::default())
        .map_err(|errors| anyhow::anyhow!(render_pdf_errors(&errors)))?;

    if let Some(parent) = options.output.parent() {
        fs::create_dir_all(parent)
            .with_context(|| format!("failed to create {}", parent.display()))?;
    }

    fs::write(&options.output, pdf)
        .with_context(|| format!("failed to write {}", options.output.display()))?;

    println!(
        "Rendered {} katas to {}",
        document.katas.len(),
        options.output.display()
    );

    Ok(())
}

#[derive(Debug)]
struct CliOptions {
    input: PathBuf,
    template: PathBuf,
    output: PathBuf,
}

impl CliOptions {
    fn parse(args: impl Iterator<Item = String>) -> Result<Self> {
        let mut input = PathBuf::from("../../src/content/architecture-styles-scenarios/katas.yml");
        let mut template = PathBuf::from("./template.typ");
        let mut output = PathBuf::from("./architecture-styles-scenarios-katas.pdf");
        let mut args = args.peekable();

        while let Some(arg) = args.next() {
            match arg.as_str() {
                "--input" | "-i" => {
                    let value = args.next().context("missing value for --input")?;
                    input = PathBuf::from(value);
                }
                "--output" | "-o" => {
                    let value = args.next().context("missing value for --output")?;
                    output = PathBuf::from(value);
                }
                "--template" | "-t" => {
                    let value = args.next().context("missing value for --template")?;
                    template = PathBuf::from(value);
                }
                "--help" | "-h" => {
                    print_usage();
                    std::process::exit(0);
                }
                other => bail!("unknown argument: {other}"),
            }
        }

        Ok(Self {
            input,
            template,
            output,
        })
    }
}

fn print_usage() {
    println!(
        "Usage: cargo run --manifest-path scripts/render-katas/Cargo.toml -- [--input <path>] [--template <path>] [--output <path>]"
    );
}

#[derive(Debug, Deserialize)]
struct KataFile {
    #[serde(default)]
    katas: Vec<Kata>,
}

#[derive(Debug, Deserialize)]
struct Kata {
    id: u32,
    title: String,
    description: String,
    #[serde(default)]
    users: Vec<String>,
    #[serde(default)]
    requirements: Vec<String>,
    #[serde(default)]
    additional_context: Vec<String>,
    #[serde(default)]
    optional_twist: Vec<String>,
    #[serde(default)]
    solutions: Vec<Solution>,
}

#[derive(Debug, Deserialize)]
struct Solution {
    style: String,
    justification: String,
}

fn build_typst_document(template: &str, file: &KataFile) -> Result<String> {
    let katas = file
        .katas
        .iter()
        .map(|kata| {
            format!(
                concat!(
                    "  (\n",
                    "    id: {},\n",
                    "    title: {},\n",
                    "    description: {},\n",
                    "    users: {},\n",
                    "    requirements: {},\n",
                    "    additional_context: {},\n",
                    "    optional_twist: {},\n",
                    "    solutions: {},\n",
                    "  ),\n"
                ),
                kata.id,
                typst_string(&kata.title),
                typst_string(&kata.description),
                typst_string_list(&kata.users),
                typst_string_list(&kata.requirements),
                typst_string_list(&kata.additional_context),
                typst_optional_string_list(&kata.optional_twist),
                typst_solution_list(&kata.solutions),
            )
        })
        .collect::<String>();

    template.replace("{{KATAS}}", &katas).pipe(Ok)
}

fn typst_string(value: &str) -> String {
    let mut out = String::with_capacity(value.len() + 2);
    out.push('"');

    for ch in value.chars() {
        match ch {
            '\\' => out.push_str("\\\\"),
            '"' => out.push_str("\\\""),
            '\n' => out.push_str("\\n"),
            '\r' => out.push_str("\\r"),
            '\t' => out.push_str("\\t"),
            _ => out.push(ch),
        }
    }

    out.push('"');
    out
}

fn typst_string_list(values: &[String]) -> String {
    if values.is_empty() {
        return "()".to_string();
    }

    let items = values
        .iter()
        .map(|value| format!("  {},\n", typst_string(value)))
        .collect::<String>();

    format!("(\n{})", items)
}

fn typst_optional_string_list(values: &[String]) -> String {
    if values.is_empty() {
        "none".to_string()
    } else {
        typst_string_list(values)
    }
}

fn typst_solution_list(values: &[Solution]) -> String {
    if values.is_empty() {
        return "()".to_string();
    }

    let items = values
        .iter()
        .map(|solution| {
            format!(
                "  (style: {}, justification: {}),\n",
                typst_string(&solution.style),
                typst_string(&solution.justification),
            )
        })
        .collect::<String>();

    format!("(\n{})", items)
}

fn render_pdf_errors(errors: &[SourceDiagnostic]) -> String {
    format!(
        "failed to encode PDF:\n{}",
        errors
            .iter()
            .map(format_diagnostic)
            .collect::<Vec<_>>()
            .join("\n")
    )
}

fn format_diagnostic(diagnostic: &SourceDiagnostic) -> String {
    let mut message = diagnostic.message.to_string();

    if !diagnostic.hints.is_empty() {
        message.push_str(" (");
        message.push_str(
            &diagnostic
                .hints
                .iter()
                .map(ToString::to_string)
                .collect::<Vec<_>>()
                .join("; "),
        );
        message.push(')');
    }

    message
}

trait Pipe: Sized {
    fn pipe<T>(self, f: impl FnOnce(Self) -> T) -> T {
        f(self)
    }
}

impl<T> Pipe for T {}

struct RenderWorld {
    main: FileId,
    source: Source,
    library: LazyHash<Library>,
    book: LazyHash<FontBook>,
    fonts: Vec<FontSlot>,
}

impl RenderWorld {
    fn new(source_text: String) -> Self {
        let main = FileId::new_fake(VirtualPath::new("main.typ"));
        let source = Source::new(main, source_text);
        let fonts = Fonts::searcher().search();

        Self {
            main,
            source,
            library: LazyHash::new(Library::builder().build()),
            book: LazyHash::new(fonts.book),
            fonts: fonts.fonts,
        }
    }

    fn missing_file(id: FileId) -> FileError {
        FileError::NotFound(Path::new("/").join(id.vpath().as_rootless_path()))
    }
}

impl World for RenderWorld {
    fn library(&self) -> &LazyHash<Library> {
        &self.library
    }

    fn book(&self) -> &LazyHash<FontBook> {
        &self.book
    }

    fn main(&self) -> FileId {
        self.main
    }

    fn source(&self, id: FileId) -> FileResult<Source> {
        if id == self.main {
            Ok(self.source.clone())
        } else {
            Err(Self::missing_file(id))
        }
    }

    fn file(&self, id: FileId) -> FileResult<Bytes> {
        Err(Self::missing_file(id))
    }

    fn font(&self, index: usize) -> Option<Font> {
        self.fonts.get(index)?.get()
    }

    fn today(&self, _offset: Option<i64>) -> Option<typst::foundations::Datetime> {
        None
    }
}
