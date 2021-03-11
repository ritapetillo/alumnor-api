import { Document } from "mongoose";

interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  googleId: String;
  address: {};
  image: String;
  dateBirth: Date;
  refreshToken: String;
  verified: Boolean;
  comparePassword: comparePasswordFunction;
}

type comparePasswordFunction = (password: string) => boolean | null;
type findByEmail = (email: string) => object | null;

export default IUser;
