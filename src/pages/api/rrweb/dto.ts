import { IsNumber, IsObject } from "class-validator";
import type { Primitives } from "#/src/utils/utility-types/to-primitives";
import { validateArguments } from "#/src/utils/validate-arguments";

export class RRwebDto {
  async copyWith(args: Partial<Primitives<RRwebDto>>) {
    const dto = await RRwebDto.create({ ...this, ...args });

    return dto;
  }

  static async create(args: Primitives<RRwebDto>) {
    const dto = await validateArguments(args, RRwebDto);

    return dto;
  }

  @IsNumber()
  type: number;

  @IsObject()
  data: Record<string, any>;

  @IsNumber()
  timestamp: number;
}
