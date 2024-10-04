import { createJwt } from ".";

describe("JWT", () => {
  // Generates a valid JWT for a given email
  it("should generate a valid JWT when a valid email is provided", () => {
    const email = "test@example.com";
    const jwt = createJwt({ email });
    expect(jwt).toBeDefined();
    expect(typeof jwt).toBe("string");
  });

  // Handles empty email string gracefully
  it("should handle empty email string gracefully", () => {
    const email = "";
    const jwt = createJwt({ email });
    expect(jwt).toBeDefined();
    expect(typeof jwt).toBe("string");
  });
});
