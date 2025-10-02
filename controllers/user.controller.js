import User from "../models/user.model.js";

// ✅ Get all users
export const getUsers = async (req, res, next) => {
    try {
        const users = await User.find().select("-password");
        res.status(200).json({
            success: true,
            users,
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Get a single user by ID
export const getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.params.id).select("-password");
        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Create a new user
export const createUser = async (req, res, next) => {
    try {
        const { name, email, password } = req.body;

        // Check if email already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            const error = new Error("User with this email already exists");
            error.status = 400;
            throw error;
        }

        const newUser = new User({ name, email, password });
        await newUser.save();

        res.status(201).json({
            success: true,
            message: "User created successfully",
            user: {
                _id: newUser._id,
                name: newUser.name,
                email: newUser.email,
            },
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Update a user
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const updates = req.body;

        const user = await User.findByIdAndUpdate(id, updates, {
            new: true,
            runValidators: true,
        }).select("-password");

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User updated successfully",
            user,
        });
    } catch (error) {
        next(error);
    }
};

// ✅ Delete a user
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.params;
        const user = await User.findByIdAndDelete(id);

        if (!user) {
            const error = new Error("User not found");
            error.status = 404;
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "User deleted successfully",
        });
    } catch (error) {
        next(error);
    }
};
