import { component, defineMarkdocConfig } from "@astrojs/markdoc/config";
import starlightMarkdoc from "@astrojs/starlight-markdoc";

const likeC4Component = component("./src/components/LikeC4View.astro");
const mermaidComponent = component("./src/components/Mermaid.astro");

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
      attributes: {
        chartFile: {
          type: String,
        },
      },
    },
  },
});
