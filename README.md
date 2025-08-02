Full-Stack Task Management Application
This is a complete full-stack web application for managing tasks, built with the MERN stack (MongoDB, Express, React, Node.js) and containerized with Docker for easy setup and deployment.

Features
User Authentication: Secure user registration and login using JSON Web Tokens (JWT).

Task CRUD: Full Create, Read, Update, and Delete functionality for tasks.

Document Uploads: Attach up to 3 PDF documents to each task.

Filtering & Sorting: Dynamically filter tasks by status or priority, and sort by creation date or due date.

Responsive UI: Modern user interface built with React and styled with Tailwind CSS.

Containerized: The entire application (frontend, backend) can be run with a single Docker command.

Tech Stack
Frontend: React, Redux Toolkit, React Router, Axios, Tailwind CSS

Backend: Node.js, Express, Mongoose

Database: MongoDB Atlas

Containerization: Docker & Docker Compose

Prerequisites
Before you begin, ensure you have the following installed on your system:

Node.js (v16 or later)

Docker

Setup and Installation
Follow these steps to get the application running locally.

1. Clone the Repository
git clone <your-repository-url>
cd <your-repository-folder>

2. Configure Backend Environment Variables
The backend server requires a .env file with credentials for MongoDB and JWT.

Navigate to the backend directory.

Create a new file named .env.

Add the following content to the file, replacing the placeholder values with your actual credentials.

# Server Port
PORT=5000

# MongoDB Connection URI (from MongoDB Atlas)
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.yovlicw.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

# JSON Web Token Secret
JWT_SECRET=your_super_secret_jwt_key

Note: You must get your own MONGO_URI from your MongoDB Atlas dashboard.

3. Install Dependencies
Install the necessary Node.js packages for both the frontend and backend.

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install

Running the Application with Docker
The easiest way to run the entire application is with Docker Compose. This will build and run the frontend and backend containers.

From the root directory of the project, run the following command:

docker-compose up --build

The frontend will be accessible at http://localhost.

The backend API will be running on http://localhost:5000.

To stop the application, press Ctrl+C in the terminal.

API Endpoints
The backend provides the following RESTful API endpoints:

User Routes (/api/users)
POST /register: Register a new user.

POST /login: Log in a user and get a JWT.

GET /me: Get the profile of the currently logged-in user (Protected).

Task Routes (/api/tasks)
POST /: Create a new task (Protected).

GET /: Get all tasks for the logged-in user (Protected).

PUT /:id: Update a specific task (Protected).

DELETE /:id: Delete a specific task (Protected).
