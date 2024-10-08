const express = require('express');
const { body } = require('express-validator');
const authController = require('../../controllers/user/authController.js');

const router = express.Router();

// User signup route (for both worker and client)
router.post(
    '/signup',
    [
        body('name').not().isEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('username').not().isEmpty().withMessage('Username is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        body('userType').isIn(['worker', 'client']).withMessage('User type must be either worker or client'),
    ],
    authController.signupUser
);

// User signin route
router.post(
    '/signin',
    [
        body('username').not().isEmpty().withMessage('Username is required'),
        body('password').not().isEmpty().withMessage('Password is required'),
    ],
    authController.signinUser
);

module.exports = router;
