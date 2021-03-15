import { NextFunction } from "express-serve-static-core";

export const generateError = (
  message: string,
  code: number,
  next: NextFunction
) => {
  const error: any = new Error(message);
  error.code = code;
  next(error);
};
