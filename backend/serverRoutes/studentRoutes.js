import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config.js";

const router = express.Router();

// ✅ SIGNUP Route page to create a Account
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user already exists
    let user = await User.findOne({ email });
    if (user) return res.status(400).json({ message: "User already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10)
    if (hashedPassword == password) {
      return res.status(400).send({
        message: 'not created succussfully'
      })
    }
    user = new User({ email, password: hashedPassword });
    await user.save();

    res.status(201).json({ message: "User registered successfully" });
    return res.status(200).send({
      message: 'created succussfully'
    })
    // Create new user

  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ LOGIN Route page for Student Loging 
// email password 
router.post("/login/Student", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email: email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password incorrect" });
    } else {
      const PayLoad = {
        User_id: user._id,
        User_email: user.email,
        User_password: user.password
      }
      const token = jwt.sign(PayLoad, JWT_SECRET, { expiresIn: "1h" });
      if (token) {
        return res.status(201).send({
          success: true,
          message: "Login successful",
          token: 'Bearer ' + token
        })
      }
    }

    // Generate JWT token
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ FORGOT PASSWORD Route (Placeholder)
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(400).json({ message: "User not found" });

    // Implement password reset logic (e.g., send email with reset link)
    res.json({ message: "Password reset link sent to email" });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// router.post("/test", (req, res) => {
//     console.log(req.body);  // Debugging
//     res.json({ message: `Received: Name=${req.body.name}, Email=${req.body.email}` });
//   });

export default router;
