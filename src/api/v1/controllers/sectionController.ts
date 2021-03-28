import { Request, Response, NextFunction } from "express";
import { generateError } from "../helpers/errors";
import Section from "../models/Section";
import { ISection } from "../interfaces/ISection";
import { moveInArray } from "../helpers/lib/arrays";

const viewAllSectionsByCourse = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const sections = await Section.find({ courseId: req.params.courseId });
    res.status(201).send({ sections });
  } catch (err) {
    const message = "There was an error retrieving sections for this course";
    generateError(message, 404, next);
  }
};

const createSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { courseId } = req.params;
    const newSection: ISection = new Section({
      ...req.body,
      courseId,
    });
    const savedSection = await newSection.save();
    console.log(savedSection);
    res.status(201).send({ section: savedSection });
  } catch (err) {
    const error: any = new Error(
      "There was an error createing a new section for this course"
    );
    error.code = 404;
    next(error);
  }
};

const editSection = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    console.log(id)
    const sectionToEdit = await Section.findById(id);
    console.log(sectionToEdit);
    if (sectionToEdit) {
      await sectionToEdit?.update({ $set: req.body });
      res.status(200).send({ section: sectionToEdit });
    } else throw Error;
  } catch (err) {
    generateError("There was an error editing this section", 404, next);
  }
};
const deleteSection = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const sectionToDelete = await Section.findById(id);
    if (!sectionToDelete) {
      generateError("This section does not exist", 404, next);
    } else {
      await sectionToDelete.remove();
      res.status(200).send({ section: sectionToDelete._id });
    }
  } catch (err) {
    generateError("There was an error deleting this section", 404, next);
  }
};

const reorderSectionActions = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const section = await Section.findById(req.params.id);
    if (!section) throw Error;
    const { from, to } = req.body;
    const activities = section?.activities;
    moveInArray(activities, from, to, activities[from]);
    await section?.update({ $set: { activities } });
    res.status(201).send({ section });
  } catch (err) {
    const error: any = new Error("There was an error editing this course");
    error.code = 404;
    next(error);
  }
};

export default {
  createSection,
  editSection,
  deleteSection,
  viewAllSectionsByCourse,
  reorderSectionActions,
};
