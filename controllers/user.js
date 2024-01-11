const express = require('express');
const User = require('../models/users');

// Show all users
async function getAllUsers(req, res) {
    try {
        const user = await User.find();
        res.json(user);
    } catch (error) {
        console.log('error fetching all users', error);
        res.status(500).json({ message: 'error getting all users' });
    }
}

// Show user by ID
async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        console.log('error fetching user', error);
        res.status(500).json({ message: 'error getting user' });
    }
}

// Create user
async function createUser(req, res) {
    const { username, password } = req.body;

    try {
        const newUser = new User({ username, password });
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
        const user = await User.findByIdAndDelete(id);
        res.json(user);
    } catch (error) {
        console.log('error deleting user', error);
        res.status(500).json({ message: 'error deleting user' });
    }
}

module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
};
