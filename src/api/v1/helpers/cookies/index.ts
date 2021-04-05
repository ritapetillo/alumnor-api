import { Response } from "express";
import config from "../../../../Config";
import { ITokens } from "../../interfaces/ITokens";

export const generateCookies = async (
  { accessToken, refreshToken }: ITokens,
  res: Response
) => {
  try {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, //set to true when deploy
      maxAge: Number(config.ACCESS_COOKIE_EXPIRATION!),
      sameSite: "none", // THIS is the config you are looing for.
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, //set to true when deploy
      maxAge: Number(config.REFRESH_COOKIE_EXPIRATION!),
      sameSite: "none", // THIS is the config you are looing for.
    });
  } catch (err) {
    console.log(err);
    throw Error;
  }
};

export const generateCookiesGoogle = async (
  { accessToken, refreshToken }: ITokens,
  res: Response
) => {
  try {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true, //set to true when deploy
      maxAge: Number(config.ACCESS_COOKIE_EXPIRATION!),
      sameSite: "none", // THIS is the config you are looing for.
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true, //set to true when deploy
      maxAge: Number(config.REFRESH_COOKIE_EXPIRATION!),
      sameSite: "none", // THIS is the config you are looing for.
    });
  } catch (err) {
    console.log(err);
    throw Error;
  }
};
