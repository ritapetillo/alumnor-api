import { Response } from "express";
import { ITokens } from "../../interfaces/Itoekens";

export const generateCookies = async (
  { accessToken, refreshToken }: ITokens,
  res: Response
) => {
  try {
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: false, //set to true when deploy
      //   maxAge: Number(process.env.ACCESS_TOKEN_EXPIRATION),
      //   sameSite: "none", // THIS is the config you are looing for.
    });
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: false, //set to true when deploy
      //   maxAge: Number(process.env.REFRESH_TOKEN_EXPIRATION),
      //   sameSite: "none", // THIS is the config you are looing for.
    });
  } catch (err) {
    console.log(err);
    throw Error;
  }
};
