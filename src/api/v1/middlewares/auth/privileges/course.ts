import { Request, Response, NextFunction } from "express";
import User from "../../../models/User/User";
import Course from "../../../models/Course";

export const canEditCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    const course = await Course.findById(req.params.id);
    if (user && course) {
      if (user.privileges?.course.includes("EDIT")) {
        if (user.role === "admin" || course.instructors.includes(user._id)) {
          req.course = course;
          next();
        } else throw Error;
      } else throw Error;
    } else throw Error;
  } catch (err) {
    const error: any = new Error("User not authenticated or Course not found");
    error.code = 401;
    next(error);
  }
};

export const canDeleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    const course = await Course.findById(req.params.id);
    if (user && course) {
      if (user.privileges?.course.includes("DELETE")) {
        if (user.role === "admin" || course.instructors.includes(user._id)) {
          req.course = course;
          next();
        } else throw Error;
      } else throw Error;
    } else throw Error;
  } catch (err) {
    const error: any = new Error("User not authenticated or Course not found");
    error.code = 401;
    next(error);
  }
};

export const canCreateCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    if (user) {
      if (user.privileges?.course.includes("CREATE")) {
        next();
      } else throw Error;
    } else throw Error;
  } catch (err) {
    const error: any = new Error("User not authenticated or Course not found");
    error.code = 401;
    next(error);
  }
};
