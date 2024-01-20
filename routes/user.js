const express = require('express');
const router = express.Router();
const { getAllUsers, getUserById, createUser, deleteUser, loginUser } = require('../controllers/user')


router.get('/all', getAllUsers);
router.get('/:id', getUserById);
router.post('/register', createUser);
router.post('/login', loginUser);
router.delete('/:id', deleteUser);


module.exports = router