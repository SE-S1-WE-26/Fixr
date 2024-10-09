const express = require('express');
const {
  getAllUsers,
  getUserById,
} = require('../../controllers/user/user.controller');

const router = express.Router();

// Route to get all clients
router.get('/', getAllUsers);

// Route to get a single client by ID
router.get('/:id', getUserById);

module.exports = router;
