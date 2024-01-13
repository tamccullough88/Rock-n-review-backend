const router = require('express').Router()
const { getAllUsers, getUserById, createUser, deleteUser } = require('../controllers/user')


router.get('/all', getAllUsers)
router.get('/:id', getUserById)
router.post('/register', createUser)
router.delete('/:id', deleteUser)


module.exports = router