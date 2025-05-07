import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: false
	},
	USN:{
		type: String,
		required: true,
		unique: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		unique: true
	},
	// When student registers for an event this array keeps getting appened with the id of respective event
	registeredEvents : []
});

const User = mongoose.model("User", UserSchema);
export default User;
