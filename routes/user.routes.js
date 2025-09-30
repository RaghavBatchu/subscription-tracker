import { Router } from "express";   
import { getUser, getUsers } from "../controllers/user.controller.js";
import { get } from "mongoose";
import authorize from "../middlewares/auth.middleware.js";

const userRouter = Router();

userRouter.get('/',getUsers);

userRouter.get('/:id', authorize, getUser);

userRouter.post('/', (req, res) => {
    // Handle login logic here
    res.send({title: 'Create a new user' });
});

userRouter.put('/', (req, res) => {
    // Handle login logic here
    res.send({title: 'Update the user ' });
});

userRouter.delete('/', (req, res) => {
    // Handle login logic here
    res.send({title: 'Delete the user' });
});

export default userRouter;