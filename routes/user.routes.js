import { Router } from "express";   

const userRouter = Router();

userRouter.get('/', (req, res) => {
    // Handle login logic here
    res.send({title: 'Get all users' });
});

userRouter.get('/:id', (req, res) => {
    // Handle login logic here
    res.send({title: 'Get user details' });
});

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