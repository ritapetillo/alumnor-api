import { Request, Response, NextFunction } from "express";
import User from "../../models/User/User";
import { generateError } from "../../helpers/errors";

export const canEditEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    if (user?.privileges?.enrollment.includes("EDIT")) {
      next();
    } else throw Error;
  } catch (err) {
    const message = "User not authorized to edit this enrollment";
    generateError(message, 403, next);
  }
};

export const canReadEnrollments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    if (user?.privileges?.enrollment.includes("READ")) {
      next();
    } else throw Error;
  } catch (err) {
    const message = "User not authorized to view enrollments";
    generateError(message, 403, next);
  }
};

export const canDeleteEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    if (user) {
      if (user.privileges?.enrollment.includes("DELETE")) {
        next();
      }
    }
  } catch (err) {
    console.log(err);
    const message = "User not authorized to delete this enrollment";
    generateError(message, 403, next);
  }
};
