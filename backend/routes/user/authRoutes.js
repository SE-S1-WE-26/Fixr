const express = require('express');
const authController = require('../../controllers/user/authController.js');

const router = express.Router();

// User signup route (for both worker and client)
router.post('/signup', authController.signupUser);

// User signin route
router.post('/signin', authController.signinUser);

module.exports = router;
