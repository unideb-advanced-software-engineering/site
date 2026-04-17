import mermaid from "mermaid";

declare global {
  interface Window {
    __mermaidInitialized?: boolean;
  }
}

if (!window.__mermaidInitialized) {
  mermaid.initialize({
    startOnLoad: false,
    theme: "neutral",
    fontFamily: "inherit",
  });

  const renderMermaidDiagrams = async () => {
    await mermaid.run({ querySelector: ".mermaid" });
  };

  document.addEventListener("astro:page-load", renderMermaidDiagrams);
  window.__mermaidInitialized = true;

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderMermaidDiagrams, { once: true });
  } else {
    void renderMermaidDiagrams();
  }
}
