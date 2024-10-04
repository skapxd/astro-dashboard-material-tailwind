import jwt, { type JwtPayload } from "jsonwebtoken";
import { SECRET_JWT } from "astro:env/server";
import { createErrorBusinessFactory } from "../create-error-usiness-factory";

export interface CreateJwtProps {
  email: string;
}

export const JwtError = createErrorBusinessFactory("JwtError");

export const createJwt = (props: CreateJwtProps) => {
  const { email } = props ?? {};

  return jwt.sign({ email }, SECRET_JWT, {
    expiresIn: "30d",
  });
};

export interface VerifyJwtProps {
  token: string;
}

export const verifyJwt = async (props: VerifyJwtProps) => {
  const { token } = props ?? {};

  const payload = jwt.verify(token, SECRET_JWT) as JwtPayload;

  if (!payload) throw new JwtError("Token is falsy", payload);

  if (Date.now() > payload.exp!)
    throw new JwtError("Token is expired", payload);

  return payload;
};
