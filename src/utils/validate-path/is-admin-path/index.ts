// Carga condicional del módulo ESM (Node.js y navegador)
// @ts-ignore: Property 'UrlPattern' does not exist
if (!globalThis.URLPattern) {
  await import("urlpattern-polyfill");
}

const exactAdminPattern = new URLPattern({ pathname: "/admin" });
const nestedAdminPattern = new URLPattern({ pathname: "/admin/*" });

export const isAdminPath = (url: URL): boolean => {
  return exactAdminPattern.test(url) || nestedAdminPattern.test(url);
};
