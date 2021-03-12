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
}

export default IUser;
