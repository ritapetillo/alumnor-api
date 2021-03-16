import { Request, Response, NextFunction } from "express";
import User from "../../../models/User/User";
import { generateError } from "../../../helpers/errors";

export const canCreatetCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    if (user?.privileges?.category.includes("CREATE")) {
      next();
    } else throw Error;
  } catch (err) {
    const message = "User not authorized to create a category";
    generateError(message, 403, next);
  }
};

export const canEditCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    if (user?.privileges?.category.includes("EDIT")) {
      next();
    } else throw Error;
  } catch (err) {
    const message = "User not authorized to edit the category";
    generateError(message, 403, next);
  }
};

export const canDeleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    if (user) {
      if (user.privileges?.category.includes("DELETE")) {
        next();
      }
    }
  } catch (err) {
    console.log(err);
    const message = "User not authorized to delete this category";
    generateError(message, 403, next);
  }
};
