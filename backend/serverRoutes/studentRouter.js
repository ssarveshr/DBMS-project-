import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_SECRET } from "../config.js";
import passport, { Passport } from "passport";
import ValidateStudentData from '../validation/StudentValidation.js'
import Event from '../models/events.js'
// I have added Token for sign up also cause it give UX to not make user to enter the login credentials after signup 


const Studentrouter = express.Router()

// ✅ SIGNUP Route page to create a Account
//* JWT-Auth
//*public
Studentrouter.post("/signup", async (req, res) => {
	const { errors, isValid } = ValidateStudentData(req.body)

	const Data = req.body
	try {

		if (!isValid) {
			return res.status(400).send(errors)
		}
		console.log(Data.email)
		const Exist_user = await User.findOne({ email: Data.email })
		console.log(Exist_user)
		if (Exist_user) {
			errors.noUser = 'User already Exists'
			return res.status(400).send(errors)
		}
		const Exist_Name = await User.findOne({ name: Data.name })
		console.log(Exist_Name)
		if (Exist_Name) {
			errors.NameExist = 'username is already exists'
			return res.status(400).send(errors)
		}
		console.log(Data.password)
		const NewUser = await User.create({
			name: Data.name,
			USN: Data.USN,
			email: Data.email,
			password: Data.password
		})

		const HashPassword = await bcrypt.hash(Data.password, 10)

		if (HashPassword) {
			NewUser.password = HashPassword
			NewUser.save()
			console.log(NewUser.password)
			const PayLoad = {
				User_id: NewUser._id,
				User_email: NewUser.email,
				User_password: NewUser.password
			}
			const Token = jwt.sign(PayLoad, JWT_SECRET, { expiresIn: '1h' })
			if (Token) {
				return res.status(201).send({
					success: true,
					message: 'signin successfull',
					Token: 'Bearer ' + Token
				})
			}

		}
	} catch (error) {
		console.log(error)
		errors.InternalServerIssue = "Internal Server Error"
		return res.status(500).send(errors);
	}
});


// ✅ LOGIN Route page for Student Loging 
//* JWT-Auth
//*public
// email password 
Studentrouter.post("/login", async (req, res) => {
	const { errors, isValid } = ValidateStudentData(req.body)
	try {
		if (!isValid) {
			return res.status(400).send(errors)
		}
		const { email, password } = req.body;

		// Check if user exists
		const user = await User.findOne({ email: email });
		if (!user) return res.status(400).json({ message: "Invalid email or password" });

		// Compare hashed passwords
		const isMatch = await bcrypt.compare(password, user.password);
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
		res.status(500).json({ error: "Internal Server Error" });
	}
});


// ✅ FORGOT PASSWORD Route (Placeholder) 
// //!UnderDev
Studentrouter.post("/forgot-password", async (req, res) => {
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

// Post request to access Student Dashboard 
//* private router
Studentrouter.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
	try {
		// res.cookie({
		// 	NAME : 'samudra',
		// 	JOB : 'Full Stack dev'
		// })
		return res.status(200).send(req.user)

	} catch (error) {
		console.log(error)
	}
})


// Get request to display all the events 
//* Public router
Studentrouter.get('/events', (req, res) => {

	Event.find()
		.then((result) => {
			return res.status(200).json(result)
		})
		.catch(error => {
			console.log(error)
			return res.status(404).json(error)
		})

})


// Get request to display an event by its Id 
//* Public router
Studentrouter.get('/events/:id' , (req,res) => {
	const id = req.params.id

	Event.findById(id)
	.then((result) => {
		return res.status(200).json(result)
	})
	.catch(error => {
		console.log(error)
		return res.status(404).json(error)
	})
})


// Post request to register for an event 
//* Private router
Studentrouter.post('/register-event' , (req,res) => {
	const {name , dob , email , eventname} = req.body

	try {
		if(
			!name ||
			!dob ||
			!email ||
			!eventname
		){
			return res.status(400).json({
				message : 'All fields are required'
			})
		}
		
	} catch (error) {
		console.log(error)
		return res.status(500).json(error)
	}
})

export default Studentrouter;
