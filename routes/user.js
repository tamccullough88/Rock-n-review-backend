const express = require('express');
const router = express.Router();
const User = require('../models/users');

// Show all users
router.get('/', async (req, res) => {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        console.log('Error fetching all users', error);
        res.status(500).json({ message: 'Error getting all users' });
    }
});

// Show user by ID
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        console.log('Error fetching user', error);
        res.status(500).json({ message: 'Error getting user' });
    }
});

// Create user
router.post('/register', async (req, res) => {
    const { name, userName, pass } = req.body;

    try {
        const newUser = new User({ name, userName, pass });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
});

// Delete user by ID
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await User.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (error) {
        console.log('Error deleting user', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

module.exports = router;
