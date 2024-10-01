import { sql, type Kysely } from "kysely";
import { columnNotExists } from "./utils";
import { type DB } from "kysely-codegen";

export const seedRRweb = async (db: Kysely<DB>) => {
  await db.schema
    .createTable("rrweb")
    .ifNotExists()
    .addColumn("id", "text", (col) => col.primaryKey().notNull())
    .modifyEnd(sql`STRICT`)
    .execute();

  const { evaluate } = columnNotExists(db, "rrweb");

  if (await evaluate("created_at")) {
    await db.schema
      .alterTable("rrweb")
      .addColumn("created_at", "text", (col) => col.notNull())
      .execute();
  }

  if (await evaluate("data")) {
    await db.schema
      .alterTable("rrweb")
      .addColumn("data", "text", (col) => col.notNull())
      .execute();
  }

  if (await evaluate("timestamp")) {
    await db.schema
      .alterTable("rrweb")
      .addColumn("timestamp", "real", (col) => col.notNull())
      .execute();
  }

  if (await evaluate("type")) {
    await db.schema
      .alterTable("rrweb")
      .addColumn("type", "real", (col) => col.notNull())
      .execute();
  }

  if (await evaluate("ip")) {
    await db.schema
      .alterTable("rrweb")
      .addColumn("ip", "text", (col) => col.notNull())
      .execute();
  }

  if (await evaluate("session")) {
    await db.schema
      .alterTable("rrweb")
      .addColumn("session", "text")
      .execute();
  }
};
