import { Document } from "mongoose";
import { IActivity } from "./IActivity";

export interface ILive extends IActivity {
  liveLink: string;
  recordingLink?: string;
}
