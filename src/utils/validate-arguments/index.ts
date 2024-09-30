import 'reflect-metadata';

import { validate } from "class-validator";
import { type ClassConstructor, plainToInstance } from "class-transformer";

export type ValidateArguments = <T extends object, U extends T>(
  input: T,
  cls: ClassConstructor<U>,
) => Promise<U>;

export const validateArguments: ValidateArguments = async (input, cls) => {
  const dto = plainToInstance(cls, input);

  const errors = await validate(dto);

  if (errors.length > 0) {
    throw new Error(JSON.stringify(errors, null, 2));
  }

  return dto;
};
