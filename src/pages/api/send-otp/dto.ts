import { IsEmail, IsString, MaxLength } from "class-validator";
import type { Primitives } from "#/src/utils/utility-types/to-primitives";
import { validateArguments } from "#/src/utils/validate-arguments";

export class OtpDto {
  async copyWith(args: Partial<Primitives<OtpDto>>) {
    const dto = await OtpDto.create({ ...this, ...args });

    return dto;
  }

  static async create(args: Primitives<OtpDto>) {
    const dto = await validateArguments(args, OtpDto);

    return dto;
  }

  @IsString()
  @IsEmail()
  @MaxLength(50)
  email: string;
}
