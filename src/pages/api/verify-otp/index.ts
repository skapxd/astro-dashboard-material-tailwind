import type { APIRoute } from "astro";
import { VerifyOtpDto } from "./dto";
import { db } from "#/src/db";

export const prerender = false;

export const POST: APIRoute = async ({ request, cookies }) => {
  if (request.headers.get("Content-Type") !== "application/json")
    return Response.json({ message: "Invalid content type" }, { status: 400 });

  try {
    const verifyOtpDto = await request
      .json()
      .then((body) => VerifyOtpDto.create(body));

    await db.transaction().execute(async (trx) => {
      const otp = await trx
        .selectFrom("otp")
        .selectAll()
        .where("email", "=", verifyOtpDto.email)
        .executeTakeFirstOrThrow();

      if (otp.code !== verifyOtpDto.code) throw new Error("Invalid OTP");

      await trx
        .deleteFrom("otp")
        .where("email", "=", verifyOtpDto.email)
        .executeTakeFirstOrThrow();
    });

    cookies.set("email", verifyOtpDto.email, { httpOnly: true, secure: true });

    return Response.json({ message: "success" }, { status: 200 });
  } catch (error) {
    if (error instanceof Error)
      return Response.json({ message: error.message }, { status: 400 });

    return Response.json({ message: error }, { status: 500 });
  }
};
