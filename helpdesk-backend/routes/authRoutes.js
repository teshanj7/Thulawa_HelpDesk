const express = require('express');
const router = express.Router();

const { adminRegister, registerStudent, loginUser} = require('../controllers/authController');

// Admin create account
router.post('/createAdmin', adminRegister);

// Student registering
router.post('/registerStudent',registerStudent);

// Login a user
router.post('/login',loginUser);


module.exports = router;