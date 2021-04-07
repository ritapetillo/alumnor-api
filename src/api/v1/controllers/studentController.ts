import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import { idText } from "typescript";
import {
  generetateVerificationEmail,
  sendEmail,
} from "../helpers/emails/sendiGrid";
import { generateEmailVerificationToken } from "../helpers/tokens";
import { IEnrollment } from "../interfaces/IEnrollment";
import Student from "../models/User/Student";
import User from "../models/User/User";

const registerStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    //register a new student
    const newStudent = new User(req.body);
    const student = await newStudent.save();
    const { _id, email } = student;
    //after registration generate token to send verification email
    const token = await generateEmailVerificationToken({
      _id,
      email: email.toString(),
    });
    if (token) {
      //if the token is successfully generated, send an email with link to verify the email address
      const message = generetateVerificationEmail(email.toString(), token);
      const sendVerificationEmail = await sendEmail(message);
      res.status(201).send({ student });
    } else {
      throw Error;
    }
  } catch (err) {
    const error: any = new Error("There was a problem with the registration");
    error.code = 404;
    next(error);
  }
};

//CRUD STUDENT

//EDIT A STUDENT
const editStudent = async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (!req.user) throw Error;
    const reqUser: any = req.user;
    const currentUser = await User.findById(reqUser._id);

    if (!currentUser?.privileges) throw Error;
    const canEdit = currentUser.privileges.student.includes("EDIT");
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

const deleteStudent = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const reqUser: any = req.user;
    const currentUser = await User.findById(reqUser._id);
    if (!currentUser?.privileges) throw Error;
    const canDelete = currentUser.privileges.student.includes("DELETE");
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

const getAllStudentsPerCurrentInstructor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const reqUser: any = req.user;
    let instructorId = reqUser._id;
    // console.log(instructorId);
    // if (req.params.id === "me") {
    //   instructorId === reqUser._id;
    // }
    let users = await User.find()
      .populate({
        path: "enrollments",
        select: "-paymentDetails",

        populate: {
          path: "courseId",
        },
      })
      .select("-privileges -zoom");
    users = users.filter((user: any) =>
      user.enrollments.find((enrollment: any) =>
        enrollment.courseId.instructors.includes(instructorId)
      )
    );
    const usersPerInstructor = users.map((user: any) => {
      let enrollments = user.enrollments;
      enrollments = enrollments.filter((enrollment: any) =>
        enrollment.courseId.instructors.includes(instructorId)
      );
      user.enrollments = enrollments;
      return user;
    });
    res.status(201).send({ users: usersPerInstructor });
  } catch (err) {
    console.log(err);
    const error: any = new Error("There was a problem with the registration");
    error.code = 404;
    next(error);
  }
};

const getAllStudentsPerCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const reqUser: any = req.user;
    let users = await User.find({
      "enrollments.courseId": req.params.id,
    }).populate({
      path: "enrollments",
      select: "-paymentDetails",

      populate: {
        path: "courseId",
      },
    });

    // users = users.filter((user: any) =>
    //   user.enrollments.find(
    //     (enrollment: any) => enrollment.courseId === req.params.courseId
    //   )
    // );

    res.status(201).send({ users });
  } catch (err) {
    console.log(err);
    const error: any = new Error("There was a problem with the registration");
    error.code = 404;
    next(error);
  }
};

export default {
  registerStudent,
  editStudent,
  deleteStudent,
  getAllStudentsPerCurrentInstructor,
  getAllStudentsPerCourse
};
