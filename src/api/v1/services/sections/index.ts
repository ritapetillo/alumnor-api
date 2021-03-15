import express from "express";
import sectionController from "../../controllers/sectionController";
import { authenticateUser } from "../../middlewares/auth";
import {
  canCreateSection,
  canDeleteSection,
  canEditSection,
} from "../../middlewares/auth/privileges/sections";
const sectionRouter = express.Router();

//////////////////PUBLIC ROUTES//////////////////
//VIEW ALL SECTIONS
// api/v1/sections
sectionRouter.get("/:sectionId", sectionController.viewAllSectionsByCourse);

///////////////////PRIVATE ROUTES/////////////////////////
//CREATE A SECTION
// api/v1/sections/new
sectionRouter.post(
  "/:courseId",
  authenticateUser,
  canCreateSection,
  sectionController.createSection
);

//EDIT A SECTION
// api/v1/sections/edit/:id
sectionRouter.put(
  "/:courseId/edit/:id",
  authenticateUser,
  canEditSection,
  sectionController.editSection
);

//DELETE A SECTION
// api/v1/sections/delete/:id
sectionRouter.delete(
  "/:courseId/delete/:id",
  authenticateUser,
  canDeleteSection,
  sectionController.deleteSection
);

export default sectionRouter;
