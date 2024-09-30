/// <reference types="vitest" />

import { envField, getViteConfig } from "astro/config";
import tsConfig from "./tsconfig.json";
import { resolve } from "path";

import swc from "unplugin-swc";

const testResultDir = resolve(__dirname, "test-reporter");

export default getViteConfig(
  {
    test: {
      coverage: {
        enabled: true,
        // provider: 'istanbul',
        provider: "v8",
        reporter: ["html"],
        reportsDirectory: resolve(testResultDir, "coverage"),
        include: ["src/**/*.ts"],
        exclude: ["**/**.module.ts", "**/main.ts"],
      },
      outputFile: resolve(testResultDir, "index.html"),
      reporters: ["default", "html"],
      globals: true,
      root: "./",
      alias: {
        // @ts-ignore
        "#/": new URL(tsConfig.compilerOptions.baseUrl, import.meta.url)
          .pathname,
      },
    },
    plugins: [
      // @ts-ignore
      swc.vite({
        module: { type: "es6" },
      }),
    ],
  },
  {
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
  },
);
