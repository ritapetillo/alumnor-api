import express from "express";
import { authenticate } from "passport";
import enrollmentController from "../../controllers/enrollmentController";
import { authenticateUser } from "../../middlewares/auth";
import {
  canDeleteEnrollment,
  canEditEnrollment,
  canReadEnrollments,
} from "../../middlewares/privileges/enrollments";
const enrollmentRouter = express.Router();

////PUBLIC ROUTES
//CREATE A ENROLLMENT
// api/v1/enrollment/new
enrollmentRouter.post(
  "/new",
  authenticateUser,
  enrollmentController.createEnrollment
);

//PRIVATE ROUTES - JUST CURRENT USER
enrollmentRouter.get(
  "/me",
  authenticateUser,
  enrollmentController.viewMyEnrollments
);
//PRIVTE ROUTES  ------ ADMIN

//VIEW ALL ENROLLMENTS
// api/v1/enrollments/
enrollmentRouter.get(
  "/",
  authenticateUser,
  canReadEnrollments,
  enrollmentController.viewAllEnrollments
);

//EDIT AN ENROLLMENT
// api/v1/enrollmentedit/:id
enrollmentRouter.put(
  "/edit/:id",
  authenticateUser,
  canEditEnrollment,
  enrollmentController.editEnrollment
);

//DELETE A ENROLLMENT
// api/v1/enrollmentdelete/:id
enrollmentRouter.delete(
  "/delete/:id",
  authenticateUser,
  canDeleteEnrollment,
  enrollmentController.deleteEnrollment
);

export default enrollmentRouter;
