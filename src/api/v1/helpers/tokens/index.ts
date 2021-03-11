import jwt from "jsonwebtoken";
import { jwtr } from "../../../../server";
import { IUserPayload } from "../../interfaces/Itoekens";
// import config from "../../../../Config";

export function encodeJWT(
  payload: string | object | Buffer,
  secret: string,
  expiration: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.sign(payload, secret, { expiresIn: expiration }, (err, token) => {
      if (err) return reject(err);
      else return resolve(token);
    });
  });
}

export function decodeJWT(token: string, secret: string): Promise<any> {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secret, (err, decoded) => {
      if (err) return reject(err);
      else return resolve(decoded);
    });
  });
}

export const generateTokens = async (payload: IUserPayload) => {
  try {
    //generate regolar token (not stored in cache)
    const accessToken = await encodeJWT(
      payload,
      process.env.ACCESS_TOKEN_SECRET!,
      process.env.ACCESS_TOKEN_EXPIRATION!
    );
    const refreshPayload = { ...payload, jti: payload._id };
    //first delete any refresh token already stored, if any
    await jwtr.destroy(payload._id);
    //and then generate a new refresh token
    const refreshToken = await jwtr.sign(
      refreshPayload,
      process.env.REFRESH_TOKEN_SECRET!,
      {
        expiresIn: process.env.REFRESH_TOKEN_EXPIRATION!,
      }
    );
    if (!accessToken && !refreshToken) return null;
    return { accessToken, refreshToken };
  } catch (err) {
    return null;
  }
};
