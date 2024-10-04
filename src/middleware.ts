import { defineMiddleware } from "astro:middleware";
import { verifyJwt } from "./utils/jwt";
import { createErrorBusinessFactory } from "./utils/create-error-usiness-factory";

export const MiddlewareError = createErrorBusinessFactory("MiddlewareError");

// `context` and `next` are automatically typed
export const onRequest = defineMiddleware(async (context, next) => {
  try {
    if (context.url.pathname.match(/admin/)) {
      const cookieToken = context.cookies.get("jwt");
      if (!cookieToken)
        throw new MiddlewareError("Token is falsy", cookieToken);

      await verifyJwt({ token: cookieToken.value });
      return next();
    }
    return next();
  } catch (error) {
    return next(
      new Request(context.url.origin, {
        headers: {
          "x-redirect-to": context.url.origin,
        },
      }),
    );
  }
});
