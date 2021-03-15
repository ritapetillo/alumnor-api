import IInstructor from "./IInstructor";
import { Document } from "mongoose";
export interface ICourse extends Document {
  title: String;
  description: String;
  highlights: [String];
  price: String;
  picture: String;
  instructors: [String];
  startDate: Date;
  endDate: Date;
  liveSchedule: [Date];
  sections: [];
  categories: [];
}
