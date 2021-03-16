import { Request, Response, NextFunction } from "express";
import Course from "../models/Course";
import { ICourse } from "../interfaces/ICourse";
import User from "../models/User/User";
import { generateError } from "../helpers/errors";
import Activity from "../models/Activity/Activity";

// PUBLIC ROUTES
const viewAllCourses = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courses = await Course.find();
    res.status(201).send({ courses });
  } catch (err) {
    const message = "There was an error retrieving courses";
    generateError(message, 404, next);
  }
};


//PRIVATE ROUTES FOR AUTHORIZED TO SEE THE COUSE - USER + INSTRUCTOR + ALL ADMIN
const viewACourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const course = await Course.findById(req.params.id);
    res.status(201).send({ course });
  } catch (err) {
    const message = "There was an error retrieving this course";
    generateError(message, 404, next);
  }
};


const viewAllActivitiesByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const activities = await Activity.find({ courseId: req.params.id });
    res.status(201).send({ activities });
  } catch (err) {
    const message = "There was an error retrieving activities for this course";
    generateError(message, 404, next);
  }
};

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCourse: ICourse = new Course(req.body);
    const savedCourse = await newCourse.save();
    res.status(201).send({ course: savedCourse });
  } catch (err) {
    const error: any = new Error("There was an error with the course creation");
    error.code = 404;
    next(error);
  }
};

const editCourse = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const courseToEdit = req.course;
    await courseToEdit?.update({ $set: req.body });
    res.status(201).send({ course: courseToEdit });
  } catch (err) {
    const error: any = new Error("There was an error editing this course");
    error.code = 404;
    next(error);
  }
};
const deleteCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseToDelete = req.course;
    await courseToDelete.delete();
    res.status(201).send({ course: courseToDelete._id });
  } catch (err) {
    const error: any = new Error("There was an error deleting this course");
    error.code = 404;
    next(error);
  }
};

const addInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseToEdit = req.course;
    await courseToEdit?.update(
      { $addToSet: { instructors: req.params.userId } },
      { new: true }
    );
    res.status(201).send({ course: courseToEdit });
  } catch (err) {
    console.log;
    const error: any = new Error("There was an error adding the instructor");
    error.code = 404;
    next(error);
  }
};

const removeInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const courseToEdit = req.course;
    await courseToEdit?.update(
      { $pull: { instructors: req.params.userId } },
      { new: true }
    );
    res.status(201).send({ course: courseToEdit });
  } catch (err) {
    const error: any = new Error("There was an error removing the instructor");
    error.code = 404;
    next(error);
  }
};

const uploadPicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const picture = req.file && req.file.path;
    if (!picture) throw Error;
    const { course } = req;
    await course.update({ $set: { picture } });
    res.status(200).send({ picture });
  } catch (err) {
    const error: any = new Error("It was not possible to upload the picture");
    error.code = 401;
    next(error);
  }
};

export default {
  editCourse,
  createCourse,
  deleteCourse,
  addInstructor,
  removeInstructor,
  uploadPicture,
  viewAllCourses,
  viewAllActivitiesByCourse,
  viewACourse
};
