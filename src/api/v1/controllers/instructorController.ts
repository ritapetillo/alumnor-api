import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import Instructor from "../models/Instructor";

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

export default { registerInstructor };
