
import { Document } from "mongoose";
export default interface ICategory extends Document {
  name: String;
  description: String;
  
}
