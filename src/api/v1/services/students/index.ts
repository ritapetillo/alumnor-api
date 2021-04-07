import express from "express";
import studentController from "../../controllers/studentController";
import { authenticateUser } from "../../middlewares/auth";
import {
  canAttendCourse,
  canEditCourse,
} from "../../middlewares/privileges/course";
const studentRouter = express.Router();

// studentRouter.get("/", userController.getUsers);

studentRouter.post("/", studentController.registerStudent);

//EDIT A STUDENT - FOR ADMIN (AND POTENTIALLY INSTRUCTORS)
//PUT api/v1/students/edit/:id
studentRouter.put("/edit/:id", authenticateUser, studentController.editStudent);

//GET ALL STUDENTS PER CURRENT INSTRUCTOR
//PUT api/v1/students/edit/:id
studentRouter.get(
  "/instructor/:id",
  authenticateUser,
  studentController.getAllStudentsPerCurrentInstructor
);

//GET ALL STUDENTS PER COURSE
//PUT api/v1/students/edit/:id
studentRouter.get(
  "/course/:id",
  authenticateUser,
  canAttendCourse,
  studentController.getAllStudentsPerCurrentInstructor
);

//DELETE A STUDENT - FOR ADMIN (AND POTENTIALLY INSTRUCTORS)
//DELETE api/v1/students/delete/:id
studentRouter.delete(
  "/delete/:id",
  authenticateUser,
  studentController.deleteStudent
);

export default studentRouter;
