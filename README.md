# Task Manager – Full Stack Application

A full-stack Task Management application built using **React**, **Node.js**, **Express**, **PostgreSQL**, and **Socket.io**.  
This project supports real-time task updates using WebSockets.

---

## 🚀 Features

- Create, update, delete tasks
- Mark tasks as **pending / in-progress / completed**
- Filter tasks by status
- Real-time updates using **Socket.io**
- REST API with proper status codes
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
└── README.md

---

## 🗄️ Database Schema (PostgreSQL)

sql
CREATE TABLE tasks (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT,
  status VARCHAR(20) CHECK (status IN ('pending', 'in-progress', 'completed')) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

🔌 API Endpoints
Method	Endpoint	Description
POST	/api/tasks	Create task
GET	/api/tasks	Get all tasks
GET	/api/tasks?status=pending	Filter tasks
PATCH	/api/tasks/:id	Update task
DELETE	/api/tasks/:id	Delete task

🔄 Real-Time Updates

Socket.io events:

taskCreated

taskUpdated

taskDeleted

▶️ How to Run Locally
Backend
cd backend
npm install
npm run dev

Frontend
cd frontend
npm install
npm start

Backend runs on port 5000
Frontend runs on port 3000


📸 Screenshots
<img width="1909" height="1020" alt="image" src="https://github.com/user-attachments/assets/cf1332ce-3996-4b27-8286-6bc90a682f0a" />
<img width="1912" height="577" alt="image" src="https://github.com/user-attachments/assets/fc34456a-8a80-413f-a67d-d90b1f0ba4df" />
<img width="1868" height="941" alt="image" src="https://github.com/user-attachments/assets/61bed28a-8b0f-4f88-a3b7-842ba464e15f" />


👨‍💻 Author

Debjit Mondal




