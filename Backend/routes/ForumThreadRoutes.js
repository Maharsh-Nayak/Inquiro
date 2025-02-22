import express from "express";
import ForumThread from "../models/ForumThread.js";
import User from "../models/User.js";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const threads = await ForumThread.find().populate("author", "name");
    res.json(threads);
  } catch (error) {
    res.status(500).json({ error: "Failed to get forum threads" });
  }
});

router.post("/", async (req, res) => {
  const { title, content, authorId } = req.body;
  try {
    if (!title || !content || !authorId) {
        return res.status(400).json({ error: "All fields are required" });
      }
    const newThread = new ForumThread({ title, content, author: authorId });
    await newThread.save();
    res.status(201).json(newThread);
  } catch (error) {
    res.status(400).json({ error: "Failed to create thread" });
  }
});

router.post("/:threadId/comments", async (req, res) => {
  const { threadId } = req.params;
  const { userId, text } = req.body;
  
  try {
    if (!userId || !text) {
        return res.status(400).json({ error: "User ID and comment text are required" });
    }
    const thread = await ForumThread.findById(threadId);
    if (!thread) return res.status(404).json({ error: "Thread not found" });

    thread.comments.push({ user: userId, text });
    await thread.save();

    res.status(201).json(thread);
  } catch (error) {
    res.status(400).json({ error: "Failed to add comment" });
  }
});
router.post("/:threadId/like", async (req, res) => {
  const { threadId } = req.params;
  const { userId } = req.body;

  try {
    const thread = await ForumThread.findById(threadId);
    if (!thread) return res.status(404).json({ error: "Thread not found" });

    if (thread.likes.includes(userId)) {
      return res.status(400).json({ error: "You already liked this thread" });
    }

    thread.likes.push(userId);
    await thread.save();

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

export default router;
