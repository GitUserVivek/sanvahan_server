import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from "jsonwebtoken"
import authMiddleware from '../utils/authMiddleware.js';
import User from '../models/User.js';
import env from "dotenv"
env.config()
const router = express.Router();


// Register User (Create)
router.post('/register', async (req, res) => {
    const { name, email, password, role, phone, truckOwnerDetails, organizationName, driverDetails } = req.body;

    try {
        const userExists = await User.findOne({ email });
        if (userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }


        const newUser = new User({
            name,
            email,
            password: password,
            role,
            phone,
            organizationName,
            truckOwnerDetails: role === 'truckOwner' ? truckOwnerDetails : undefined,
            driverDetails: role === 'driver' ? driverDetails : undefined,
        });

        await newUser.save();
        res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
        res.status(500).json({ message: 'Error creating user', error: error.message });
    }
});

// Login User (Authenticate)
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: 'User not found !' });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: 'Invalid email or password' });
        }

        const token = jwt.sign({ user: user }, process.env.SECKEY, { expiresIn: '1h' });

        res.json({
            token,
            user
        });
    } catch (error) {
        res.status(500).json({ message: 'Error logging in', error: error.message });
    }
});

// Get User by ID (Read)
router.get('/:userId', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.params.userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching user', error: error.message });
    }
});

// Update User (Update)
router.put('/:userId', authMiddleware, async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId,
            req.body,
            { new: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (error) {
        res.status(500).json({ message: 'Error updating user', error: error.message });
    }
});

// Delete User (Delete)
router.delete('/:userId', authMiddleware, async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting user', error: error.message });
    }
});

export default router;
