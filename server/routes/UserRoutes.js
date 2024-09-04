const express = require('express');
const router = express.Router();
const cors = require('cors');
const User = require('../models/User');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const { OAuth2Client } = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); // Replace with your Google Client ID

router.use(cors({
  origin: 'https://notion-bingo-widget.vercel.app',
//   origin: '*',
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
  credentials: true,
  optionsSuccessStatus: 204,
}));

router.post('/register', async (req, res) => {
  try {
    const {name, email, password } = req.body;

    let user = await User.findOne({ email });

    if (!user) {
        // create a new user if not found
        user = new User({
            name,
            email,
            password,
        });

        await user.save();
    } else {
        return res.status(401).json({ message: 'Account exists. Please sign in.' });
    }

    
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h', //max 1 hr login
    });

    res.json({
        token,
        name: name,
        userId: user._id,
    });

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

router.post('/signIn', async (req, res) => {
    const { email, password } = req.body;

    try {
        // find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email, please create an account' });
        }

        // check for google account
        //handles when user tries to sign in as email vs with Google
        if (user.googleId) {
            return res.status(401).json({ message: 'Account exists. Please sign in through Google' });
        }

        // check password
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Password incorrect' });
        }

        // create JWT token
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h', //max 1 hr login
        });

        res.json({
            token,
            name: user.name,
            userId: user._id,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
});

router.post('/googleSignIn', async (req, res) => {
    const { token } = req.body;

    if (!token) {
        return res.status(400).json({ message: 'Token is required' });
    }

    try {
        // verify the token
        const ticket = await client.verifyIdToken({
            idToken: token,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        // vet the user info from the token
        const payload = ticket.getPayload();
        const { email, name = '', sub: googleId } = payload;

        // check if the user exists
        let user = await User.findOne({ email });

        if (!user) {
            // create a new user if not found
            user = new User({
                name,
                email,
                googleId,
            });

            await user.save();
        }

        // Create your own JWT token (if needed)
        const authToken = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({
            token: authToken,
            name: user.name,
            userId: user._id,
        });
    } catch (error) {
        console.error('Error signing in with Google:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});



module.exports = router;
