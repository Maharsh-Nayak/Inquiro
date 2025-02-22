import express from "express";
import Community from "../models/Community.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newCommunity = new Community(req.body);
    const savedCommunity = await newCommunity.save();
    res.status(201).json(savedCommunity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).json(communities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const community = await Community.findById(req.params.id);
    if (!community) return res.status(404).json({ message: "Not found" });
    res.status(200).json(community);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
