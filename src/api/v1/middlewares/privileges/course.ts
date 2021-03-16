import { Request, Response, NextFunction } from "express";
import User from "../../models/User/User";
import Course from "../../models/Course";
import Enrollment from "../../models/Enrollment";
import { generateError } from "../../helpers/errors";

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

export const canAttendCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!._id;
    if (!userId) throw Error;
    const course = await Course.findById(req.params.id);
    const enrollment = await Enrollment.findOne({
      courseId: req.params.courseId,
      userId: userId,
    });
    if (!course) throw Error;
    const user = await User.findById(userId);
    if (user) {
      if (
        user.role === "admin" ||
        course.instructors.includes(userId) ||
        enrollment
      ) {
        next();
      } else throw Error;
    } else throw Error;
  } catch (err) {
    generateError(
      "User not authorized to view this course or course not found",
      403,
      next
    );
  }
};
