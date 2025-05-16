import express from "express";
import User from "../models/User.js";
import EventValidation from "../validation/EventValidation.js";
import { checkRole } from "../middleware/authMiddleware.js";
import passport from "passport";
import Event from "../models/events.js";

const Studentrouter = express.Router()

// @desc Fetchs data of student
// @method Get 
// @access Private
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


// @desc student Registeration for an event 
// @method post 
// @access Private
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

		const Existing_event = await Event.findOne({ title: eventname })
		if (!Existing_event) {
			return res.status(404).json({
				message: 'Event not found'
			})
		}

		Existing_event.registeredStudents.unshift(Existing_User)
		//Below line is used to push the event into the student registered events
		Existing_User.studentInfo.registeredEvents.unshift(Existing_event)
		Existing_event.save().then(result => {
			return res.status(201).json(result)
		})
			.catch(err => {
				console.log(err)
				return res.status(404).json(err)
			})

	} catch (error) {
		console.log(error)
		return res.status(500).json(error)
	}
})
// below router to to display the events registered by the student
Studentrouter.get('/my-events', passport.authenticate('jwt', { session: false }), checkRole('student'), async (req, res) => {
	try {
		const student = await User.findOne({ email: req.user.User_Email });

		if (!student) {
			return res.status(404).json({ message: "Student not found" });
		}

		const registeredEvents = student.studentInfo.registeredEvents || [];

		return res.status(200).json({ events: registeredEvents });
	} catch (error) {
		console.error(error);
		return res.status(500).json({ error: "Internal server error" });
	}
});

export default Studentrouter;

