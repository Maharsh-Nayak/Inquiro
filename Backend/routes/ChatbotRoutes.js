import express from "express";
import Chatbot from "../models/Chatbot.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const chatbotResponses = await Chatbot.find();
    res.status(200).json(chatbotResponses);
  } catch (error) {
    res.status(500).json({ error: "Error fetching chatbot responses" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const chatbotResponse = await Chatbot.findById(req.params.id);
    if (!chatbotResponse) {
      return res.status(404).json({ message: "Chatbot response not found" });
    }
    res.status(200).json(chatbotResponse);
  } catch (error) {
    res.status(500).json({ error: "Error fetching chatbot response" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newResponse = new Chatbot(req.body);
    await newResponse.save();
    res.status(201).json(newResponse);
  } catch (error) {
    res.status(400).json({ error: "Error creating chatbot response" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const updatedResponse = await Chatbot.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedResponse) {
      return res.status(404).json({ message: "Chatbot response not found" });
    }
    res.status(200).json(updatedResponse);
  } catch (error) {
    res.status(500).json({ error: "Error updating chatbot response" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const deletedResponse = await Chatbot.findByIdAndDelete(req.params.id);
    if (!deletedResponse) {
      return res.status(404).json({ message: "Chatbot response not found" });
    }
    res.status(200).json({ message: "Chatbot response deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting chatbot response" });
  }
});

export default router;
