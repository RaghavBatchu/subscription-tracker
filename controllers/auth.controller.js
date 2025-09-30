import mongoose from "mongoose";
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";
import js from "@eslint/js";
import jwt from "jsonwebtoken";


export const signUp = async (req, res, next) => {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        //logic to create user
        const { name, email, password } = req.body;

        // Check if user already exists
        // If exists, throw an error
        const existingUser = await User.findOne({ email }).session(session);
        if (existingUser) {
            const error = new Error('User already exists with this email');
            error.status = 400;
            throw error;
        }

        //Hash the password before saving to DB
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUsers = await User.create([{ name, email, password: hashedPassword}],{session});
        
        await session.commitTransaction();
        session.endSession();
        const token = jwt.sign({userID: newUsers[0]._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

        res.status(201).json({
            success: true,
            message: 'User created successfully',
            token,
            user: newUsers[0]
        });

    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};
export const signIn = async (req, res, next) => {
    const {email, password} = req.body;

    try {
        //Check if user exists
        const user = await User.findOne({email});
        if(!user){
            const error = new Error('Invalid credentials - email');
            error.status = 400;
            throw error;
        }
        //Check if password matches
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            const error = new Error('Invalid credentials - password');
            error.status = 400;
            throw error;
        }
        const token = jwt.sign({userID: user._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
        res.status(200).json({
            success: true,
            message: 'User signed in successfully', 
            token,
            user
        });
    } catch (error) {
        next(error);
    }

};
export const signOut = async (req, res, next) => {};