import express from "express";
import userRoutes from "./services/users";
import studentRoutes from "./services/students";
import instructorRoutes from "./services/instructors";
import adminRoutes from "./services/admin";
import authRoutes from "./services/auth";
import courseRoutes from "./services/courses";
import categoryRoutes from "./services/categories";
import sectionRoutes from "./services/sections";
import enrollmentRoutes from "./services/enrollments";
import activityRoutes from "./services/activities";
import submissionRoutes from "./services/submissions";
import feedRoutes from "./services/feeds";


const router = express.Router();
//routes
router.use("/users", userRoutes);
router.use("/admin", adminRoutes);
router.use("/students", studentRoutes);
router.use("/instructors", instructorRoutes);
router.use("/auth", authRoutes);
router.use("/courses", courseRoutes);
router.use("/categories", categoryRoutes);
router.use("/sections", sectionRoutes);
router.use("/activities", activityRoutes);
router.use("/enrollments", enrollmentRoutes);
router.use("/submissions", submissionRoutes);
router.use("/feeds", feedRoutes);

export default router;
