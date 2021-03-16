import express from "express";
import courseController from "../../controllers/courseController";
import { authenticateUser } from "../../middlewares/auth";
import {
  canAttendCourse,
  canCreateCourse,
  canDeleteCourse,
  canEditCourse,
} from "../../middlewares/privileges/course";
import parser from "../../helpers/cloudinary/course";
const courseRouter = express.Router();

//////////////////PUBLIC ROUTES//////////////////
//VIEW ALL COURSES
// api/v1/courses
courseRouter.get("/", courseController.viewAllCourses);

///////////////////PRIVATE ROUTES/////////////////////////

//VIEW A COURSE
// api/v1/courses/:id
courseRouter.get(
  "/:id",
  authenticateUser,
  canAttendCourse,
  courseController.viewACourse
);

//CREATE A COURSE
// api/v1/courses/new
courseRouter.post(
  "/new",
  authenticateUser,
  canCreateCourse,
  courseController.createCourse
);

//EDIT A COURSE
// api/v1/courses/edit/:id
courseRouter.put(
  "/edit/:id",
  authenticateUser,
  canEditCourse,
  courseController.editCourse
);

//DELETE A COURSE
// api/v1/courses/delete/:id
courseRouter.delete(
  "/delete/:id",
  canDeleteCourse,
  authenticateUser,
  courseController.deleteCourse
);

//ADD AN INSTRUCTOR
// api/v1/courses/add/:id/:userId
courseRouter.put(
  "/add/:id/instructor/:userId",
  authenticateUser,
  canEditCourse,
  courseController.addInstructor
);

//ADD AN INSTRUCTOR
// api/v1/courses/remove/:id/:userId
courseRouter.put(
  "/remove/:id/instructor/:userId",
  authenticateUser,
  canEditCourse,
  courseController.removeInstructor
);

//UPLOAD A PICTURE
// api/v1/courses/:id/picture
courseRouter.post(
  "/picture/:id",
  authenticateUser,
  canEditCourse,
  parser.single("picture"),
  courseController.uploadPicture
);

export default courseRouter;
