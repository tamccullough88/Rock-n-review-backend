// routes/user.js
const express = require('express');
const userController = require('../controllers/user');

const router = express.Router();

router.get('/', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/register', userController.createUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
