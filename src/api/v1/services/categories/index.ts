import express from "express";
import categoryController from "../../controllers/categoryController";
import { authenticateUser } from "../../middlewares/auth";
import {
  canCreatetCategory,
  canDeleteCategory,
  canEditCategory,
} from "../../middlewares/auth/privileges/category";
const categoryRouter = express.Router();

//CREATE A CATEGORY
// api/v1/category/new
categoryRouter.post(
  "/new",
  authenticateUser,
  canCreatetCategory,
  categoryController.createCategory
);

//EDIT A CATEGORY
// api/v1/categoryedit/:id
categoryRouter.put(
  "/edit/:id",
  authenticateUser,
  canEditCategory,
  categoryController.editCategory
);

//DELETE A CATEGORY
// api/v1/categorydelete/:id
categoryRouter.delete(
  "/delete/:id",
  authenticateUser,
  canDeleteCategory,
  categoryController.deleteCategory
);

export default categoryRouter;
