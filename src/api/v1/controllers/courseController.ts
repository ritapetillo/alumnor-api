import { Request, Response, NextFunction } from "express";
import Course from "../models/Course";
import { ICourse } from "../interfaces/ICourse";
import User from "../models/User";

const createCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const user = await User.findById(req.user!._id);
    if (!user) throw Error("You must be authenitcated first");
    if (!user.priviledges?.course.includes("CREATE"))
      throw Error("You cannot create a course");
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
    const user = await User.findById(req.user!._id);
    const courseToEdit = await Course.findById(req.params.id, { new: true });
    if (!user) throw Error("You must be authenitcated first");
    if (
      user.priviledges?.course.includes("EDIT") ||
      courseToEdit?.instructors.includes(user._id)
    ){
 await courseToEdit?.update({ $set: req.body });
    res.status(201).send({ course: courseToEdit });
    } else throw Error("You cannot edit this course");
   
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
    const user = await User.findById(req.user!._id);
    const courseToDelete = await Course.findById(req.params.id);
    if (!courseToDelete) throw Error;
    if (!user) throw Error("You must be authenitcated first");
    if (
      user.priviledges?.course.includes("DELETE") ||
      courseToDelete.instructors.includes(user._id)
    ){
       await courseToDelete.delete();
    res.status(201).send({ course: courseToDelete._id });
    } else
      throw Error("You cannot delete this course");
   
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
    const user = await User.findById(req.user!._id);
    const courseToEdit = await Course.findById(req.params.id);
    console.log(user?.priviledges?.course.includes("EDIT"));

    if (!user) throw Error("You must be authenitcated first");
    if (
      user.priviledges?.course.includes("EDIT") ||
      courseToEdit?.instructors.includes(user._id)
    ) {
      await courseToEdit?.update(
        { $addToSet: { instructors: req.params.userId } },
        { new: true }
      );
      res.status(201).send({ course: courseToEdit });
    } else {
      throw Error("You cannot edit this course");
    }
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
const user = await User.findById(req.user!._id);
    const courseToEdit = await Course.findById(req.params.id);
    console.log(user?.priviledges?.course.includes("EDIT"));

    if (!user) throw Error("You must be authenitcated first");
    if (
      user.priviledges?.course.includes("EDIT") ||
      courseToEdit?.instructors.includes(user._id)
    ) {
      await courseToEdit?.update(
        { $pull: { instructors: req.params.userId } },
        { new: true, }
      );
      res.status(201).send({ course: courseToEdit });
    } else {
      throw Error("You cannot edit this course");
    }
  } catch (err) {
    const error: any = new Error("There was an error removing the instructor");
    error.code = 404;
    next(error);
  }
};

export default {
  editCourse,
  createCourse,
  deleteCourse,
  addInstructor,
  removeInstructor,
};
