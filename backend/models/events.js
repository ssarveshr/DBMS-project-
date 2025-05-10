import mongoose from "mongoose";

const EventSchema = new mongoose.Schema({
	organiserName: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true,
		unique: true
	},
	description: {
		type: String,
		required: true
	},
	date: {
		type: Date,
		default: Date.now
	},
	// time 
	location: {
		type: String,
		required: true
	},
	// image 
	is_ongoing: {
		type: String,
	},
	facultyName: {
		type: String,
		required: true
	},
})

const Event = mongoose.model('events', EventSchema)

export default Event