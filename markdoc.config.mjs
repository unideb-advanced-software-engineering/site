import { Markdoc, component, defineMarkdocConfig } from "@astrojs/markdoc/config";
import starlightMarkdoc from "@astrojs/starlight-markdoc";

const likeC4Component = component("./src/components/LikeC4View.astro");
const mermaidComponent = component("./src/components/Mermaid.astro");

function extractMarkdocText(node) {
  if (!node) {
    return "";
  }

  if (Array.isArray(node)) {
    return node.map(extractMarkdocText).join("");
  }

  switch (node.type) {
    case "text":
      return node.attributes?.content ?? "";
    case "softbreak":
    case "hardbreak":
      return "\n";
    case "paragraph": {
      const content = extractMarkdocText(node.children);
      return content ? `${content}\n` : "";
    }
    default:
      return extractMarkdocText(node.children);
  }
}

export default defineMarkdocConfig({
  extends: [starlightMarkdoc()],
  tags: {
    likec4: {
      render: likeC4Component,
      attributes: {
        viewId: {
          type: String,
        },
      },
    },
    mermaid: {
      render: mermaidComponent,
      transform(node) {
        return new Markdoc.Tag(this.render, {
          chart: extractMarkdocText(node.children).trim(),
        });
      },
    },
  },
});
