import User from "../models/user.model.js";
import { JWT_SECRET } from "../config/env.js";
import jwt from "jsonwebtoken";

const authorize = async (req, res, next) => {
    try {
        // Get token from headers
        let token;
        if (req.headers.authorization && req.headers.authorization.startsWith('Bearer ')) {
            token = req.headers.authorization.split(' ')[1];
        }

        if (!token) {
            return res.status(401).json({ message: 'Unauthorized, no token' });
        }

        // Verify token
        const decoded = jwt.verify(token, JWT_SECRET);

        // Find user
        const user = await User.findById(decoded.userID);
        if (!user) {
            return res.status(401).json({ message: 'No user found with this id' });
        }

        req.user = user;
        next();
    } catch (error) {
        if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ message: 'JSON Web Token is invalid, try again' });
        } else if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'JWT expired, please login again' });
        } else {
            return res.status(500).json({ message: 'Server error', error: error.message });
        }
    }
};

export default authorize;
