const express = require('express');
const bcrypt = require('bcrypt');
const users = require('../models/users');
const User = require('../models/users');

const router = express.Router();

// Show all users
async function getAllUsers(req, res) {
    try {
        const user = await users.find();
        res.json(user);
    } catch (error) {
        console.log('Error fetching all users', error);
        res.status(500).json({ message: 'Error getting all users' });
    }
}

// Show user by ID
async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await users.findById(id);
        res.json(user);
    } catch (error) {
        console.log('Error fetching user', error);
        res.status(500).json({ message: 'Error getting user' });
    }
}

async function createUser(req, res) {
    const { username, password } = req.body;

    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log('Received registration request:', { username, hashedPassword });

        const newUser = new User({ username, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}


// Delete user by ID
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const user = await users.findByIdAndDelete(id);
        res.json(user);
    } catch (error) {
        console.log('Error deleting user', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}

router.get('/', getAllUsers);
router.get('/:id', getUserById);
router.post('/register', createUser);
router.delete('/:id', deleteUser);

module.exports = router;
