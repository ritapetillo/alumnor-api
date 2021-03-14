import express from "express";
import instructorController from "../../controllers/instructorController";
import { authenticateUser } from "../../middlewares/auth";
const instructorRouter = express.Router();

// instructorRouter.get("/", userController.getUsers);

instructorRouter.post("/", instructorController.registerInstructor);


//EDIT AN INSTRUCTOR - FOR ADMIN 
//PUT api/v1/instructors/edit/:id
instructorRouter.put(
  "/edit/:id",
  authenticateUser,
  instructorController.editInstructor
);

//DELETE AN INSTRUCTOR - FOR ADMIN 
//DELETE api/v1/instructors/delete/:id
instructorRouter.delete(
  "/delete/:id",
  authenticateUser,
  instructorController.deleteInstructor
);


export default instructorRouter;
