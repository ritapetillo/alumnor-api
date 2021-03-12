import { NextFunction, Request, Response } from "express";
import { Error } from "mongoose";
import {
  generetateVerificationEmail,
  sendEmail,
} from "../helpers/emails/sendiGrid";
import { generateEmailVerificationToken } from "../helpers/tokens";
import Student from "../models/Student";
import User from "../models/User";

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
      console.log(sendVerificationEmail);
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

export default { registerStudent };
