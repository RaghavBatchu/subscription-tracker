import { Router } from "express";

const SubscriptionRouter = Router();

SubscriptionRouter.get('/', (req, res) => {
    // Handle login logic here
    res.send({title: 'Get all subscriptions' });
});

SubscriptionRouter.get('/:id', (req, res) => {
    // Handle login logic here
    res.send({title: 'Get subscription details' });
});

SubscriptionRouter.post('/', (req, res) => {
    // Handle login logic here
    res.send({title: 'Create a new subscription' });
}); 

SubscriptionRouter.put('/:id', (req, res) => {
    // Handle login logic here
    res.send({title: 'Update the subscription ' });
});

SubscriptionRouter.delete('/', (req, res) => {
    // Handle login logic here
    res.send({title: 'Delete the subscription' });
});

SubscriptionRouter.get('/user/:id', (req, res) => {
    // Handle login logic here
    res.send({title: 'Get all subscriptions for a user' });
});

SubscriptionRouter.put('/cancel/:id', (req, res) => {
    // Handle login logic here
    res.send({title: 'Cancel a subscription' });
});



export default SubscriptionRouter;