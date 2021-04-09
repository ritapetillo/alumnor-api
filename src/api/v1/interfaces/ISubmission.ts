import { Document } from "mongoose";

export interface ISubmission extends Document {
  _id: string;
  userId: string;
  assignmentId: string;
  courseId: string;
  uploads: [string];
  links: [string];
  checked: boolean;
}
