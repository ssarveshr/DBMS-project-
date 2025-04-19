import express from 'express'
import User from '../models/User.js'
import Faculty from '../models/faculty.js'
import Organizer from '../models/organizer.js'
import ValidateStudentData from '../validation/StudentValidation.js'
import ValidateFacultyData from '../validation/FacultyValidation.js'
import ValidateOrganizerData from '../validation/OragnizerValidation.js'
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config.js";

const CommonForgetPassword = express.Router()

