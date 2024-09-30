import { AUTH_TOKEN, DATABASE_URL } from "astro:env/server";
import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from "kysely";
import { type DB } from "kysely-codegen";

export const db = new Kysely<DB>({
  dialect: new LibsqlDialect({
    url: DATABASE_URL,
    authToken: AUTH_TOKEN,
  }),
});
