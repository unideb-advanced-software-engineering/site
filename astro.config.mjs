// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import { LikeC4VitePlugin } from "likec4/vite-plugin";

import markdoc from "@astrojs/markdoc";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  site: "https://unideb-advanced-software-engineering.github.io",
  base: "/site",
  vite: {
    plugins: [LikeC4VitePlugin({})],
  },
  integrations: [starlight({
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
  }), markdoc(), react()],
});