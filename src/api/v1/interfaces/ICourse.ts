import IInstructor from "./IInstructor";
import { Document, Model } from "mongoose";
export interface ICourse extends Document {
  title: String;
  description: String;
  highlights: [String];
  price: String;
  picture: string;
  instructors: [String];
  startDate: Date;
  endDate: Date;
  scheduleDescription: string;
  liveSchedule: [Date];
  sections: [String];
  category: String;
}

export interface ICourseModel extends Model<ICourse> {
  // here we decalre statics

  findCoursePublic(id: string): Promise<ICourse>;
}
