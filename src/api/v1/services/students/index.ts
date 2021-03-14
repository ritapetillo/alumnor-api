import express from "express";
import studentController from "../../controllers/studentController";
import { authenticateUser } from "../../middlewares/auth";
const studentRouter = express.Router();

// studentRouter.get("/", userController.getUsers);

studentRouter.post("/", studentController.registerStudent);

//EDIT A STUDENT - FOR ADMIN (AND POTENTIALLY INSTRUCTORS)
//PUT api/v1/students/edit/:id
studentRouter.put("/edit/:id", authenticateUser, studentController.editStudent);

//DELETE A STUDENT - FOR ADMIN (AND POTENTIALLY INSTRUCTORS)
//DELETE api/v1/students/delete/:id
studentRouter.delete(
  "/delete/:id",
  authenticateUser,
  studentController.deleteStudent
);

export default studentRouter;
