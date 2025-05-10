import express from "express";
import User from "../models/User.js";
import Event from '../models/events.js'
import EventValidation from "../validation/EventValidation.js";
import { checkRole } from "../middleware/authMiddleware.js";
import passport from "passport";
// import  from "../middleware/authMiddleware.js";

const Studentrouter = express.Router()

// Get request to access Student DATA 
//* private router
Studentrouter.get('/current', passport.authenticate('jwt', { session: false }), checkRole('student'), (req, res) => {
	try {
		// res.cookie({
		// 	NAME : 'samudra',
		// 	JOB : 'Full Stack dev'
		// })

		User.findOne({ email: req.user.User_Email }).then(result => {
			console.log(result)
			return res.status(200).json(result)
		})
			.catch(err => {
				console.log(err)
				return res.status(404).json(err)
			})

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
Studentrouter.get('/events/:id', (req, res) => {
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
Studentrouter.post('/register-event', passport.authenticate('jwt', { session: false }), checkRole('student'), async (req, res) => {
	const { name, email, eventname, branchname } = req.body
	const { errors, valid, isValid } = EventValidation(req.body)

	try {
		if (!isValid) {
			return res.status(400).json(errors)
		}

		const newRegisteration = {
			name: name,
			email: email,
			eventName: eventname,
			branchName: branchname
		}
		const Existing_User = await User.findOne({ email })
		console.log(Existing_User)
		if (!Existing_User) {
			return res.status(404).json({
				message: '404 Not found student'
			})
		}
		Existing_User.studentInfo.registeredEvents.unshift(newRegisteration)

		Existing_User.save().then(result => {
			console.log(result)
			return res.status(200).json(valid)
		})
			.catch(error => {
				console.log(error)
				errors.unautharized = 'You have to login before registration'
				return res.status(403).json(errors)
			})

	} catch (error) {
		console.log(error)
		return res.status(500).json(error)
	}
})

export default Studentrouter;
