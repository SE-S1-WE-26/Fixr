const jwt = require('jsonwebtoken');
const { validationResult } = require('express-validator');

const User = require('../../models/user/user.model');
const Worker = require('../../models/worker/worker.model');
const Client = require('../../models/client/client.model');

// Helper function to generate JWT token
const generateToken = (user) => {
    return jwt.sign(
        { userId: user._id, email: user.email },
        '2fe3ce2f', // Use your secret key from environment variables
        { expiresIn: '1h' }
    );
};

// User Signup Controller (Common)
exports.signupUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { name, rating, location, email, profilePic, username, password, userType, age, socialLinks, earnings, category, hourlyRate, experience, place, latitude ,longitude } = req.body;

    try {
        // Check if the username or email already exists
        let existingUser = await User.findOne({ $or: [{ email }, { username }] });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Create new user without password hashing
        const newUser = new User({
            name,
            rating,
            location,
            email,
            profilePic,
            username,
            password,// Store the raw password (not recommended)
            longitude,
            latitude 
        });

        // Save user to the database
        const savedUser = await newUser.save();

        // Extend registration based on user type (Client or Worker)
        if (userType === 'worker') {
            const newWorker = new Worker({
                userId: savedUser._id,
                age,
                socialLinks,
                earnings,
                category,
                hourlyRate,
                experience,
                place,
                longitude,
                latitude
            });

            await newWorker.save();
        } else if (userType === 'client') {
            const newClient = new Client({
                userId: savedUser._id,
            });

            await newClient.save();
        } else {
            return res.status(400).json({ message: 'Invalid user type' });
        }

        // Generate JWT token
        const token = generateToken(savedUser);

        res.status(201).json({ message: 'User registered successfully', token });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};

// User Sign-in Controller
exports.signinUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { username, password } = req.body;

    try {
        // Find user by username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Check if the password matches (not secure without hashing)
        if (user.password !== password) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        // Find user type (either worker or client)
        const worker = await Worker.findOne({ userId: user._id });
        const client = await Client.findOne({ userId: user._id });

        let userType = '';
        if (worker) {
            userType = 'worker';
        } else if (client) {
            userType = 'client';
        } else {
            return res.status(400).json({ message: 'User type not recognized' });
        }

        // Generate JWT token
        const token = generateToken(user);

        // Respond with the token and user type
        res.status(200).json({
            message: 'User signed in successfully',
            token,
            userType,
            redirectUrl: userType === 'worker' ? '(worker-tabs)/home' : '(client-tabs)/home'
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server error' });
    }
};
