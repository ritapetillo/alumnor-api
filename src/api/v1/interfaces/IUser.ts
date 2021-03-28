import { Document, Model } from "mongoose";

//interface for individual Document (methods and prop which are avaialble for individual Document)
interface IUser extends Document {
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  googleId: String;
  address: {};
  picture: String;
  dateBirth: Date;
  refreshToken: String;
  verified: Boolean;
  privileges?: {
    student: [String];
    instructor: [String];
    course: [String];
    admin: [String];
    category: [String];
    enrollment: [String];
  };
  role: String;
  comparePassword: comparePasswordFunction;
  zoom: {
    zoomId?: string;
    zoomEmail?: string;
    zoomMeetingRoom?: string;
    zoomRefreshToken?: string;
    zoomAccessToken?: string;
  };
}

//interface for generic Model (methods and proprieties which are avaialble for Model)
export interface IUserModel extends Model<IUser> {
  findOrCreate: findOrCreate;
  editUser: editUser;
}

//@types
type comparePasswordFunction = (password: string) => boolean | null;
type findOrCreate = (
  condition: string,
  profile: {},
  id: string
) => IUser | null;

type editUser = (id: string, edits: {}) => IUser | null;
type findByEmail = (email: string) => object | null;

export default IUser;
