const express = require('express');
const router = express.Router();
const { register, login } = require('../controllers/authController');
const { authLimiter } = require('../middleware/rateLimiterMiddleware');

// Register a new user
router.post('/register', authLimiter, register);

// Login user
router.post('/login', authLimiter, login);

module.exports = router; 