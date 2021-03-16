import express from "express";
import submissionController from "../../controllers/submissionController";
import { authenticateUser } from "../../middlewares/auth";
import { canAttendCourse, canCreateCourse, canEditCourse } from "../../middlewares/privileges/course";
import {
  canCreateSection,
  canDeleteSection,
  canEditSection,
} from "../../middlewares/privileges/sections";
import { canEditOrDeleteSubmission } from "../../middlewares/privileges/submissions";
const submissionRouter = express.Router();

//////////////////PUBLIC ROUTES//////////////////
//VIEW A SUBMISSION BY COURSE
// api/v1/submission/course/:courseId
submissionRouter.get("/course/:courseId", authenticateUser, canEditCourse, submissionController.viewAllSubmissionsByCourse);

//VIEW MY SUBMISSIONS 
// api/v1/submission/me
submissionRouter.get("/me", authenticateUser, submissionController.viewAllMySubmissions);

//VIEW SUBMISSIONS BY USER 
// api/v1/submission/:userId
submissionRouter.get("/:userId",authenticateUser, canCreateCourse, submissionController.viewAllSubmissionsByUser);

///////////////////PRIVATE ROUTES/////////////////////////
//CREATE A SUBMISSION
// api/v1/submissions/:courseId/new
submissionRouter.post(
  "/:courseId/new",
  authenticateUser,
  canAttendCourse,
  submissionController.createSubmission
);

//EDIT A SUBMISSION
// api/v1/submissions/:courseId/edit/:id
submissionRouter.put(
  "/:courseId/edit/:id",
  authenticateUser,
  canEditOrDeleteSubmission,
  submissionController.editSubmission
);

//DELETE A SUBMISSION
// api/v1/submissions/:courseId/delete/:id
submissionRouter.delete(
  "/:courseId/delete/:id",
  authenticateUser,
  canEditOrDeleteSubmission,
  submissionController.deleteSubmission
);

export default submissionRouter;
