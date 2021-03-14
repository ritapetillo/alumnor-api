import { Document } from "mongoose";

export interface ISection extends Document {
  title: String;
  description: String;
  accessGranted?: [];
  activities: [];
  courseId: String;
}
