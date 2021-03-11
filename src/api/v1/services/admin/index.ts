import express from "express";
import adminController from "../../controllers/adminController";
const adminRouter = express.Router();

// instructorRouter.get("/", userController.getUsers);

adminRouter.post("/", adminController.registerAdmin);

export default adminRouter;
