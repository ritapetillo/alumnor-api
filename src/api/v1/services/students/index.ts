import express from "express";
import studentController from "../../controllers/studentController";
const studentRouter = express.Router();

// studentRouter.get("/", userController.getUsers);

studentRouter.post("/", studentController.registerStudent);

export default studentRouter;
