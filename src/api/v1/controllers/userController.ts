import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import User from "../models/User";

const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await User.find();
    res.status(200).send({ users });
  } catch (err) {
    const error: any = new Error("No users foound");
    error.code = 401;
    next(error);
  }
};



export default { getUsers };
