import { IsEmail, IsString, Length } from "class-validator";
import type { Primitives } from "#/src/utils/utility-types/to-primitives";
import { validateArguments } from "#/src/utils/validate-arguments";

export class VerifyOtpDto {
  async copyWith(args: Partial<Primitives<VerifyOtpDto>>) {
    const dto = await VerifyOtpDto.create({ ...this, ...args });

    return dto;
  }

  static async create(args: Primitives<VerifyOtpDto>) {
    const dto = await validateArguments(args, VerifyOtpDto);

    return dto;
  }

  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @Length(6, 6)
  code: string;
}
