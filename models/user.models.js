import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please provide a name"],
        trim: true,
        minlength: [3, "Name must be at least 3 characters"],
        maxlength: [50, "Name must be at most 50 characters"]
    },
    email: {
        type: String,
        required: [true, "Please provide an email"],
        unique: true,
        trim: true,
        lowercase: true,
        match: [/.+\@.+\..+/, "Please fill a valid email address"],
        minlength: 5,
        maxlength: 255,
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        minlength: 6,
    }
}, { timestamps: true });

// timestamps will automatically add createdAt and updatedAt fields
// model name is always capital and singular
const User = mongoose.model("User", userSchema);

export default User;


