import express from "express";
import User from "../models/User.js";
import mongoose from "mongoose";
import { tr } from "@faker-js/faker";

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
  let { username, password } = req.body;
  try {
    let user = await User.findOne({ name: username }); 
    if(!user){
      console.log("User not found");
      res.status(404).json({ error: "User not found" });
    }
    else if(user.password === password){
      console.log("Login successful");
      res.status(200).json(user);
    }
    else{
      console.log("Login failed");
      res.status(401).json({ error: "Wrong Password" });
    }
  } 
  catch(error) {
        console.error("Login Error:", error);
        res.status(500);
  }
});


router.post("/sign_up" , async (req, res) => {
  console.log("Sign up page");
  let { username, email, phone, password, exam } = req.body;
  let name = username;

  let check = await User.findOne({ name: username, email:email });
  if(check){
    console.log("User already exists");
    res.status(400).json({ error: "User already exists" });
  }
  else
  {
    let newUser = new User({ name, email, phone, password, exam });
    await newUser.save().then(() => {
      console.log("User created")
      res.status(200).json(newUser);
    }).catch((err) => {
      console.log("Error:", err);
      console.log("Failed to create user");
      console.log(err);
      res.status(401).json({ error: "Failed to create user" });
    });
  }
});


export default router;