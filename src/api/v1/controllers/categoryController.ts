import express, { Request, Response, NextFunction } from "express";
import { idText } from "typescript";
import { generateError } from "../helpers/errors";
import Category from "../models/Category";

const viewAllCategories = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const categories = await Category.find();
    res.status(201).send({ categories });
  } catch (err) {
    const message = "There was a problem retrieving categories";
    generateError(message, 404, next);
  }
};

const createCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const newCategory = new Category(req.body);
    const savedCategory = await newCategory.save();
    res.status(201).send({ category: savedCategory });
  } catch (err) {
    const message = "There was a problem creating a category";
    generateError(message, 404, next);
  }
};

const editCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const categoryToEdit = await Category.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    if (!categoryToEdit) generateError("Category not found", 404, next);
    res.status(200).send({ category: categoryToEdit });
  } catch (err) {
    const message = "There was a problem editing this category";
    generateError(message, 404, next);
  }
};

const deleteCategory = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const categoryDeleted = await Category.findById(id);
    if (!categoryDeleted) generateError("Category not found", 404, next);
    await categoryDeleted?.remove();
    res.status(200).send({ category: categoryDeleted });
  } catch (err) {
    const message = "There was a problem creating a category";
    generateError(message, 404, next);
  }
};

export default {
  createCategory,
  editCategory,
  deleteCategory,
  viewAllCategories,
};
