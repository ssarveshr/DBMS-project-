import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import passport, { Passport } from "passport";
import ValidateFacultyData from '../validation/FacultyValidation.js'
import { checkRole } from "../middleware/authMiddleware.js";
import Event from '../models/events.js'

const Facultyrouter = express.Router();




// ✅ LOGIN Route page for Faculty Loging 
// email password 

Facultyrouter.post('/approve-event', passport.authenticate('jwt', { session: false }), checkRole('faculty'), async (req, res) => {
  try {
    const { organiserName, title, facultyName } = req.body;

    // Find the event based on the provided information
    const event = await Event.findOne({ organiserName, title, facultyName });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Update the is_ongoing field
    event.is_ongoing = "true";

    // Save the updated event
    await event.save();

    res.json({ message: "Event approved successfully", event });
  } catch (error) {
    console.error("Error approving event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ FORGOT PASSWORD Route (Placeholder)


// router.post("/test", (req, res) => {
//     console.log(req.body);  // Debugging
//     res.json({ message: `Received: Name=${req.body.name}, Email=${req.body.email}` });
//   });

export default Facultyrouter;
