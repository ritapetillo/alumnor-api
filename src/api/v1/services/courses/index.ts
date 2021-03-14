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
courseRouter.delete("/delete/:id", authenticateUser, courseController.deleteCourse);

//ADD AN INSTRUCTOR
// api/v1/courses/add/:id/:userId
courseRouter.put("/add/:id/instructor/:userId",authenticateUser, courseController.addInstructor);

//ADD AN INSTRUCTOR
// api/v1/courses/remove/:id/:userId
courseRouter.put("/remove/:id/instructor/:userId",authenticateUser, courseController.removeInstructor);



export default courseRouter