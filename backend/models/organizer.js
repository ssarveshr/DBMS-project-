import mongoose from "mongoose";

const OragnizerSchema = new mongoose.Schema({
    name: {
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

const Organizer = mongoose.model("Organizer", OragnizerSchema);
export default Organizer;
