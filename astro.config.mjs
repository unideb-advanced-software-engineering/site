// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: "https://unideb-advanced-software-engineering.github.io",
  base: "/site",
  integrations: [
    starlight({
      title: {
        hu: "Szoftverrendszerek tervezése",
        en: "Advanced Software Engineering",
      },
      customCss: ["./src/styles/custom.css"],
      defaultLocale: "hu",
      locales: {
        en: {
          label: "English",
        },
        hu: {
          label: "Magyar",
        },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/unideb-advanced-software-engineering",
        },
      ],
      sidebar: [
        {
          label: "Általános",
          translations: {
            en: "General",
          },
          autogenerate: { directory: "general" },
        },
        {
          label: "Nappali gyakorlatok",
          translations: {
            en: "Classes",
          },
          autogenerate: { directory: "classes" },
        },
        {
          label: "Esettanulmányok",
          translations: {
            en: "Scenarios",
          },
          collapsed: true,
          autogenerate: { directory: "scenarios" },
        },
      ],
    }),
    markdoc(),
  ],
});
