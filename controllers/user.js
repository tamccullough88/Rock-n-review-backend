const bcrypt = require('bcrypt');
const User = require('../models/users');
const { validationResult } = require('express-validator');

// Show all users
async function getAllUsers(req, res) {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        console.error('Error fetching all users', error);
        res.status(500).json({ message: 'Error getting all users' });
    }
}

// Show user by ID
async function getUserById(req, res) {
    try {
        const { _id } = req.params;
        const user = await User.findById(_id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (error) {
        console.error('Error fetching user', error);
        res.status(500).json({ message: 'Error getting user' });
    }
}

async function createUser(req, res) {
    const { name, userName, pass } = req.body;


    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(pass, 10);

        console.log('Received registration request:', { userName, hashedPassword });

        const newUser = new User({ name, userName, pass: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating user' });
    }
}

async function loginUser(req, res) {
    const { username, password } = req.body;

    // Log received username and password for debugging
    console.log('Received login request with username:', username, 'and password:', password);

    try {
        // Find the user by username
        const user = await User.findOne({ userName: username });

        if (!user) {
            console.log('User not found in the database');
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Compare the provided password with the hashed password in the database
        const passwordMatch = await bcrypt.compare(password, user.pass);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid username or password' });
        }

        // You can customize the response based on a successful login
        res.status(200).json({ message: 'Login successful', user: user });
    } catch (error) {
        console.error('Error during login', error);
        res.status(500).json({ message: 'Error during login' });
    }
}

// Delete user by ID
async function deleteUser(req, res) {
    try {
        const { _id } = req.params;
        const deletedUser = await User.findByIdAndDelete(_id);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(deletedUser);
    } catch (error) {
        console.error('Error deleting user', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser,
    loginUser,
};