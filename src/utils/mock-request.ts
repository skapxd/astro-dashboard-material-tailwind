import type {
  APIRoute,
  AstroCookies,
  RewritePayload,
  ValidRedirectStatus,
} from "astro";
import type {
  ActionAccept,
  ActionClient,
  ActionReturnType,
} from "astro:actions";
import type { ZodType } from "astro:schema";

interface Params extends Partial<Parameters<APIRoute>[0]> {
  url: URL;
}

export const mockRequest = (params: Params) => ({
  params: {},
  request: new Request(params.url),
  site: undefined,
  generator: "",
  props: {},
  redirect: function (path: string, status?: ValidRedirectStatus): Response {
    throw new Error("Function not implemented.");
  },
  rewrite: function (rewritePayload: RewritePayload): Promise<Response> {
    throw new Error("Function not implemented.");
  },
  locals: {},
  preferredLocale: undefined,
  preferredLocaleList: undefined,
  currentLocale: undefined,
  clientAddress: "",
  cookies: {} as AstroCookies,
  getActionResult: function <
    TAccept extends ActionAccept,
    TInputSchema extends ZodType,
    TAction extends ActionClient<unknown, TAccept, TInputSchema>,
  >(action: TAction): ActionReturnType<TAction> | undefined {
    throw new Error("Function not implemented.");
  },
  callAction: function <
    TAccept extends ActionAccept,
    TInputSchema extends ZodType,
    TOutput,
    TAction extends
      | ActionClient<TOutput, TAccept, TInputSchema>
      | ActionClient<TOutput, TAccept, TInputSchema>["orThrow"],
  >(
    action: TAction,
    input: Parameters<TAction>[0],
  ): Promise<ActionReturnType<TAction>> {
    throw new Error("Function not implemented.");
  },
  ...params,
});
