import { Request, Response, NextFunction } from "express";
import { decodeJWT } from "../../helpers/tokens";
import { RequestUser } from "../../interfaces/IRequest";

export const authenticateUser = async (
  req: any,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw Error;
    const decoded = await decodeJWT(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET!
    );
    if (!decoded) throw Error;
    const { _id, email } = decoded;

    req.user = { _id, email };
    next();
  } catch (err) {
    const error: any = new Error("User not authenticated");
    error.code = 401;
    next(error);
  }
};
