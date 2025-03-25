import express from "express";
import cors from "cors";
import { PORT } from "./config.js"; // Import PORT
import connectDB from "./serverRoutes/mongo_connect.js"; // Import DB connection
import routes from "./serverRoutes/routes.js"; // Import routes

// Connect to MongoDB
connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use("/", routes);

app.listen(PORT, () => {
  console.log(`The server is running at PORT: ${PORT}`);
});
