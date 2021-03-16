import { Document } from "mongoose";

export interface IEnrollment extends Document {
  courseId: string;
  userId: string;
  payed: boolean;
  approved: boolean;
  dateCompletition: Date;
  Notes: string;
}
