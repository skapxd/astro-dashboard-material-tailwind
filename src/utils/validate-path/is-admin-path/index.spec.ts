import { isAdminPath } from ".";

describe("isAdminPath", () => {
  it("should to be valid if admin path", () => {
    const url = new URL("https://example.com/admin");
    expect(isAdminPath(url)).toBe(true);
  });

  it("should to be valid if nested admin path", () => {
    const url = new URL("https://example.com/admin/123");
    expect(isAdminPath(url)).toBe(true);
  });

  it("should to be not valid if not admin path", () => {
    const url = new URL("https://example.com/");
    expect(isAdminPath(url)).toBe(false);
  });
});
