const bcrypt = require('bcrypt');
const User = require('../models/users');



// Show all users
async function getAllUsers(req, res) {
    try {
        const allUsers = await User.find();
        res.json(allUsers);
    } catch (error) {
        console.log('Error fetching all users', error);
        res.status(500).json({ message: 'Error getting all users' });
    }
};

// Show user by ID
async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.json(user);
    } catch (error) {
        console.log('Error fetching user', error);
        res.status(500).json({ message: 'Error getting user' });
    }
};

async function createUser(req, res) {
    const { userName, pass } = req.body;

    try {
        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(pass, 10);

        console.log('Received registration request:', { userName, hashedPassword });

        const newUser = new User({ userName, pass: hashedPassword });
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
        const deletedUser = await User.findByIdAndDelete(id);
        res.json(deletedUser);
    } catch (error) {
        console.log('Error deleting user', error);
        res.status(500).json({ message: 'Error deleting user' });
    }
}



module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
}
