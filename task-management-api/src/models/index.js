// filepath: /task-management-api/task-management-api/src/models/index.js
const { Sequelize } = require('sequelize');
const User = require('./User');
const Task = require('./Task');
const sequelize = require('../config/database');

// Initialize models
const models = {
    User: User(sequelize, Sequelize),
    Task: Task(sequelize, Sequelize),
};

// Set up associations
models.User.hasMany(models.Task, { foreignKey: 'userId', as: 'tasks' });
models.Task.belongsTo(models.User, { foreignKey: 'userId', as: 'user' });

module.exports = { sequelize, models };