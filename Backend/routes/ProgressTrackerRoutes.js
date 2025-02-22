import express from "express";
import ProgressTracker from "../models/Progresstracker.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const progressEntries = await ProgressTracker.find();
    res.status(200).json(progressEntries);
  } catch (error) {
    res.status(500).json({ error: "Error fetching progress tracker data" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const progressEntry = await ProgressTracker.findById(req.params.id);
    if (!progressEntry) {
      return res.status(404).json({ message: "Progress entry not found" });
    }
    res.status(200).json(progressEntry);
  } catch (error) {
    res.status(500).json({ error: "Error fetching progress entry" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newEntry = new ProgressTracker(req.body);
    await newEntry.save();
    res.status(201).json(newEntry);
  } catch (error) {
    res.status(400).json({ error: "Error creating progress entry" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedEntry = await ProgressTracker.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedEntry) {
      return res.status(404).json({ message: "Progress entry not found" });
    }
    res.status(200).json(updatedEntry);
  } catch (error) {
    res.status(500).json({ error: "Error updating progress entry" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedEntry = await ProgressTracker.findByIdAndDelete(req.params.id);
    if (!deletedEntry) {
      return res.status(404).json({ message: "Progress entry not found" });
    }
    res.status(200).json({ message: "Progress entry deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting progress entry" });
  }
});

export default router;
