import { Document } from "mongoose";
import IUser from "./IUser";

interface IInstructor extends IUser {
  typeOfPay:string,
  hourlyPay: number,
  percentagePay: number,
  approved: boolean,
  canCreateCourse: boolean,
  
}

export default IInstructor;
