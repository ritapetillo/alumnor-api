import express from "express";
import userRoutes from "./services/users";
import studentRoutes from "./services/students";
import instructorRoutes from "./services/instructors";
import adminRoutes from "./services/admin";
import authRoutes from "./services/auth";
import courseRoutes from "./services/courses";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("v1 app");
});
//routes
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/students", studentRoutes);
router.use("/instructors", instructorRoutes);
router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);

export default router;
