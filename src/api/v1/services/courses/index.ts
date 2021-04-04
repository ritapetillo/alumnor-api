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

//VIEW A COURSE PUBLIC
// api/v1/courses/:id
courseRouter.get("/:id/public", courseController.viewACoursePublic);

///////////////////PRIVATE ROUTES/////////////////////////

//VIEW A COURSE
// api/v1/courses/:id
courseRouter.get(
  "/:id",
  authenticateUser,
  canAttendCourse,
  courseController.viewACourse
);

//VIEW ALL COURSES By CURRENT INSTRUCTOR
// api/v1/courses/:id
courseRouter.get(
  "/instructor/me",
  authenticateUser,
  courseController.viewAllCoursesByCurrentInstructor
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

//REORDER COURSE SECTIONS
// api/v1/courses/reorder/:id/sections
courseRouter.put(
  "/reorder/:id/sections",
  authenticateUser,
  canEditCourse,
  courseController.reorderCourseSections
);

//DELETE A COURSE
// api/v1/courses/delete/:id
courseRouter.delete(
  "/delete/:id",
  authenticateUser,
  canDeleteCourse,
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
courseRouter.put(
  "/picture/:id",
  authenticateUser,
  canEditCourse,
  parser.single("picture"),
  courseController.uploadPicture
);

export default courseRouter;
