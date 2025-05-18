import express from "express";
import cors from "cors";
import { PORT, MongoDB } from "./config.js";
import mongoose from "mongoose";
import Studentrouter from "./serverRoutes/studentRouter.js";
import Facultyrouter from "./serverRoutes/facultyrouter.js";
import OrganizerRouter from "./serverRoutes/organiserRouter.js";
import CommonLoginRouter from "./serverRoutes/commonlogin.js";
import passport from "passport";
import chalk from 'chalk'
import commonsignup from "./serverRoutes/commonsignup.js";
import Public from "./serverRoutes/Public/PublicRouter.js";
import DeleteAccount from "./serverRoutes/Deleteaccount.js";
import path from 'path';
import { fileURLToPath } from 'url';
import uploadrouter from "./serverRoutes/Public/upload.js";

const app = express();
// authMiddleware(passport)
app.use(passport.initialize());
app.use(express.json());
app.use(cors())

if (process.env.NODE_ENV === 'development') {
	app.use(morgan('dev'));
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.use("/api/auth/Student", Studentrouter);
app.use("/api/auth/Faculty", Facultyrouter);
app.use("/api/auth/Organiser", OrganizerRouter); // Use authentication routes
app.use("/api", CommonLoginRouter, commonsignup, Public, DeleteAccount);
app.use('/api/upload', uploadrouter);


mongoose.connect(MongoDB).then(() => {
	try {
		console.log(chalk.cyan.underline(` MongoDB connected succefully `)),
			app.listen(PORT, () => {
				console.log(chalk.yellow.bold(`🚀 Server running on port ${PORT}`))
			})
	} catch (error) {
		console.log(error)
	}
})



