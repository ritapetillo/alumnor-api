import { Document } from "mongoose";
import { IActivity } from "./IActivity";

export interface IVideo extends IActivity {
  videoLink: string;
}
