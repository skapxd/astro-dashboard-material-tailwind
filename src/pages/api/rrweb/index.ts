import type { APIRoute } from "astro";
import { RRwebDto } from "./dto";
import { db } from "#/src/db";
import { DateTime } from "luxon";
import { randomUUID } from "node:crypto";

export const prerender = false;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (request.headers.get("Content-Type") !== "application/json")
    return Response.json({ message: "Invalid content type" }, { status: 400 });

  const { data, timestamp, type } = await request
    .json()
    .then((body) => RRwebDto.create(body));

  await db.insertInto("rrweb")
    .values({
      created_at: DateTime.now().toISO(),
      id: randomUUID(),
      type: type,
      data: JSON.stringify(data),
      timestamp,
      ip: clientAddress,
    })
    .execute();

  return Response.json({ message: "Hello, world!" });
};
