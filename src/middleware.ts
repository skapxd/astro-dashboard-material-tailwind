import { defineMiddleware } from "astro:middleware";
import { verifyJwt } from "./utils/jwt";
import { createErrorBusinessFactory } from "./utils/create-error-business-factory";
import { isAdminPath } from "./utils/validate-path/is-admin-path";

export const MiddlewareError = createErrorBusinessFactory("MiddlewareError");

export const onRequest = defineMiddleware(async (context, next) => {
  try {
    if (isAdminPath(context.url)) {
      const cookieToken = context.cookies.get("jwt");
      if (!cookieToken)
        throw new MiddlewareError("Token is falsy", cookieToken);

      await verifyJwt({ token: cookieToken.value });
      return next();
    }

    return next();
  } catch (error) {
    context.cookies.delete("jwt");

   return next(
      new Request(context.url.origin, {
        headers: {
          "x-redirect-to": context.url.origin,
        },
      }),
    );
  }
});
