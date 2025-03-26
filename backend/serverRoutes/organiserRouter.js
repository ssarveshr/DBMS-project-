import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Organizer from "../models/organizer.js";
import { JWT_SECRET } from "../config.js";

const OrganizerRouter = express.Router();

// ✅ SIGNUP Route page to create a Account
OrganizerRouter.post("/signup", async (req, res) => {
  const Data = req.body
  try {
    console.log(Data.email)
    const Exist_user = await Organizer.findOne({ email: Data.email })
    console.log(Exist_user)
    if (Exist_user) {
      return res.status(400).send({
        message: 'User already Exists'
      })
    }

    console.log(Data.password)
    const NewUser = await Organizer.create({
      name: Data.name,
      email: Data.email,
      password: Data.password
    })

    const HashPassword = await bcrypt.hash(Data.password, 10)

    if (HashPassword) {
      NewUser.password = HashPassword
      NewUser.save()
      console.log(NewUser.password)
      return res.status(201).send({
        message: 'User successfully created'
      })
    }
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error"
    });
  }
});
// ✅ LOGIN Route page for organiser Loging 
// email password 
OrganizerRouter.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await Organizer.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email or password" });

    // Compare hashed passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid email or password" });
    } else {
      const PayLoad = {
        User_id: user._id,
        User_email: user.email,
        User_password: user.password
      }
      const token = jwt.sign(PayLoad, JWT_SECRET, { expiresIn: "1h" });
      if (token) {
        return res.status(200).send({
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
OrganizerRouter.post("/forgot-password", async (req, res) => {
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

export default OrganizerRouter;
