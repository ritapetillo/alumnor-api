import { Request, Response, NextFunction } from "express";
import User from "../../models/User/User";
import Course from "../../models/Course";
import { generateError } from "../../helpers/errors";

export const canEditSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    const course = await Course.findById(req.params.courseId);
    if (user && course) {
      if (user.privileges?.course.includes("EDIT")) {
        if (user.role === "admin" || course.instructors.includes(user._id)) {
          next();
        } else throw Error;
      } else throw Error;
    } else throw Error;
  } catch (err) {
    generateError("User not authorized to edit this section", 403, next);
  }
};

export const canDeleteSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    const course = await Course.findById(req.params.courseId);
    if (user && course) {
      if (user.privileges?.course.includes("DELETE")) {
        if (user.role === "admin" || course.instructors.includes(user._id)) {
          next();
        } else throw Error;
      } else throw Error;
    } else throw Error;
  } catch (err) {
    generateError("User not authorized to delete this section", 403, next);
  }
};

export const canCreateSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    const course = await Course.findById(req.params.courseId);
    if (user && course) {
      if (user.privileges?.course.includes("CREATE")) {
        if (user.role === "admin" || course.instructors.includes(user._id)) {
          next();
        } else throw Error;
      } else throw Error;
    } else throw Error;
  } catch (err) {
    generateError("User not authorized to create sections for this course", 403, next);
  }
};


