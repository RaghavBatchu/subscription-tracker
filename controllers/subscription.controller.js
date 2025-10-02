import Subscription from "../models/subscription.model.js";

export const getAllSubscriptions = async (req, res, next) => {
    try {
        const subscriptions = await Subscription.find();
        res.status(200).json({ success: true, data: subscriptions });
    } catch (error) {
        next(error);
    }
};

export const getSubscriptionById = async (req, res, next) => {
    try {
        const subscription = await Subscription.findById(req.params.id);
        if (!subscription) return res.status(404).json({ success: false, message: "Subscription not found" });
        res.status(200).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const createSubscription = async (req, res,next) => {
    // Logic to create a subscription
    try {
       const subscription = await Subscription.create({
        ...req.body,
        user: req.user.id
       });
      res.status(201).json({ success: true, data: subscription });
    } catch (error) {
        next(error);
    }
};

export const updateSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subscription) return res.status(404).json({ success: false, message: "Subscription not found" });
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};

export const deleteSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndDelete(req.params.id);
    if (!subscription) return res.status(404).json({ success: false, message: "Subscription not found" });
    res.status(200).json({ success: true, message: "Subscription deleted successfully" });
  } catch (error) {
    next(error);
  }
};

export const getUserSubscriptions = async (req, res, next) => {
  try {
    const subscriptions = await Subscription.find({ user: req.params.id });
    res.status(200).json({ success: true, data: subscriptions });
  } catch (error) {
    next(error);
  }
};

export const cancelSubscription = async (req, res, next) => {
  try {
    const subscription = await Subscription.findByIdAndUpdate(req.params.id, { status: "cancelled" }, { new: true });
    if (!subscription) return res.status(404).json({ success: false, message: "Subscription not found" });
    res.status(200).json({ success: true, data: subscription });
  } catch (error) {
    next(error);
  }
};
