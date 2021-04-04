import { Document } from "mongoose";
import { ICourse } from "./ICourse";
import IUser from "./IUser";
export default interface IFeed extends Document {
  text: string;
  authorId: string | IUser;
  courseId: string | ICourse;
  likes: string[];
  media: string[];
  comments: [
    {
      text: string;
      authorId: string | IUser;
      likes: string[];
    }
  ];
}
