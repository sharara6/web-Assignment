const User = require('../models/User');

// Get authenticated user's profile
const getProfile = (req, res) => {
  try {
    // req.user is set by authenticate middleware
    const { password, ...userWithoutPassword } = req.user;
    
    res.status(200).json({
      message: 'User profile retrieved successfully',
      user: userWithoutPassword
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update authenticated user's profile (email)
const updateProfile = async (req, res) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return res.status(400).json({ message: 'Email is required' });
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: 'Invalid email format' });
    }
    
    // Update user
    const updatedUser = User.update(req.user.id, { email });
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      message: 'Profile updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update authenticated user's password
const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }
    
    // Find user by ID (from authenticate middleware)
    const user = User.findById(req.user.id);
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    // Check if current password is correct
    const isMatch = await User.comparePassword(currentPassword, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Current password is incorrect' });
    }
    
    // Update password
    await User.updatePassword(req.user.id, newPassword);
    
    res.status(200).json({ message: 'Password updated successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Update user's role (admin only)
const updateUserRole = (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;
    
    if (!id || !role) {
      return res.status(400).json({ message: 'User ID and role are required' });
    }
    
    // Convert string ID to number
    const userId = parseInt(id, 10);
    
    // Update user's role
    const updatedUser = User.updateRole(userId, role);
    
    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }
    
    res.status(200).json({
      message: 'User role updated successfully',
      user: updatedUser
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getProfile,
  updateProfile,
  updatePassword,
  updateUserRole
}; 