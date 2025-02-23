import express from "express";
import ForumThread from "../models/ForumThread.js";
import User from "../models/User.js";
import { tr } from "@faker-js/faker";

const router = express.Router();

router.use((req, res, next) => {
  if (!req.cookies["user"]) {
    return res.status(401).json({ error: "Unauthorized" });
  }
  next();
});

router.get("/", async (req, res) => {
  try {
    const threads = await ForumThread.find();
    console.log(threads);
    res.status(200).json(threads);
  } catch (error) {
    res.status(500).json({ error: "Failed to get forum threads" });
  }
});

router.post("/", async (req, res) => {
  const { newDoubt } = req.body;
  let author = req.cookies["user"];
  try {
    const newThread = new ForumThread({ content : newDoubt });
    await newThread.save();
    res.status(201).json(newThread);
  } catch (error) {
    res.status(400).json({ error: "Failed to create thread" });
  }
});

router.post("/:threadId/comments", async (req, res) => {
  const { threadId } = req.params;
  const { newComment } = req.body;
  let user = req.cookies["user"];

  console.log(newComment);
  console.log(user);
  console.log(threadId);
  
  try {
    const thread = await ForumThread.findById(threadId);
    if (!thread) return res.status(404).json({ error: "Thread not found" });

    console.log(thread)

    console.log(2);
    thread.comments.push({ text: newComment});
    try {
      await thread.save();
    } catch (error) {
      console.log(error);
    }

    console.log(3);
    res.status(201).json(thread);
  } catch (error) {
    res.status(400).json({ error: "Failed to add comment" });
  }
});

router.post("/:threadId/like", async (req, res) => {
  const { threadId } = req.params;

  try {
    const thread = await ForumThread.findById(threadId);
    if (!thread) return res.status(404).json({ error: "Thread not found" });

    thread.likes += 1;

    try {
      await thread.save();
    } catch (error) {
      console.log(error);
    }

    res.status(200).json({ message: "Thread liked" });
  } catch (error) {
    res.status(400).json({ error: "Failed to like thread" });
  }
});

router.delete("/:threadId", async (req, res) => {
  const { threadId } = req.params;

  try {
    await ForumThread.findByIdAndDelete(threadId);
    if (!thread) return res.status(404).json({ error: "Thread not found" });
    res.status(200).json({ message: "Thread deleted" });
  } catch (error) {
    res.status(400).json({ error: "Failed to delete thread" });
  }
});

router.get("/comment" , async (req, res) => {
  try {
    const comments = await ForumThread.find().populate("comments");
    console.log(comments);
    res.status(200).json(comments);
  } catch (error) {
    res.status(500).json({ error: "Failed to get forum comments" });
  }
});


export default router;
