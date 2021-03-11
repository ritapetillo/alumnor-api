import { NextFunction, Request, Response } from "express";
import Admin from "../models/Admin";

const registerAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newAdmin = new Admin(req.body);
    const admin = await newAdmin.save();
    res.status(201).send({ admin });
  } catch (err) {
    const error: any = new Error("There was a problem with the registration");
    error.code = 404;
    next(error);
  }
};

export default { registerAdmin };
