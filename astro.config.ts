import "dotenv/config";
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
        NODE_ENV_C: envField.string({
          context: "client",
          access: "public",
        }),
        NODE_ENV_S: envField.string({
          context: "server",
          access: "public",
        }),
        SECRET_JWT: envField.string({
          context: "server",
          access: "secret",
        }),
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
