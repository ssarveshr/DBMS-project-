import express from "express";
import cors from "cors";
import { PORT, MongoDB } from "./config.js";
import mongoose from "mongoose";
import Studentrouter from "./serverRoutes/studentRoutes.js";


const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth/student", Studentrouter); // Use authentication routes


mongoose.connect(MongoDB).then(() => {
	try {
		console.log(` MongoDB connected succefully `),
  		app.listen(PORT, () => {
    	console.log(`🚀 Server running on port ${PORT}`);
  })
	} catch (error) {
		console.log(error)
	}
})



