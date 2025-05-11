import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";
import passport, { Passport } from "passport";
import ValidateFacultyData from '../validation/FacultyValidation.js'

const Facultyrouter = express.Router();




// ✅ LOGIN Route page for Faculty Loging 
// email password 

Facultyrouter.post

// ✅ FORGOT PASSWORD Route (Placeholder)


// router.post("/test", (req, res) => {
//     console.log(req.body);  // Debugging
//     res.json({ message: `Received: Name=${req.body.name}, Email=${req.body.email}` });
//   });

export default Facultyrouter;
