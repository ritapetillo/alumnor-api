import express from "express";
import submissionController from "../../controllers/submissionController";
import parser from "../../helpers/cloudinary/files";
import { authenticateUser } from "../../middlewares/auth";
import {
  canAttendCourse,
  canCreateCourse,
  canEditCourse,
} from "../../middlewares/privileges/course";
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
submissionRouter.get(
  "/course/:id",
  authenticateUser,
  canEditCourse,
  submissionController.viewAllSubmissionsByCourse
);

//VIEW MY SUBMISSIONS
// api/v1/submission/me
submissionRouter.get(
  "/me",
  authenticateUser,
  submissionController.viewAllMySubmissions
);

//VIEW SUBMISSIONS BY USER
// api/v1/submission/:userId
submissionRouter.get(
  "/:userId",
  authenticateUser,
  canCreateCourse,
  submissionController.viewAllSubmissionsByUser
);

///////////////////PRIVATE ROUTES/////////////////////////
//CREATE A SUBMISSION
// api/v1/submissions/:courseId/new
submissionRouter.post(
  "/:courseId/:assignmentId",
  authenticateUser,
  // canAttendCourse,
  submissionController.createSubmission
);

//UPLOAD DOCUMENTS TO A SUBMISSION
// api/v1/submissions/:courseId/new
submissionRouter.put(
  "/:courseId/upload/:submissionId",
  authenticateUser,
  // canAttendCourse,
  parser.array("files"),
  submissionController.uploadFileSubmission
);
//EDIT A SUBMISSION
// api/v1/submissions/:courseId/edit/:id
submissionRouter.put(
  "/:courseId/edit/:id",
  authenticateUser,
  // canEditOrDeleteSubmission,
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
