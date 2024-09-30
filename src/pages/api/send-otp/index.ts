import type { APIRoute } from "astro";
import { OTP } from "./dto";
import { randomUUID } from "crypto";
import { readFile } from "fs/promises";
import { join } from "path";
import { db } from "#/src/db";
import { DateTime } from "luxon";
import { fileURLToPath } from "node:url";
export const prerender = false;

const __filename = fileURLToPath(import.meta.url);
const __dirname = join(__filename, "..");

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") !== "application/json")
    return Response.json({ message: "Invalid content type" }, { status: 400 });

  const { email } = await request?.json().then((body) => OTP.create(body));

  const code = randomUUID().replace(/-/g, "").substring(0, 6).toUpperCase();

  const html = await readFile(join(__dirname, "template.html"), "utf-8").then(
    (file) => file.replace("{{OTP_CODE}}", code),
  );

  const body = JSON.stringify({
    to: email,
    subject: "OTP Code to login",
    html,
  });

  await fetch("https://send-email.skapxd.dev/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      accept: "*/*",
    },
    body,
  });

  await db
    .insertInto("otp")
    .values({
      id: randomUUID(),
      code,
      created_at: DateTime.now().toISO(),
      email,
    })
    .execute();

  return Response.json({ message: "Hello, world!" });
};
