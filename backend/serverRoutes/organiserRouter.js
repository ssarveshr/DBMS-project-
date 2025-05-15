import express from "express";
import passport from "passport";
import { checkRole } from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import EventcreateValidation from "../validation/EventCreateValidation.js";
import Event from "../models/events.js";

const OrganizerRouter = express.Router();

// @desc Fetchs data of Organizer
// @method Get 
// @access Private
OrganizerRouter.get('/current', passport.authenticate('jwt', { session: false }), checkRole('organizer'), (req, res) => {
	User.findOne({ email: req.user.User_Email }).then(result => {
		console.log(result)
		return res.status(200).json(result)
	})
		.catch(err => {
			console.log(err)
			return res.status(404).json(err)
		})
})


// @desc Organizer created events
// @method post 
// @access Private
OrganizerRouter.post('/create-events', passport.authenticate('jwt', { session: false }), checkRole('organizer'), (req, res) => {
	console.log('This is the value of body : ', req.body)
	const { Orgname, title, loca, desc, faculty } = req.body
	// const { errors, valid, isValid } = EventcreateValidation(req.body)
	const errors = {}

	try {
		console.log(req.user.User_Email)

		const email = req.user.User_Email


		const Existing_organiser = User.findOne({ email })

		if (!Existing_organiser) {
			errors.notfound = 'Organiser Not existed please create one'
			return res.status(404).json(errors)
		}

		const NewEvent = {
			organiserName: Orgname,
			title: title,
			description: desc,
			location: loca,
			facultyName: faculty,
		}

		Event.create(NewEvent)
			.then(result => {
				console.log(result)
				return res.status(201).json(result)
			})
			.catch(err => {
				console.log(err)
				return res.status(400).json(err)
			})

	} catch (error) {
		console.log(error)
		return res.status(500).json({
			message: 'Internal server issue'
		})
	}



})

export default OrganizerRouter;
