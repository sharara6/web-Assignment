# Task Management API

This project is a RESTful API for a Task Management System that supports CRUD operations for managing tasks and users. It utilizes Express.js and Sequelize ORM with PostgreSQL, implementing a one-to-many relationship between Users and Tasks.

## Features

- User management (create, read, update, delete)
- Task management (create, read, update, delete)
- One-to-many relationship between Users and Tasks
- Authentication middleware for secure routes

## Technologies Used

- Node.js
- Express.js
- Sequelize ORM
- PostgreSQL

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd task-management-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up the database:**
   - Create a PostgreSQL database for the application.
   - Update the `.env` file with your database connection details.

4. **Run the application:**
   ```bash
   npm start
   ```

## API Endpoints

### Users

- `POST /api/users` - Create a new user
- `GET /api/users` - Retrieve all users
- `GET /api/users/:id` - Retrieve a user by ID
- `PUT /api/users/:id` - Update a user by ID
- `DELETE /api/users/:id` - Delete a user by ID

### Tasks

- `POST /api/tasks` - Create a new task
- `GET /api/tasks` - Retrieve all tasks
- `GET /api/tasks/:id` - Retrieve a task by ID
- `PUT /api/tasks/:id` - Update a task by ID
- `DELETE /api/tasks/:id` - Delete a task by ID

## License

This project is licensed under the MIT License.