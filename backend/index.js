import express from "express";
import cors from "cors";
import { PORT } from "./config.js";
import connectDB from "./serverRoutes/mongo_connect.js";
import authRoutes from "./serverRoutes/authRoutes.js";

connectDB(); // Connect to MongoDB

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/auth", authRoutes); // Use authentication routes

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
