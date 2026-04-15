import { component, defineMarkdocConfig } from "@astrojs/markdoc/config";
import starlightMarkdoc from "@astrojs/starlight-markdoc";

export default defineMarkdocConfig({
  extends: [starlightMarkdoc()],
  tags: {
    likec4: {
      render: component("./src/components/LikeC4View.astro"),
      attributes: {
        viewId: {
          type: String,
        },
      },
    },
  },
});
