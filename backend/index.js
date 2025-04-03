import express from "express";
import cors from "cors";
import { PORT, MongoDB } from "./config.js";
import mongoose from "mongoose";
import Studentrouter from "./serverRoutes/studentRouter.js";
import Facultyrouter from "./serverRoutes/facultyRouter.js";
import OrganizerRouter from "./serverRoutes/organiserRouter.js";
import passport from "passport";

import authMiddleware from "./middleware/authMiddleware.js";
const app = express();
authMiddleware(passport)
app.use(express.json());
app.use(cors());

app.use("/api/auth/Student", Studentrouter);
app.use("/api/auth/Faculty", Facultyrouter);
app.use("/api/auth/Organiser", OrganizerRouter); // Use authentication routes


mongoose.connect(MongoDB).then(() => {
	try {
		console.log(` MongoDB connected succefully `),
  		app.listen(PORT, () => {
    	console.log(`🚀 Server running on port ${PORT}`)
  })
	} catch (error) {
		console.log(error)
	}
})



