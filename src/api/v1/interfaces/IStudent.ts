import { Document } from "mongoose";
import IUser from "./IUser";

interface IStudent extends IUser {
  cart: {};
}

export default IStudent;
