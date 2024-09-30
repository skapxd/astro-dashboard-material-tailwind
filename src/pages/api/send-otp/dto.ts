import { IsEmail, IsString, MaxLength } from "class-validator";
import type { Primitives } from "#/src/utils/utility-types/to-primitives";
import { validateArguments } from "#/src/utils/validate-arguments";

export class OTP {
  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;

  async copyWith(args: Partial<Primitives<OTP>>) {
    const dto = await OTP.create({ ...this, ...args });

    return dto;
  }

  static async create(args: Primitives<OTP>) {
    const dto = await validateArguments(args, OTP);

    return dto;
  }
}
