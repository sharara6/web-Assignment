const { Sequelize } = require('sequelize');
const mongoose = require('mongoose');
require('dotenv').config();

// PostgreSQL Configuration
const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

// MongoDB Configuration
const connectMongoDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
    });
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    // Don't exit the process, just log the error
    console.log('Continuing without MongoDB connection...');
  }
};

module.exports = {
  sequelize,
  connectMongoDB,
}; 