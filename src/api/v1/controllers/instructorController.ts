import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import Instructor from "../models/User/Instructor";
import User from "../models/User/User";

const registerInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newIstructor = new Instructor(req.body);
    const instructor = await newIstructor.save();
    res.status(201).send({ instructor });
  } catch (err) {
    const error: any = new Error("There was a problem with the registration");
    error.code = 404;
    next(error);
  }
};
//CRUD INSTRUCTOR

//EDIT AN INSTRUCTOR
const editInstructor = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw Error;
    const reqUser: any = req.user;
    const currentUser = await User.findById(reqUser._id);

    if (!currentUser?.privileges) throw Error;
    const canEdit = currentUser.privileges.instructor.includes("EDIT");
    if (!canEdit) {
      const error: any = new Error("You cannot edit this student");
      error.code = 403;
      next(error);
    }
    const user = await User.editUser(req.params.id, req.body);

    if (!user) throw Error;
    res.status(200).send({ user });
  } catch (err) {
    const error: any = new Error("No user found");
    error.code = 401;
    next(error);
  }
};

//DELETE AN INSTRUCTOR

const deleteInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const reqUser: any = req.user;
    const currentUser = await User.findById(reqUser._id);
    if (!currentUser?.privileges) throw Error;
    const canDelete = currentUser.privileges.instructor.includes("DELETE");
    if (!canDelete) {
      const error: any = new Error("You cannot delete this student");
      error.code = 403;
      next(error);
    }
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) throw Error;
    res.status(200).send({ userDelted: user.email });
  } catch (err) {
    const error: any = new Error("No user found");
    error.code = 401;
    next(error);
  }
};
export default { registerInstructor,editInstructor,deleteInstructor };
