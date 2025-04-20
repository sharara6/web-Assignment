const User = require('../models/User');
const { generateToken } = require('../utils/jwtUtils');

// Register a new user
const register = async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    
    // Check required fields
    if (!username || !email || !password) {
      return res.status(400).json({ message: 'Please provide username, email and password' });
    }
    
    // Create new user
    const newUser = await User.create({
      username,
      email,
      password,
      role: role || 'user' // Default role is 'user'
    });
    
    // Generate token
    const token = generateToken(newUser.id, newUser.role);
    
    res.status(201).json({
      message: 'User registered successfully',
      user: newUser,
      token
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Login user
const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Check required fields
    if (!username || !password) {
      return res.status(400).json({ message: 'Please provide username and password' });
    }
    
    // Find user by username
    const user = User.findByUsername(username);
    
    // Check if user exists
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Check if password is correct
    const isMatch = await User.comparePassword(password, user.password);
    
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
    
    // Generate token
    const token = generateToken(user.id, user.role);
    
    res.status(200).json({
      message: 'Login successful',
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role
      },
      token
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { register, login }; 