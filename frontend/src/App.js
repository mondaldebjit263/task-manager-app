import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "http://localhost:5000/api/tasks";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [filter, setFilter] = useState("all");
  const [editId, setEditId] = useState(null);

  const loadTasks = () => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setTasks(data));
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const addOrUpdateTask = async () => {
    if (!title) return;

    if (editId) {
      await fetch(`${API_URL}/${editId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
    } else {
      await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });
    }

    setTitle("");
    setDescription("");
    setEditId(null);
    loadTasks();
  };

  const toggleComplete = async (task) => {
    await fetch(`${API_URL}/${task.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        status: task.status === "completed" ? "pending" : "completed",
      }),
    });
    loadTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    loadTasks();
  };

  const startEdit = (task) => {
    setEditId(task.id);
    setTitle(task.title);
    setDescription(task.description || "");
  };

  const filteredTasks = tasks.filter((t) => {
    if (filter === "pending") return t.status === "pending";
    if (filter === "completed") return t.status === "completed";
    return true;
  });

  return (
    <div className="container">
      <h1>Task Manager</h1>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <button onClick={addOrUpdateTask}>
        {editId ? "Update Task" : "Add Task"}
      </button>

      <div className="filters">
        <button onClick={() => setFilter("all")}>All</button>
        <button onClick={() => setFilter("pending")}>Pending</button>
        <button onClick={() => setFilter("completed")}>Completed</button>
      </div>

      <ul>
        {filteredTasks.length === 0 && <p>No tasks</p>}

        {filteredTasks.map((task) => (
          <li key={task.id}>
            <input
              className="checkbox"
              type="checkbox"
              checked={task.status === "completed"}
              onChange={() => toggleComplete(task)}
            />

            <span
              className={task.status === "completed" ? "completed" : ""}
            >
              {task.title}
            </span>

            <button
              className="edit-btn"
              onClick={() => startEdit(task)}
            >
              Edit
            </button>

            <button onClick={() => deleteTask(task.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
