import "dotenv/config";
// @ts-check
import { defineConfig, envField } from "astro/config";

import tailwind from "@astrojs/tailwind";

import vercel from "@astrojs/vercel/serverless";
import { seed } from "./seeder";
import { Cli as KyselyCodeGen } from "kysely-codegen";

await seed();

await new KyselyCodeGen().run([
  "--dialect",
  "libsql",
  "--url",
  process.env.DATABASE_URL!,
]);

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind()],
  output: "hybrid",
  adapter: vercel(),
  experimental: {
    serverIslands: true,
    env: {
      validateSecrets: true,
      schema: {
        DATABASE_URL: envField.string({
          context: "server",
          access: "secret",
        }),
        AUTH_TOKEN: envField.string({
          context: "server",
          access: "secret",
        }),
      },
    },
  },
});
