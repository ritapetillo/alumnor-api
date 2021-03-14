import { NextFunction, Request, Response } from "express";
import Admin from "../models/Admin";
import User from "../models/User";

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
//CRUD ADMIN

//EDIT AN ADMIN
const editAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw Error;
    const reqUser: any = req.user;
    const currentUser = await User.findById(reqUser._id);

    if (!currentUser?.priviledges) throw Error;
    const canEdit = currentUser.priviledges.admin.includes("EDIT");
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

//DELETE AN ADMIN

const deleteAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const reqUser: any = req.user;
    const currentUser = await User.findById(reqUser._id);
    if (!currentUser?.priviledges) throw Error;
    const canDelete = currentUser.priviledges.admin.includes("DELETE");
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

export default { registerAdmin,editAdmin,deleteAdmin };
