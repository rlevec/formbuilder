type ErrorExtra = Record<string, unknown>;

type ErrorData = {
  status: number;
  message: string;
} & ErrorExtra;

export class CustomError extends Error {
  public data: ErrorData;

  constructor(status: number, message: string, extra: ErrorExtra = {}) {
    super(message);

    this.name = "CustomError";

    this.data = {
      status,
      message,
      ...extra,
    };

    Object.setPrototypeOf(this, new.target.prototype);

    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
  }
}

export const throwNewError = (
  status: number,
  message: string,
  extra: ErrorExtra = {}
): never => {
  throw new CustomError(status, message, extra);
};