import express from "express";
import Exam from "../models/Exam.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const exams = await Exam.find();
    res.json(exams);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newExam = new Exam(req.body);
    await newExam.save();
    res.status(201).json(newExam);
  } catch (error) {
    res.status(400).json({ error: "Failed to create exam" });
  }
});

export default router;
