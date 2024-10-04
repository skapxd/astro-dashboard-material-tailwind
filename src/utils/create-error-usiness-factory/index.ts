class BusinessError<T> extends Error {
  metaData: T;

  constructor(name: string, message: string, metaData: T) {
    super(message);
    this.name = name;
    this.metaData = metaData;
  }
}

export const createErrorBusinessFactory = <T>(name: string) => {
  return class ExtendedBusinessError extends BusinessError<T> {
    constructor(message: string, metaData: T) {
      super(name, message, metaData);
    }
  };
};
