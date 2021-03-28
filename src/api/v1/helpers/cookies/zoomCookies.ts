import { Response } from "express";
import config from "../../../../Config";
import { ITokens } from "../../interfaces/ITokens";

export const generateZoomCookies = async (
  { accessToken, refreshToken }: ITokens,
  res: Response
) => {
  try {
    res.cookie("zoomAccess", accessToken, {
      httpOnly: true,
      secure: true, //set to true when deploy
      maxAge: Number(config.ACCESS_COOKIE_EXPIRATION!),
      sameSite: "none",
      //   sameSite: "none", // THIS is the config you are looing for.
    });
    res.cookie("zoomRefresh", refreshToken, {
      sameSite: "none",
      httpOnly: true,
      secure: true, //set to true when deploy
      //   sameSite: "none", // THIS is the config you are looing for.
    });
  } catch (err) {
    console.log(err);
    throw Error;
  }
};
