import { Document, Model } from "mongoose";

//interface for individual Document (methods and prop which are avaialble for individual Document)
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

//interface for generic Model (methods and proprieties which are avaialble for Model)
export interface IUserModel extends Model<IUser> {
  findOrCreate: findOrCreate;
}

//@types
type comparePasswordFunction = (password: string) => boolean | null;
type findOrCreate = (
  condition: string,
  profile: {},
  id: string
) => IUser | null;
type findByEmail = (email: string) => object | null;

export default IUser;
