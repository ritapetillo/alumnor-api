import { Request, Response, NextFunction } from "express";
import User from "../../models/User";
import Course from "../../models/Course";


export const canEditCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.params.id)
    if (user && course)
     { if (user.priviledges?.csourse.includes("EDIT")) {
          if(user.role === 'admin' || course.instructors.includes(user._id)){
              req.course = course
              next()
          }
      } else 
    } else throw Error
  } catch (err) {
    const error: any = new Error("User not authenticated or Course not found");
    error.code = 401;
    next(error);
  }
};
