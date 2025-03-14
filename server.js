const express = require('express');
const cors = require('cors');
const { sequelize, connectMongoDB } = require('./config/database');
const authorRoutes = require('./routes/authorRoutes');
const postRoutes = require('./routes/postRoutes');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/authors', authorRoutes);
app.use('/api/posts', postRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error details:', err);
  res.status(500).json({ message: 'Something went wrong!', error: err.message });
});

// Database connections and server start
const PORT = process.env.PORT || 3000;

const startServer = async () => {
  try {
    console.log('Starting server...');
    console.log('Attempting to connect to PostgreSQL...');
    
    // Connect to PostgreSQL
    await sequelize.authenticate();
    console.log('PostgreSQL connected successfully');
    
    // Sync PostgreSQL models
    console.log('Syncing PostgreSQL models...');
    await sequelize.sync();
    console.log('PostgreSQL models synchronized');

    // Connect to MongoDB
    console.log('Attempting to connect to MongoDB...');
    await connectMongoDB();

    // Start server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
      console.log(`Try accessing: http://localhost:${PORT}/api/authors`);
    });
  } catch (error) {
    console.error('Server startup error:', error);
    console.error('Error details:', error.message);
    process.exit(1);
  }
};

startServer();
