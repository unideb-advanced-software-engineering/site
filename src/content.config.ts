import { defineCollection, z } from "astro:content";
import { file } from "astro/loaders";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";
import yaml from "js-yaml";

const architectureStylesScenarioKatas = defineCollection({
  loader: file("src/content/architecture-styles-scenarios/katas.yml", {
    parser: (text) =>
      ((yaml.load(text) as { katas?: unknown[] } | undefined)?.katas ??
        []) as Array<Record<string, unknown>>,
  }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    users: z.array(z.string()),
    requirements: z.array(z.string()),
    additional_context: z.array(z.string()),
    optional_twist: z.array(z.string()).optional(),
  }),
});

const architectureStylesScenarioKatasEN = defineCollection({
  loader: file("src/content/architecture-styles-scenarios/katasEN.yml", {
    parser: (text) =>
      ((yaml.load(text) as { katas?: unknown[] } | undefined)?.katas ??
        []) as Array<Record<string, unknown>>,
  }),
  schema: z.object({
    id: z.number(),
    title: z.string(),
    description: z.string(),
    users: z.array(z.string()),
    requirements: z.array(z.string()),
    additional_context: z.array(z.string()),
    optional_twist: z.array(z.string()).optional(),
  }),
});

export const collections = {
  docs: defineCollection({ loader: docsLoader(), schema: docsSchema() }),
  architectureStylesScenarioKatas,
  architectureStylesScenarioKatasEN,
};
