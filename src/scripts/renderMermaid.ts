import mermaid from "mermaid";

declare global {
  interface Window {
    __renderMermaidDiagrams?: () => Promise<void>;
  }
}

const mermaidWindow = window;

if (!mermaidWindow.__renderMermaidDiagrams) {
  mermaid.initialize({
    startOnLoad: false,
    theme: "neutral",
    fontFamily: "inherit",
  });

  mermaidWindow.__renderMermaidDiagrams = async () => {
    const diagrams = document.querySelectorAll(
      "[data-mermaid-diagram]:not([data-mermaid-rendered])",
    );

    for (const diagram of diagrams) {
      const source = diagram.querySelector("[data-mermaid-source]")?.textContent?.trim();
      const output = diagram.querySelector("[data-mermaid-output]");
      const error = diagram.querySelector("[data-mermaid-error]");

      if (!source || !(output instanceof HTMLElement) || !(error instanceof HTMLElement)) {
        continue;
      }

      diagram.setAttribute("data-mermaid-rendered", "");

      try {
        const id =
          typeof crypto.randomUUID === "function"
            ? `mermaid-${crypto.randomUUID()}`
            : `mermaid-${Math.random().toString(36).slice(2)}`;
        const { svg } = await mermaid.render(id, source);
        output.innerHTML = svg;
        error.hidden = true;
      } catch (cause) {
        output.textContent = "";
        error.textContent =
          cause instanceof Error ? cause.message : "Failed to render Mermaid diagram.";
        error.hidden = false;
      }
    }
  };

  const renderMermaidDiagrams = () => {
    void mermaidWindow.__renderMermaidDiagrams?.();
  };

  document.addEventListener("astro:page-load", renderMermaidDiagrams);

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderMermaidDiagrams, { once: true });
  } else {
    renderMermaidDiagrams();
  }
} else {
  void mermaidWindow.__renderMermaidDiagrams();
}
