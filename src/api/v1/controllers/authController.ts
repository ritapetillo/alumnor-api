import express, { Request, Response, NextFunction } from "express";
import { Error } from "mongoose";
import { generateCookies } from "../helpers/cookies";
import {
  generatePasswordResetToken,
  generateTokens,
  verifyPasswordResetToken,
  verifyRefreshToken,
  verifyVerificationEmailToken,
} from "../helpers/tokens";
import User from "../models/User/User";
import {
  generetateResetPasswordEmail,
  generetateVerificationEmail,
  sendEmail,
} from "../helpers/emails/sendiGrid";
import { generateEmailVerificationToken } from "../helpers/tokens";
import { IGoogleUserPayload } from "../interfaces/IStrategies";
import config from "../../../Config";
import { generateZoomCookies } from "../helpers/cookies/zoomCookies";
import axios from "axios";
import Config from "../../../Config";
import { ITokens } from "../interfaces/ITokens";

//LOGIN CONTROLLER
const login = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) throw Error;
    const isPassValid = await user.comparePassword(password);

    if (!isPassValid) throw Error;
    const tokens = await generateTokens({ _id: user._id, email });
    //send cookies
    if (!tokens) throw Error;
    const cookies = await generateCookies(tokens, res);
    res.status(201).send({ tokens });
  } catch (err) {
   
    const error: any = new Error("There was a problem loggin in");
    error.code = 500;
    next(error);
  }
};

//SIGNIN CONTROLLER
const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    //register a new student
    const newUser = new User(req.body);
    const user = await newUser.save();
    const { _id, email } = user;
    //after registration generate token to send verification email
    const token = await generateEmailVerificationToken({
      _id,
      email: email.toString(),
    });
    if (token) {
      //if the token is successfully generated, send an email with link to verify the email address
      const message = generetateVerificationEmail(email.toString(), token);
      const sendVerificationEmail = await sendEmail(message);

      res.status(201).send({ user });
    } else {
      throw Error;
    }
  } catch (err) {
    const error: any = new Error("There was a problem with the registration");
    error.code = 404;
    next(error);
  }
};

//LOGOUT CONTROLLER
const logout = async (req: Request, res: Response, next: NextFunction) => {
  try {
    await generateCookies({ accessToken: "", refreshToken: "" }, res);
    res.clearCookie("zoomAccess", {
      httpOnly: true,
      secure: true, //set to true when deploy
      sameSite: "none",
      //   sameSite: "none", // THIS is the config you are looing for.
    });
    res.clearCookie("zoomRefresh", {
      sameSite: "none",
      httpOnly: true,
      secure: true, //set to true when deploy
      //   sameSite: "none", // THIS is the config you are looing for.
    });

    res.redirect(`${Config.FE_URI}`);
  } catch (err) {

    const error: any = new Error("There was a problem loggin in");
    error.code = 500;
    next(error);
  }
};

//VERIFY EMAIL CONTROLLER
const verifyEmail = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { token } = req.params;
    const id = await verifyVerificationEmailToken(token);
    if (!id) throw Error;
    const user = await User.findByIdAndUpdate(
      id,
      { $set: { verified: true } },
      { runValidators: true, new: true }
    );

    res.status(200).send({ user });
  } catch (err) {
    const error: any = new Error(`There was a problem verifying your email`);
    error.code = 404;
    next(error);
  }
};

//VERIFY EMAIL CONTROLLER
const refreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { refreshToken } = req.cookies;
    const payload = await verifyRefreshToken(refreshToken);
    if (!payload) throw Error;
    const user = await User.findById(payload._id);

    if (!user) throw Error;
    const { _id, email } = user;
    const tokens = await generateTokens({
      _id,
      email: email.toString(),
    });
    if (tokens) {
      const cookies = await generateCookies(tokens, res);
      res.status(200).send({ tokens });
    } else throw Error;
  } catch (err) {

    const error: any = new Error(`There was a problem with your credentials`);
    error.code = 500;
    next(error);
  }
};

//SEND PASSWORD RESET LINK
const sendPasswordResetLink = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { email } = req.body;
    //find the user by email
    const user = await User.findOne({ email });
    if (!user) throw Error;
    const token = await generatePasswordResetToken({
      _id: user._id.toString(),
      email,
    });
    if (!token) throw Error;
    const message = generetateResetPasswordEmail(email, token);
    const sendPassResetEmail = await sendEmail(message);
    res.status(200).send("password reset link sent");
  } catch (err) {
    const error: any = new Error(`There was a problem with your request`);
    error.code = 500;
    next(error);
  }
};

