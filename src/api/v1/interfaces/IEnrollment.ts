import { Document, ObjectId } from "mongoose";

export interface IEnrollment extends Document {
  courseId: string | ObjectId;
  userId: string;
  payed: boolean;
  approved: boolean;
  dateCompletition: Date;
  Notes: string;
}
