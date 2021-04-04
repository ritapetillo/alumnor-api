import { Request, Response, NextFunction } from "express";
import User from "../../models/User/User";
import Course from "../../models/Course";
import Enrollment from "../../models/Enrollment";
import { generateError } from "../../helpers/errors";
import { encodeJWT } from "../../helpers/tokens";
import mongoose from "mongoose";
import { IEnrollment } from "../../interfaces/IEnrollment";

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
    console.log(err);
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
    const course = await Course.findById(req.params.id);
    const enrollments = await Enrollment.find({
      userId: userId,
    });
    const enrollment = enrollments.find((enrollment: IEnrollment) => {
      return (
        enrollment.courseId.toString() === req.params.id || req.params.courseId
      );
    });
    const isIntructor = course?.instructors.includes(userId!);

    const user = await User.findById(userId);
    if (!user) throw Error;

    if (user.role === "admin" || isIntructor || enrollment) {
      return next();
    } else {
      console.log("ffs");
    }
  } catch (err) {
    console.log(err);
    console.log("sdsd");
    generateError(
      "User not authorized to view this course or course not found",
      403,
      next
    );
  }
};
