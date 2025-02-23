import express from "express";
import CommunityChat from "../models/communityChat.js";

const router = express.Router();

// router.use((req, res, next) => {
//   if (!req.cookies["user"]) {
//     return res.status(401).json({ error: "Unauthorized" });
//   }
//   next();
// });

router.get("/", async (req, res) => {
  try {
    const chat = await CommunityChat.find();
    console.log("sending chat")
    console.log(chat);
    res.status(200).json(chat);
  } catch (error) {
    res.status(500).json({ error: "Failed to get community chat" });
  }
});

router.post("/", async (req, res) => {
  const { newMsg } = req.body;
  try {
    if (newMsg === null) {
      return res.status(400).json({ error: "All fields are required" });
    }
    // let user = req.cookies["user"];
    const newChat = new CommunityChat({ msg: newMsg });
    await newChat.save();
    console.log("new chat");
    res.status(201).json(newChat);
  } catch (error) {
    res.status(400).json({ error: "Failed to create chat" });
  }
});

export default router;
