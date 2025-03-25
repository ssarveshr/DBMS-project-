import mongoose from "mongoose";
import { MongoDB } from "../config.js"; // Import MongoDB connection string

const connectDB = async () => {
  try {
    await mongoose.connect(MongoDB, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export default connectDB;
