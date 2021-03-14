import express from "express";
import courseController from "../../controllers/courseController";
import passport from "passport";
import { authenticateUser } from "../../middlewares/auth";
const courseRouter = express.Router();

//CREATE A COURSE
// api/v1/courses/new
courseRouter.post("/new", authenticateUser, courseController.createCourse);

//EDIT A COURSE
// api/v1/courses/edit/:id
courseRouter.put("/edit/:id",authenticateUser, courseController.editCourse);

//DELETE A COURSE
// api/v1/courses/delete/:id
courseRouter.delete("/delete/:id",authenticateUser, courseController.deleteCourse);



export default courseRouter