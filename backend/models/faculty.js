
import mongoose from "mongoose";

const FacultySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    department: {
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
    }
});

const Faculty = mongoose.model("Faculty", FacultySchema);
export default Faculty;
