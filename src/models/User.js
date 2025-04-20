const fs = require('fs');
const path = require('path');
const bcrypt = require('bcryptjs');

// Path to users.json file
const usersFilePath = path.join(__dirname, '../../data/users.json');

// Ensure data directory exists
const dataDir = path.join(__dirname, '../../data');
if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir);
}

// Initialize users.json if it doesn't exist
if (!fs.existsSync(usersFilePath)) {
  fs.writeFileSync(usersFilePath, JSON.stringify([], null, 2));
}

class User {
  constructor(id, username, email, password, role = 'user') {
    this.id = id;
    this.username = username;
    this.email = email;
    this.password = password;
    this.role = role;
    this.createdAt = new Date().toISOString();
  }

  // Get all users
  static getAll() {
    try {
      const data = fs.readFileSync(usersFilePath, 'utf8');
      return JSON.parse(data);
    } catch (error) {
      console.error('Error reading users file:', error);
      return [];
    }
  }

  // Find user by ID
  static findById(id) {
    const users = this.getAll();
    return users.find(user => user.id === id);
  }

  // Find user by username
  static findByUsername(username) {
    const users = this.getAll();
    return users.find(user => user.username === username);
  }

  // Find user by email
  static findByEmail(email) {
    const users = this.getAll();
    return users.find(user => user.email === email);
  }

  // Save users to JSON file
  static saveAll(users) {
    try {
      fs.writeFileSync(usersFilePath, JSON.stringify(users, null, 2));
      return true;
    } catch (error) {
      console.error('Error writing users file:', error);
      return false;
    }
  }

  // Create a new user
  static async create(userData) {
    const users = this.getAll();
    
    // Check if user with same username or email already exists
    if (this.findByUsername(userData.username)) {
      throw new Error('Username already exists');
    }
    
    if (this.findByEmail(userData.email)) {
      throw new Error('Email already exists');
    }
    
    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(userData.email)) {
      throw new Error('Invalid email format');
    }
    
    // Validate password strength
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(userData.password)) {
      throw new Error('Password must be at least 8 characters long and include at least 1 letter, 1 number, and 1 special character');
    }
    
    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    
    // Generate new user ID
    const id = users.length > 0 ? Math.max(...users.map(user => user.id)) + 1 : 1;
    
    // Create new user
    const newUser = new User(
      id,
      userData.username,
      userData.email,
      hashedPassword,
      userData.role || 'user'
    );
    
    // Add to users array and save
    users.push(newUser);
    this.saveAll(users);
    
    // Return user without password
    const { password, ...userWithoutPassword } = newUser;
    return userWithoutPassword;
  }

  // Update user
  static update(id, updateData) {
    const users = this.getAll();
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return null;
    }
    
    // Update user fields
    Object.keys(updateData).forEach(key => {
      if (key !== 'id' && key !== 'password') {
        users[index][key] = updateData[key];
      }
    });
    
    this.saveAll(users);
    
    // Return updated user without password
    const { password, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
  }

  // Update user's password
  static async updatePassword(id, newPassword) {
    const users = this.getAll();
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return null;
    }
    
    // Validate password strength
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    if (!passwordRegex.test(newPassword)) {
      throw new Error('Password must be at least 8 characters long and include at least 1 letter, 1 number, and 1 special character');
    }
    
    // Hash new password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);
    
    users[index].password = hashedPassword;
    this.saveAll(users);
    
    return true;
  }

  // Update user's role
  static updateRole(id, newRole) {
    const validRoles = ['user', 'moderator', 'admin'];
    
    if (!validRoles.includes(newRole)) {
      throw new Error('Invalid role');
    }
    
    const users = this.getAll();
    const index = users.findIndex(user => user.id === id);
    
    if (index === -1) {
      return null;
    }
    
    users[index].role = newRole;
    this.saveAll(users);
    
    // Return updated user without password
    const { password, ...userWithoutPassword } = users[index];
    return userWithoutPassword;
  }

  // Compare password for login
  static async comparePassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }
}

module.exports = User; 