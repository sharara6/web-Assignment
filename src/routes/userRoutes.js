const express = require('express');
const router = express.Router();
const { authenticate, authorize } = require('../middleware/authMiddleware');
const { getProfile, updateProfile, updatePassword, updateUserRole } = require('../controllers/userController');

// Public route - accessible by everyone
router.get('/public', (req, res) => {
  res.json({ message: 'This is a public endpoint - anyone can access' });
});

// Protected route - authenticated users only
router.get('/protected', authenticate, (req, res) => {
  res.json({ message: 'This is a protected endpoint - authenticated users only' });
});

// Moderator route - only for moderators and admins
router.get('/moderator', authenticate, authorize('moderator', 'admin'), (req, res) => {
  res.json({ message: 'This is a moderator endpoint - only moderators and admins can access' });
});

// Admin route - only for admins
router.get('/admin', authenticate, authorize('admin'), (req, res) => {
  res.json({ message: 'This is an admin endpoint - only admins can access' });
});

// User profile routes
router.get('/profile', authenticate, getProfile);
router.put('/profile', authenticate, updateProfile);
router.put('/profile/password', authenticate, updatePassword);

// Admin route to update a user's role
router.put('/users/:id/role', authenticate, authorize('admin'), updateUserRole);

module.exports = router; 