import { Document } from "mongoose";
import IUser from "./IUser";

interface IAdmin extends IUser {
  confirmed: boolean;
}

export default IAdmin;
