import { Router } from "express";
import authorize from "../middlewares/auth.middleware.js";
import {
  createSubscription,
  getAllSubscriptions,
  getSubscriptionById,
  updateSubscription,
  deleteSubscription,
  getUserSubscriptions,
  cancelSubscription
} from "../controllers/subscription.controller.js";

const SubscriptionRouter = Router();

// Get all subscriptions
SubscriptionRouter.get('/', getAllSubscriptions);

// Get subscription details by ID
SubscriptionRouter.get('/:id', getSubscriptionById);

// Create a subscription (requires authorization)
SubscriptionRouter.post('/', authorize, createSubscription);

// Update a subscription by ID
SubscriptionRouter.put('/:id', updateSubscription);

// Delete a subscription by ID
SubscriptionRouter.delete('/:id', deleteSubscription);

// Get all subscriptions for a specific user
SubscriptionRouter.get('/user/:id', getUserSubscriptions);

// Cancel a subscription by ID
SubscriptionRouter.put('/cancel/:id', cancelSubscription);

export default SubscriptionRouter;
