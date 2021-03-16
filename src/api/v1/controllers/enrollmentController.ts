import express, { Request, Response, NextFunction } from "express";
import { generateError } from "../helpers/errors";
import Enrollment from "../models/Enrollment";

const viewAllEnrollments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //only admin
  try {
    const enrollments = await Enrollment.find({}).populate({ path: "courses" });

    res.status(200).send({ enrollments });
  } catch (err) {
    const message = "There was a problem retrieving enrollments";
    generateError(message, 404, next);
  }
};

const viewMyEnrollments = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //only admin
  try {
    const enrollments = await Enrollment.find({
      userId: req.user!._id,
    }).populate({ path: "courses" });

    res.status(200).send({ enrollments });
  } catch (err) {
    const message = "There was a problem retrieving enrollments";
    generateError(message, 404, next);
  }
};

const createEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const details = {
      ...req.body,
      userId: req.user!._id,
    };
    const newEnrollment = new Enrollment(details);
    const savedEnrollment = await newEnrollment.save();
    res.status(201).send({ enrollment: savedEnrollment });
  } catch (err) {
    const message = "There was a problem creating this enrollment";
    generateError(message, 404, next);
  }
};

const editEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //only admin
  try {
    const { id } = req.params;
    const enrollmentToEdit = await Enrollment.findByIdAndUpdate(
      id,
      {
        $set: req.body,
      },
      { new: true, runValidators: true }
    );
    if (!enrollmentToEdit) generateError("Enrollment not found", 404, next);
    res.status(200).send({ enrollment: enrollmentToEdit });
  } catch (err) {
    const message = "There was a problem editing this enrollment";
    generateError(message, 404, next);
  }
};

const deleteEnrollment = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //only admin
  try {
    const { id } = req.params;
    const enrollmentDeleted = await Enrollment.findById(id);
    if (!enrollmentDeleted) generateError("Enrollment not found", 404, next);
    await enrollmentDeleted?.remove();
    res.status(200).send({ enrollment: enrollmentDeleted!._id });
  } catch (err) {
    const message = "There was a problem deleting this enrollment";
    generateError(message, 404, next);
  }
};

export default {
  createEnrollment,
  editEnrollment,
  deleteEnrollment,
  viewAllEnrollments,
  viewMyEnrollments,
};
