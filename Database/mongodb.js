import mongoose from "mongoose";

import { DB_URI,NODE_ENV} from "../config/env.js";

if(!DB_URI){
    console.error("Please provide the DB_URI in the environment variable inside .env<development|production>.local file");
}

const connectDB = async () => {
    try {
        await mongoose.connect(DB_URI);
        console.log(`MongoDB connected successfully in ${NODE_ENV} mode.`);
    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
        process.exit(1); // Exit the process with failure
    }
};

export default connectDB;