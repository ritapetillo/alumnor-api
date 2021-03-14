import { Request, Response, NextFunction } from "express";
import config from "../../../../Config";
import { decodeJWT } from "../../helpers/tokens";
import { RequestUser } from "../../interfaces/IRequest";
import User from "../../models/User";

export const authenticateUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { accessToken } = req.cookies;
    if (!accessToken) throw Error;
    const decoded = await decodeJWT(accessToken, config.ACCESS_TOKEN_SECRET!);
    if (!decoded) throw Error;
    const { _id, email } = decoded;

    const authUser = await User.findById(_id);
    if (authUser?.verified) {
      req.user = { _id, email };
      next();
    } else {
      const error: any = new Error("Please verify your email");
      error.code = 404;
      next(error);
    }
  } catch (err) {
    const error: any = new Error("User not authenticated");
    error.code = 401;
    next(error);
  }
};
