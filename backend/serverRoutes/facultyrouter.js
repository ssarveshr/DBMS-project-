import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import passport, { Passport } from "passport";
import ValidateFacultyData from '../validation/FacultyValidation.js'
import { checkRole } from "../middleware/authMiddleware.js";
import Event from '../models/events.js'
import User from "../models/User.js";

const Facultyrouter = express.Router();


Facultyrouter.get('/', passport.authenticate('jwt', { session: false }), checkRole('faculty'), async (req, res) => {

  try {
    // console.log('This is the value of request.user : ',req.user)
    const Email = req.user.User_Email
    console.log(Email)

    const Faculty_user = await User.findOne({ email: Email })

    if (!Faculty_user) {
      return res.status(404).json({
        message: 'Faculty not found'
      })
    }
    console.log('This is the value of Faculty_user : ', Faculty_user.facultyInfo)

    const Faculty_name = Faculty_user.facultyInfo?.facultyname;

    console.log('This is the value of Faculty_name : ', Faculty_name)

    if (!Faculty_name) {
      return res.status(404).json({
        message: 'Faculty name not found'
      })
    }

    // Find events for this faculty
    const event = await Event.find({ facultyName: Faculty_name });

    if (!event) {
      return res.status(404).json({ message: 'No events found' });
    }
    console.log('This is the value : ',event)
    // If event is not ongoing, return it; else, indicate no unapproved events

    const Not_approved = []

    event.map(item => {
      if (item.is_ongoing === 'false') {
        Not_approved.unshift(item)
      }
    })

    if(Not_approved.length === 0){
      return res.status(204).json({
        message : "All Events asigned to you are approved"
      })
    }

    return res.status(200).json(Not_approved)

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Internal server error' });
  }
})



Facultyrouter.put('/approve-event', passport.authenticate('jwt', { session: false }), checkRole('faculty'), async (req, res) => {
  try {
    const { organiserName, title, facultyName } = req.body;
    console.log('This is the value of req.user : ', req.user)

    // Find the event based on the provided information
    const event = await Event.findOne({ organiserName, title, facultyName });

    if (!event) {
      return res.status(404).json({ error: "Event not found" });
    }

    // Update the is_ongoing field
    event.is_ongoing = "true";

    // Save the updated event
    await event.save()

    return res.status(200).json({
      success: 'approved'
    })

  } catch (error) {
    console.error("Error approving event:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default Facultyrouter;
