# Task Management REST API

A Task Management REST API backend service built with Node.js, Express, MongoDB, and JWT Authentication for technical assignment submission.

## Tech Stack
- **Backend Framework**: Node.js & Express.js
- **Database**: MongoDB (via Mongoose ODM)
- **Auth**: JWT (JSON Web Tokens) + bcryptjs
- **Validation**: express-validator

---

## Folder Structure

```
task manager assignment backend developer/
├── developer/
│   └── src/
│       ├── config/         # DB connection setup
│       ├── controllers/    # Request handlers (auth & tasks)
│       ├── middleware/     # Auth token check, validation, error handler
│       ├── models/         # Mongoose User & Task schemas
│       ├── routes/         # Express router endpoints
│       ├── utils/          # JWT helper
│       ├── validators/     # Input validation rules
│       └── app.js          # Express app configuration
├── .env.example            # Environment variables template
├── .env                    # Local environment variables
├── package.json
├── postman_collection.json # Exported Postman collection for API testing
├── README.md
├── render.yaml             # Render live deployment config
└── server.js               # Entry point
```

---

## Local Setup & Running Instructions

### 1. Clone & Install
```bash
git clone <repository-url>
cd "task manager assignment backend developer"
npm install
```

### 2. Configure Environment Variables
Create a `.env` file in the project root:
```env
PORT=5000
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/taskmanager?retryWrites=true&w=majority
JWT_SECRET=taskmanager_assignment_jwt_secret_key_2026
JWT_EXPIRE=30d
NODE_ENV=development
```

### 3. Run Server
- **Development mode**:
  ```bash
  npm run dev
  ```
- **Production mode**:
  ```bash
  npm start
  ```

Server will run on `http://localhost:5000`.

---

## API Documentation

### Auth Endpoints
- `POST /api/auth/register`: Create a new user account (`name`, `email`, `password`).
- `POST /api/auth/login`: Authenticate existing user & receive JWT token.
- `GET /api/auth/profile`: Get logged-in user profile (Requires `Bearer <token>`).

### Task Endpoints (All require `Bearer <token>`)
- `POST /api/tasks`: Create task (`title`, `description`, `status`, `priority`, `dueDate`).
- `GET /api/tasks`: Get user tasks.
  - Supports query parameters:
    - `status`: `Pending` | `In Progress` | `Completed`
    - `priority`: `Low` | `Medium` | `High`
    - `search`: term matching title/description
    - `page` & `limit`: pagination (e.g. `?page=1&limit=10`)
- `GET /api/tasks/:id`: Get single task details.
- `PUT /api/tasks/:id`: Update task attributes.
- `DELETE /api/tasks/:id`: Delete a task.

---

## Postman Testing
1. Import `postman_collection.json` into Postman.
2. Run **Register** or **Login** to store `authToken` automatically.
3. Call **Task** APIs.
