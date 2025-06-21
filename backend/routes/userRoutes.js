const express = require('express');
const router = express.Router();
const User = require('../models/User');

router.post('/register', async (req, res) => {
    try {
        const { name, email, mobile ,password } = req.body;
        console.log("Received registration data:", req.body);
        const newUser = new User({ name, email,mobile , password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully!' });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// module.exports = router;
router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ error: 'Invalid email ' });
        }
        // For production, compare hashed passwords!
        if (user.password !== password) {
            return res.status(401).json({ error: 'Invalid password ' });
        }
        // You can generate a JWT token here for session management
        res.json({ message: 'Login successful', user: { name: user.name, email: user.email } });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
});

module.exports = router;