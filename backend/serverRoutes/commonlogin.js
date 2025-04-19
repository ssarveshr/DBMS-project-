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


const CommonLoginRouter = express.Router()

CommonLoginRouter.post('/login', async (req, res) => {
    const { email, password, UserType } = req.body
    try {
        if (UserType === 'student') {
            const { errors, isValid } = ValidateStudentData(req.body)

            try {
                if (!isValid) {
                    return res.status(400).send(errors)
                }
                console.log(email)
                console.log(password)
                console.log(UserType)
                // Check if user exists
                const user = await User.findOne({ email: email });
                console.log(user)
                if (!user) return res.status(400).json({ message: "Invalid email" });

                // Compare hashed passwords
                const isMatch = await bcrypt.compare(password, user.password);
                console.log(isMatch)
                if (!isMatch) {
                    return res.status(400).json({ message: "Password incorrect" });
                }
                else {
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
                console.log(error)
                res.status(500).json({ error: "Internal Server Error" });
            }
        }
        else if (UserType === 'faculty') {

            const { errors, isValid } = ValidateFacultyData(req.body)

            try {
                if (!isValid) {
                    return res.status(400).send(errors)
                }

                // Check if user exists
                const facultydata = await Faculty.findOne({ email: Email });

                if (!facultydata) return res.status(400).json({ message: "Invalid email" });

                // Compare hashed passwords
                const isMatch = await bcrypt.compare(Password, facultydata.password);
                if (!isMatch) {
                    return res.status(400).json({ message: "Password incorrect" });
                }
                else {
                    const PayLoad = {
                        Faculty_id: facultydata._id,
                        Faculty_email: facultydata.email,
                        Faculty_password: facultydata.password
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

        }
        else if (UserType === 'organizer' && UserType === 'organiser') {

            const { errors, isValid } = ValidateOrganizerData(req.body)

            try {
                if (!isValid) {
                    return res.status(400).send(errors)
                }

                // Check if user exists
                const organiserdata = await Organizer.findOne({ email: Email });

                if (!organiserdata) return res.status(400).json({ message: "Invalid email or password" });

                // Compare hashed passwords
                const isMatch = await bcrypt.compare(Password, organiserdata.password);
                if (!isMatch) {
                    return res.status(400).json({ message: "Password incorrect" });
                }
                else {
                    const PayLoad = {
                        organizer_id: organiserdata._id,
                        organizer_email: organiserdata.email,
                        organizer_password: organiserdata.password
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

        }
        else{
            return res.status(404).json({
                message : 'Not found'
            })
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json(error)
    }
})

export default CommonLoginRouter