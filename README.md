# Task-Manager-API-with-Authentication-
- This project is a task management web application that allows users to create, view, update, and delete tasks. It uses Express.js for the backend, MongoDB for the database, and JWT for authentication. The frontend is not included in this project.
- This is a simple TODO app with the backend created using Node.js and Express, and MongoDB as the database.

# Installation
1. Clone the repository

2. Install the dependencies using npm install

3. Create a .env file and add the following variables:

```makefile
MONGO_URL=<your-mongo-db-url>
JWT_SECRET=<your-jwt-secret>
PORT=<port-web-server>
```
4. Start the server using ` npm start`

# Endpoints
## Tasks
- GET /tasks - get all tasks
- POST /tasks - create a new task
- GET /tasks/:id - get a task by id
- PATCH /tasks/:id - update a task by id
- DELETE /tasks/:id - delete a task by id
- POST /tasks/complete/:id - mark a task as completed
- GET /tasks/missing - get all tasks with a deadline in the past
## Authentication
- POST /auth/signup - create a new user account
- POST /auth/login - login and get a JWT token
- GET /auth/logout - logout and delete the JWT token
