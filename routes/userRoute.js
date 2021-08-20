const express = require('express')
const router = express.Router();

const { isLoggedin,isAdmin } = require('../middlewares/auth')
const controller = require('../controllers/userController')


router.post('/signup', controller.createUser);
router.post('/login', controller.login)
router.get('/all',isAdmin, controller.getAllUsers)
router.get('/:id',controller.getUserById)
router.put('/update/:id', isAdmin, controller.updateUser)
router.delete('/delete/:id', isAdmin, controller.deleteUser)


module.exports = router;