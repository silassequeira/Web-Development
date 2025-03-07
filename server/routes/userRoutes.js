const User = require('../models/User.js');
const express = require('express');
const bcrypt = require('bcryptjs');

const router = express.Router();

// Signup Route 
router.post('/signup', async (req, res) => {
    const { username, password, fullname } = req.body;

    if (!username || !password || !fullname) {
        return res.status(400).json({
            success: false,
            error: 'All fields are required.'
        });
    }

    try {
        const newUser = await User.create(username, password, fullname);

        res.status(201).json({
            success: true,
            message: 'User signed up successfully!',
            user: {
                _id: newUser._id,
                username: newUser.username,
                fullName: newUser.fullName
            }
        });
    } catch (error) {
        console.error('Signup Error:', error);

        if (error.message === 'User already exists') {
            return res.status(409).json({
                success: false,
                error: 'User already exists.',
                statusCode: 409
            });
        }

        res.status(500).json({
            success: false,
            error: 'Error signing up user.',
            details: error.message
        });
    }
});

// Login Route
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Username and password are required.' });
    }

    const user = await User.findByUsername(username);

    if (!user || !(await bcrypt.compare(password, user.password))) {
        return res.status(401).json({ error: 'Invalid credentials.' });
    }

    res.status(200).json({
        message: 'Login successful!',
        user: {
            _id: user._id,
            username: user.username,
            fullName: user.fullName,
        }
    });
});

// Update Profile Route
router.put('/updateProfile', async (req, res) => {
    const { username, password, fullName } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required.' });
    }

    const updates = {};
    if (password) updates.password = password;
    if (fullName) updates.fullName = fullName;

    const result = await User.updateProfile(username, updates);

    if (!result) {
        return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({
        message: 'Profile updated successfully!',
        user: result
    });
});

// Delete Account Route
router.delete('/deleteAccount', async (req, res) => {
    const { username } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Username is required.' });
    }

    const result = await User.deleteAccount(username);

    if (result.deletedCount === 0) {
        return res.status(404).json({ error: 'User not found.' });
    }

    res.status(200).json({ message: 'Account deleted successfully!' });
});

// Route for handling saved paintings
router.post('/addInteraction', async (req, res) => {
    const { userId, paintingId, saved } = req.body;

    if (!userId || !paintingId || saved === undefined) {
        return res.status(400).json({ error: 'User ID, painting ID, and saved status are required.' });
    }

    const result = await User.addInteraction(userId, paintingId, saved);
    res.status(200).json({ message: 'Interaction added successfully!', result });
});

// Route for updating if painting is saved or not
router.put('/updateInteraction', async (req, res) => {
    const { userId, paintingId, saved } = req.body;

    if (!userId || !paintingId || saved === undefined) {
        return res.status(400).json({ error: 'User ID, painting ID, and saved status are required.' });
    }

    const result = await User.updateInteraction(userId, paintingId, saved);
    res.status(200).json({ message: 'Interaction updated successfully!', result });
});

// Route to handle favoriting/unfavoriting a painting
router.post('/addFavoriteInteraction', async (req, res) => {
    const { userId, paintingId, favorite } = req.body;

    if (!userId || !paintingId || favorite === undefined) {
        return res.status(400).json({ error: 'User ID, painting ID, and saved status are required.' });
    }

    const result = await User.addFavoriteInteraction(userId, paintingId, favorite);
    res.status(200).json({ message: 'Favorite Interaction updated successfully!', result });
});



module.exports = router;