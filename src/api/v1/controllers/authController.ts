import express, { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import { generateCookies } from "../helpers/cookies";
import { generateTokens } from "../helpers/tokens";
import User from "../models/User";

const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw Error;
    const isPassValid = user.comparePassword(password);
    if (!isPassValid) throw Error;
    const tokens = await generateTokens({ _id: user._id, email });
    //send cookies
    if (!tokens) throw Error;
    const cookies = await generateCookies(tokens, res);
    res.status(201).send({ tokens });
  } catch (err) {
    console.log(err);
    const error: any = new Error("There was a problem loggin in");
    error.code = 500;
    next(error);
  }
};

export default { login };
