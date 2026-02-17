// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// https://astro.build/config
export default defineConfig({
  site: "https://unideb-advanced-software-engineering.github.io",
  base: "/site",
  integrations: [
    starlight({
      title: "Szoftverrendszerek tervezése",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/unideb-advanced-software-engineering/site",
        },
      ],
      sidebar: [
        {
          label: "Gyakorlatok",
          autogenerate: { directory: "classes" },
        },
        {
          label: "Esettanulmányok",
          autogenerate: { directory: "scenarios" },
        },
      ],
    }),
  ],
});
