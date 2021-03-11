import express from "express";
import userRoutes from "./services/users";
import studentRoutes from "./services/students";
import instructorRoutes from "./services/instructors";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("v1 app");
});
router.use("/users", userRoutes);
router.use("/students", studentRoutes);
router.use("/instructors", instructorRoutes);
export default router;
