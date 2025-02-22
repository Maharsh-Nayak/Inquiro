import express from "express";
import Channel from "../models/Channel.js";

const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const newChannel = new Channel(req.body);
    const savedChannel = await newChannel.save();
    res.status(201).json(savedChannel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const channels = await Channel.find();
    res.status(200).json(channels);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const channel = await Channel.findById(req.params.id);
    if (!channel) return res.status(404).json({ message: "Not found" });
    res.status(200).json(channel);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
