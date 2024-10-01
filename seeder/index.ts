import { LibsqlDialect } from "@libsql/kysely-libsql";
import { Kysely } from "kysely";
import { seedOtp } from "./otp";
import { type DB } from "kysely-codegen";
import { seedRRweb } from "./rrweb";

const db = new Kysely<DB>({
  dialect: new LibsqlDialect({
    url: process.env.DATABASE_URL!,
    authToken: process.env.AUTH_TOKEN!,
  }),
});

export const seed = async () => {
  await seedOtp(db);
  await seedRRweb(db);
};
