// models/User.js
import { Schema, model } from 'mongoose';

const UserSchema = new Schema({
	email: { type: String, required: true},
	password: { type: String, required: true },
	role: { type: String, enum: ['student', 'organizer', 'admin'], required: true },
	// Add other fields specific to each role
	studentInfo: {
		name: {
			type: String,
		},
		usn: {
			type: String,
		},
		registeredEvents:[]
	},
	organizerInfo: {
		orgname: {
			type: String,
		  },
		Organiser_ID : {
			type: String,
		  },
	}
	//Add faculty later
});

// Hash password before saving
// UserSchema.pre('save', async function (next) {
// 	if (!this.isModified('password')) return next();
// 	this.password = await hash(this.password, 10);
// 	next();
// });

export default model('User', UserSchema);