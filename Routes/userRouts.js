
const express = require('express');
const router = express.Router();
const userController = require('../Controller/userController');
const jwt = require('../midleware/jwt');

router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);

router.use(jwt.authenticate);

router.get('/profile', userController.getUserProfile);
router.put('/profile', userController.updateUserProfile);

module.exports = router;