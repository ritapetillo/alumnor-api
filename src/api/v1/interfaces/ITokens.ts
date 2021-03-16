export interface IUserPayload {
  _id: string;
  email: string;
}
export interface ITokens {
  accessToken: string;
  refreshToken: string;
}

export interface IPayloadJWTR {
  _id: string;
  email: string;
  jti: string;
  iat: string;
  exp: string;
}
