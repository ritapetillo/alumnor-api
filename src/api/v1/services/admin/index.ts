import express from "express";
import adminController from "../../controllers/adminController";
import { authenticateUser } from "../../middlewares/auth";
const adminRouter = express.Router();

// instructorRouter.get("/", userController.getUsers);

adminRouter.post("/", adminController.registerAdmin);

//EDIT AN ADMIN - FOR SUPER ADMIN
//PUT api/v1/admin/edit/:id
adminRouter.put("/edit/:id", authenticateUser, adminController.editAdmin);

//DELETEAN ADMIN - FOR SUPER ADMIN
//DELETE api/v1/admin/delete/:id
adminRouter.delete(
  "/delete/:id",
  authenticateUser,
  adminController.deleteAdmin
);

export default adminRouter;
