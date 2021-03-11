import express from "express";
import userRoutes from "./services/users";
const router = express.Router();

router.get("/", (req, res) => {
  res.send("v1 app");
});
router.use("/users", userRoutes);
export default router;
