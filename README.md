# Task Manager – Full Stack Application

A full-stack Task Management application built using **React**, **Node.js**, **Express**, **PostgreSQL**, and **Socket.io**.  
This project supports real-time task updates using WebSockets.

---

## 🚀 Features

- Create, edit, and delete tasks
- Mark tasks as **pending / in-progress / completed**
- Filter tasks by status
- Real-time updates using **Socket.io**
- REST API with proper HTTP status codes
- Basic input validation and error handling
- Clean and responsive UI

---

## 🛠️ Tech Stack

### Frontend
- React
- Fetch API
- CSS

### Backend
- Node.js
- Express.js
- PostgreSQL
- Socket.io

---

## 📂 Project Structure

```text
task-manager-app/
│
├── backend/
│ ├── src/
│ │ ├── routes/
│ │ │ └── taskRoutes.js
│ │ ├── app.js
│ │ └── server.js
│ └── db.js
│
├── frontend/
│ └── src/
│ ├── App.js
│ ├── App.css
│ └── index.js
│
├── screenshots/
│ ├── Screenshot 2026-01-05 201430.png
│ ├── Screenshot 2026-01-05 201456.png
│ └── Screenshot 2026-01-05 201527.png
│
└── README.md
```
🗄️ Database Schema (PostgreSQL)
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status VARCHAR(20)
    CHECK (status IN ('pending', 'in-progress', 'completed'))
    DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
🔌 API Endpoints
Method	Endpoint	Description
POST	/api/tasks	Create a new task
GET	/api/tasks	Get all tasks
GET	/api/tasks?status=pending	Filter tasks by status
PATCH	/api/tasks/:id	Update a task
DELETE	/api/tasks/:id	Delete a task
🔄 Real-Time Updates

This application uses Socket.io for real-time updates.

Socket Events

taskCreated

taskUpdated

taskDeleted

Clients receive updates instantly without refreshing the page.

▶️ How to Run Locally
Backend Setupcd backend
npm install
npm run dev
Backend runs on http://localhost:5000

Frontend Setup
cd frontend
npm install
npm start
Frontend runs on http://localhost:3000
## 📸 Screenshots

### Task Manager Dashboard
![Dashboard](screenshots/Screenshot%202026-01-05%20201456.png)

### Task List View
![Tasks](screenshots/Screenshot%202026-01-05%20201430.png)

### Filters & Actions
![Filters](screenshots/Screenshot%202026-01-05%20201527.png)

👨‍💻 Author

Debjit Mondal

📌 This project was built as a full-stack assignment demonstrating REST APIs, database design, and real-time updates.

---


