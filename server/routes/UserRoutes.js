const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/User');
const jwt = require('jsonwebtoken');

router.use(cors({
//   origin: 'https://notion-bingo-widget.vercel.app',
  origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

router.post('/register', async (req, res) => {
  try {
    const {name, email, password } = req.body;

    const newUser = new User({ name, email, password });
    await newUser.save();
    
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', //max 1 hr login
    });

    res.json({
        token,
        name: name, // Send user name along with the token
    });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/signIn', async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', //max 1 hr login
        });

        res.json({
            token,
            name: user.name,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
  });


module.exports = router;