//RESET PASSWORD
const resetPasword = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { token, password } = req.body;
    const email = await verifyPasswordResetToken(token);
    if (!email) {
      const error: any = new Error(`The reset link is not longer valid`);
      error.code = 400;
      return next(error);
    }
    const user = await User.findOne({ email });
    if (!user) throw Error;
    user.password = password;
    const newUser = await user.save();
    res.status(200).send({ user: newUser });
  } catch (err) {
 
    const error: any = new Error(`There was a problem resetting your password`);
    error.code = 404;
    next(error);
  }
};

const googleAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const { user, tokens }: any = req.user;
    const cookies = await generateCookies(tokens, res);
    res.redirect(`${config.FE_URI}`);

    res.send(req.user);
  } catch (err) {
  
    const error: any = new Error(`User not found`);
    error.code = 404;
    next(error);
  }
};

const facebookAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const { user, tokens }: any = req.user;
    const cookies = await generateCookies(tokens, res);
    res.redirect(`${config.FE_URI}`);

    res.send(req.user);
  } catch (err) {

    const error: any = new Error(`User not found`);
    error.code = 404;
    next(error);
  }
};

//ZOOM AUTH0
const zoomAuthCallback = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const { profile, tokens, _id }: any = req.user;
    const cookies = await generateZoomCookies(tokens, res);
    const zoomProfile = res.cookie("zoom_acc", profile, {
      sameSite: "none",
      secure: true,
      httpOnly: true,
    });
    const { current_url } = req.cookies;
    res.redirect(`${config.FE_URI}${current_url}`);
    // res.redirect(`${config.FE_URI}/zoom-mw`);

    // if (!req.user) throw Error;
    // res.send(req.user);
  } catch (err) {

    const error: any = new Error(`User not found`);
    error.code = 404;
    next(error);
  }
};

//ZOOM AUTH0
const linkUserWithZoom = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (!req.user) throw Error;
    const _id = req.user!._id;
    const { zoom_acc, zoomAccess, zoomRefresh } = await req.cookies;
    const user = await User.findById(_id);
    await User.findByIdAndUpdate(_id, {
      $set: {
        zoom: {
          zoomRefreshToken: zoomRefresh,
          zoomEmail: zoom_acc.zoomEmail,
          zoomId: zoom_acc.zoomId,
          zoomAccessToken: zoomAccess,
          zoomMeetingRoom: zoom_acc.zoomMeetingRoom,
        },
      },
    });
    const { current_url } = req.cookies;
    res.send(req.cookies);
    // res.redirect(`${config.FE_URI}${current_url}`);
  } catch (err) {

    const error: any = new Error(`User not found`);
    error.code = 404;
    next(error);
  }
};

const zoomRefreshToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { _id } = req.user!;
    const user = await User.findById(_id);
    // const { zoom_acc, zoomAccess, zoomRefresh } = await req.cookies;
    // const { zoomrefresh }: any = req.headers;
    if (!user?.zoom.zoomRefreshToken) throw Error;

    const uri = `https://zoom.us/oauth/token?grant_type=refresh_token&refresh_token=${user.zoom.zoomRefreshToken}`;
    const base64 = Buffer.from(
      `${Config.ZOOM_CLIENT_ID}:${Config.ZOOM_CLIENT_SECRET}`
    ).toString("base64");
    const config: any = {
      method: "post",
      url: uri,
      headers: {
        Authorization: "Basic " + base64,
        "Content-Type": "application/json",
      },
      data: "",
    };

    const resp = await axios(config);

    const { access_token, refresh_token }: any = await resp.data;
    const tokens: ITokens = {
      accessToken: access_token,
      refreshToken: refresh_token,
    };
    const cookies = await generateZoomCookies(tokens, res);
    // const zoomUser = await User.findByIdAndUpdate(req.user._id,)
    await User.findByIdAndUpdate(
      _id,
      {
        $set: {
          "zoom.zoomRefreshToken": refresh_token,
          "zoom.zoomAccessToken": access_token,
        },
      },
      { new: true }
    );
    res.send({ tokens, userToken: user.zoom.zoomAccessToken });
    // if (!req.user) throw Error;
    // res.send(req.user);
  } catch (err) {
 
    const error: any = new Error(
      `Zoom account not found, please connect to Zoom again`
    );
    error.code = 404;
    next(error);
  }
};

export default {
  login,
  signup,
  verifyEmail,
  refreshToken,
  sendPasswordResetLink,
  resetPasword,
  googleAuthCallback,
  facebookAuthCallback,
  zoomAuthCallback,
  zoomRefreshToken,
  linkUserWithZoom,
  logout,
};
