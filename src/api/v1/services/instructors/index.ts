import express from "express";
import instructorController from "../../controllers/instructorController";
const instructorRouter = express.Router();

// instructorRouter.get("/", userController.getUsers);

instructorRouter.post("/", instructorController.registerInstructor);

export default instructorRouter;
