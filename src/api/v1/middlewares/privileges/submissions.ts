import { Request, Response, NextFunction } from "express";
import User from "../../models/User/User";
import Course from "../../models/Course";
import Submission from "../../models/Submission";
import { generateError } from "../../helpers/errors";

export const canEditOrDeleteSubmission = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = req.user!._id;
    if (!userId) throw Error;
    const course = await Course.findById(req.params.id);
    const submission = await Submission.findOne({ _id: req.params.id, userId });

    if (!course) throw Error;
    const user = await User.findById(userId);
    if (user) {
      if (
        user.role === "admin" ||
        course.instructors.includes(userId) ||
        submission
      ) {
        next();
      } else throw Error;
    } else throw Error;
  } catch (err) {

    generateError(
      "User not authorized to edit or delete this homework or homework not found",
      403,
      next
    );
  }
};
