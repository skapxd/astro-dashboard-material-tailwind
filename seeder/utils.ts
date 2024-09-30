import { sql, type Kysely } from "kysely";
import { type DB } from "kysely-codegen";

export const columnNotExists = async (
  db: Kysely<DB>,
  tableName: string,
  columnName: string,
): Promise<boolean> => {
  const columns2 =
    await sql`PRAGMA table_info(${sql.table(tableName)})`.execute(db);

  for (const element of columns2.rows) {
    if (element == null) continue;
    if (typeof element !== "object") continue;
    if ("name" in element === false) continue;

    if (element.name === columnName) return false;
  }

  return true;
};
