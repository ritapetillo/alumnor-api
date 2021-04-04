import { Document } from "mongoose";

export interface IActivity extends Document {
  title: string;
  text: string;
  links: [string];
  uploads: [string];
  deadline: Date;
  completed: boolean;
  createdBy: string;
  category: String;
  submissions?: [string];
  courseId: string;
  sectionId: string;
  liveMeeting: {};
  type: string;
}
