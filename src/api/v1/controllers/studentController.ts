import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import Student from "../models/Student";

const registerStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newStudent = new Student(req.body);
    const student = await newStudent.save();
    res.status(200).send({ student });
  } catch (err) {
    const error: any = new Error("There was a problem with the registration");
    error.code = 404;
    next(error);
  }
};

export default { registerStudent };
