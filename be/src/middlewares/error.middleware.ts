import { Request, Response, NextFunction } from "express";

type AppError = {
  message?: string;
  code?: string;
  status?: number;
  name?: string;
};

type ErrorResponse = {
  error: true;
  message: string;
  code: string;
};

const errorHandler = (error: AppError): ErrorResponse => {
  return {
    error: true,
    message: error.message || "An unknown error occurred",
    code: error.code || "UNKNOWN_ERROR",
  };
};

export const errorMiddleware = (
  error: AppError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const status = error.status || 400;
    const response = errorHandler(error);

    res.status(status).json(response);
  } catch (err) {
    const fallbackResponse = errorHandler({
      name: "FallbackError",
      message: "Unexpected error",
    });

    res.status(500).json(fallbackResponse);
  }
};