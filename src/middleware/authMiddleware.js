const { verifyToken } = require('../utils/jwtUtils');
const User = require('../models/User');

// Middleware to authenticate JWT token
const authenticate = (req, res, next) => {
  // Get token from header
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Authentication required. No token provided' });
  }
  
  // Get token without 'Bearer '
  const token = authHeader.split(' ')[1];
  
  // Verify token
  const decoded = verifyToken(token);
  
  if (!decoded) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
  
  // Find user by ID
  const user = User.findById(decoded.id);
  
  if (!user) {
    return res.status(401).json({ message: 'User not found' });
  }
  
  // Add user to request object
  req.user = user;
  next();
};

// Middleware to authorize based on roles
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ message: 'Authentication required' });
    }
    
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Not authorized to access this resource' });
    }
    
    next();
  };
};

module.exports = { authenticate, authorize }; 