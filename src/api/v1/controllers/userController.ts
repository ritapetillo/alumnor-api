import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { RequestUser } from "../interfaces/IRequest";
import IUser from "../interfaces/IUser";
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

const getUser = async (req: any, res: Response, next: NextFunction) => {
  try {
    const { email, _id } = req.user;
    const user = await User.findById(_id);
    if (!user) throw Error;
    res.status(200).send({ user });
  } catch (err) {
    const error: any = new Error("No user foound");
    error.code = 401;
    next(error);
  }
};

export default { getUsers, getUser };
