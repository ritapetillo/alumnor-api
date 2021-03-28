import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { generateCookies } from "../helpers/cookies";
import { RequestUser } from "../interfaces/IRequest";
import IUser from "../interfaces/IUser";
import User from "../models/User/User";

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

const getUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const userAuth: any = req.user;
    const user = await User.findById(userAuth._id);
    if (!user) throw Error;
    res.status(200).send({ user });
  } catch (err) {
    const error: any = new Error("No user foound");
    error.code = 401;
    next(error);
  }
};

//CRUD CURRENT USER

const editCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const currentUser: any = req.user;
    const { email, _id } = currentUser;

    const user = await User.editUser(_id, req.body);
    if (!user) throw Error;
    res.status(200).send({ user });
  } catch (err) {
    const error: any = new Error("No user found");
    error.code = 401;
    next(error);
  }
};

const uploadPicture = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const currentUser: any = req.user;
    const { email, _id } = currentUser;
    const picture = req.file && req.file.path;
    if (!picture) throw Error;
    const user = await User.findByIdAndUpdate(_id, { $set: { picture } });
    if (!user) throw Error;
    res.status(200).send({ picture });
  } catch (err) {
    const error: any = new Error("It was not possible to upload the picture");
    error.code = 401;
    next(error);
  }
};

const deleteCurrentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const currentUser: any = req.user;
    const { _id } = currentUser;
    const user = await User.findByIdAndDelete(_id);
    res.status(200).send({ userDeleted: user!.email });
  } catch (err) {
    const error: any = new Error("No user found");
    error.code = 401;
    next(error);
  }
};

const getCurrentUrl = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { url } = req.body;
    const generateCookie = res.cookie("current_url", url, {
      sameSite: "none",
      secure: true,
    });
    res.status(200).send(url);
  } catch (err) {
    const error: any = new Error("No url found");
    error.code = 401;
    next(error);
  }
};

export default {
  getUsers,
  getUser,
  editCurrentUser,
  deleteCurrentUser,
  uploadPicture,
  getCurrentUrl,
};
