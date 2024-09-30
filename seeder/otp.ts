import { sql, type Kysely } from "kysely";
import { columnNotExists } from "./utils";
import { type DB } from "kysely-codegen";

export const seedOtp = async (db: Kysely<DB>) => {
  await db.schema
    .createTable("otp")
    .ifNotExists()
    .addColumn("id", "text", (col) => col.primaryKey().notNull())
    .modifyEnd(sql`STRICT`)
    .execute();

  if (await columnNotExists(db, "otp", "created_at")) {
    await db.schema
      .alterTable("otp")
      .addColumn("created_at", "text", (col) => col.notNull())
      .execute();
  }

  if (await columnNotExists(db, "otp", "email")) {
    await db.schema
      .alterTable("otp")
      .addColumn("email", "text", (col) => col.notNull())
      .execute();
  }

  if (await columnNotExists(db, "otp", "code")) {
    await db.schema
      .alterTable("otp")
      .addColumn("code", "text", (col) => col.notNull())
      .execute();
  }
};
