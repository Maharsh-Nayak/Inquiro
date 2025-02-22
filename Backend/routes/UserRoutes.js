import express from "express";
import User from "../models/User.js";
import mongoose from "mongoose";

const router = express.Router();


router.get("/", async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: "Server error" });
  }
});

router.post("/", async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json({ error: "Failed to create user" });
  }
});

router.post("/login", async (req, res) => {
  console.log("Login Data:", req.body);
  const { username, password } = req.body;
  main().then(() => console.log('Database connected')).
  catch(err => console.log(err));
  
  async function main() {
    await mongoose.connect(process.env.MONGO_URI);
  }

  let user = await User.find({ username: username, password: password }); 
  if(!user){
    res.status(400).json({ error: "Invalid credentials" });
  }

  res.status(200).json(user);
});

export default router;