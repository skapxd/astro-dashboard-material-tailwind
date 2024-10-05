import { createErrorBusinessFactory } from ".";

describe("createErrorBusinessFactory", () => {
  // Instantiation of BusinessError with valid name, message, and metaData
  // Create an error class with a specific name and metadata
  it("should create an error class with the given name and metadata", () => {
    const ErrorClass = createErrorBusinessFactory<{ code: number }>(
      "CustomError",
    );
    const errorInstance = new ErrorClass("An error occurred", { code: 404 });

    expect(errorInstance).toBeInstanceOf(Error);
    expect(errorInstance.name).toBe("CustomError");
    expect(errorInstance.message).toBe("An error occurred");
    expect(errorInstance.metaData).toEqual({ code: 404 });
  });

  // Handle empty string as the error name
  it("should handle empty string as the error name", () => {
    const ErrorClass = createErrorBusinessFactory<null>("");
    const errorInstance = new ErrorClass("An error occurred", null);

    expect(errorInstance).toBeInstanceOf(Error);
    expect(errorInstance.name).toBe("");
    expect(errorInstance.message).toBe("An error occurred");
    expect(errorInstance.metaData).toBeNull();
  });

  it("should throw an error", () => {
    const ErrorClass = createErrorBusinessFactory<{ code: number }>(
      "CustomError",
    );

    const fn = () => {
      throw new ErrorClass("An error occurred", { code: 404 });
    };

    expect(fn).toThrowError(new ErrorClass("An error occurred", { code: 404 }));
  });
});
