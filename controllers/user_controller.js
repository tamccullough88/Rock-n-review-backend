const users = require('../models/users')


//show all users
async function getAllUsers(req, res) {
    try {
        const user = await users.find()
        res.json(user)
    } catch (error) {
        console.log('error fetching all users', error)
        res.status(500).json({ message: 'error getting all users' })
    }
}

//show user
async function getUserById(req, res) {
    try {
        const { id } = req.params
        const user = await users.findById(id)
        res.json(user)
    } catch (error) {
        console.log('error fetching all users', error)
        res.status(500).json({ message: 'error getting user' })
    }
}

async function createUser(req, res) {
    try {

        await new users({ ...req.body }).save()
        res.status(201).json({ message: 'user created' })
    } catch (error) {
        console.log('error fetching all users', error)
        res.status(500).json({ message: 'error creating user' })

    }
}

async function deleteUser(req, res) {
    try {
        const { id } = req.params
        const user = await users.findByIdAndDelete(id)
        res.json(user)
    } catch (error) {
        console.log('error deleting user', error)
        res.status(500).json({ message: 'error  deleting user' })
    }
}



module.exports = {
    getAllUsers,
    getUserById,
    createUser,
    deleteUser
}