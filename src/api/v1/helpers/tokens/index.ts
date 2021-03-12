import jwt from "jsonwebtoken";
import JWTRedis from "jwt-redis";
import { jwtr } from "../../../../server";
import { IPayloadJWTR, ITokens, IUserPayload } from "../../interfaces/Itoekens";
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
    const refreshPayload = { ...payload, jti: payload._id + "refresh" };
    //first delete any refresh token already stored, if any
    await jwtr.destroy(payload._id + "refresh");
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

export const verifyRefreshToken = async (token: string) => {
  try {
    const decoded: IPayloadJWTR = await jwtr.verify(
      token,
      process.env.REFRESH_TOKEN_SECRET!
    );
    if (decoded) {
      const { _id, email } = decoded;
      //destroy the token so that it will not be possible to use it again (one time use token)
      await jwtr.destroy(_id + "refresh");
      return { _id, email };
    } else return null;
  } catch (err) {
    return null;
  }
};

export const generateEmailVerificationToken = async (
  payload: IUserPayload
): Promise<string | null> => {
  try {
    const fullVerificationPayload = { ...payload, jti: payload._id + "verify" };
    //first delete any email verification token already stored for the user, if any
    await jwtr.destroy(payload._id + "verify");
    //and then generate a new refresh token
    const emailVerificationToken = await jwtr.sign(
      fullVerificationPayload,
      process.env.EMAIL_VERIFICATION_TOKEN_SECRET!,
      {
        expiresIn: "7d",
      }
    );
    if (!emailVerificationToken) return null;
    return emailVerificationToken;
  } catch (err) {
    return null;
  }
};

export const verifyVerificationEmailToken = async (token: string) => {
  try {
    const decoded: IPayloadJWTR = await jwtr.verify(
      token,
      process.env.EMAIL_VERIFICATION_TOKEN_SECRET!
    );
    if (decoded) {
      const { _id } = decoded;
      //destroy the token so that it will not be possible to use it again (one time use token)
      await jwtr.destroy(_id + "verify");
      return _id;
    } else return null;
  } catch (err) {
    return null;
  }
};



export const generatePasswordResetToken = async (
  payload: IUserPayload
): Promise<string | null> => {
  try {
    const extendedPayload = { ...payload, jti: payload._id + "reset" };
    //first delete any email verification token already stored for the user, if any
    await jwtr.destroy(payload._id + "reset");
    //and then generate a new refresh token
    const passResetToken = await jwtr.sign(
      extendedPayload,
      process.env.PASS_RESET_TOKEN_SECRET!,
      {
        expiresIn: "1d",
      }
    );
    if (!passResetToken) return null;
    return passResetToken;
  } catch (err) {
    return null;
  }
};

export const verifyPasswordResetToken = async (token: string) => {
  try {
    const decoded: IPayloadJWTR = await jwtr.verify(
      token,
      process.env.PASS_RESET_TOKEN_SECRET!
    );
    if (decoded) {
      const { _id, email } = decoded;
      //destroy the token so that it will not be possible to use it again (one time use token)
      await jwtr.destroy(_id + "reset");
      console.log(decoded);
      return email;
    } else return null;
  } catch (err) {
    return null;
  }
};