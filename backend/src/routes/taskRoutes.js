const express = require("express");
const pool = require("../db");

const router = express.Router();

/* =========================
   CREATE TASK
========================= */
router.post("/tasks", async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: "Title is required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO tasks (title, description) VALUES ($1, $2) RETURNING *",
      [title, description]
    );

    const io = req.app.get("io");
    io.emit("taskCreated", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to create task" });
  }
});

/* =========================
   GET ALL TASKS / FILTER
========================= */
router.get("/tasks", async (req, res) => {
  const { status } = req.query;

  try {
    let result;

    if (status) {
      result = await pool.query(
        "SELECT * FROM tasks WHERE status = $1 ORDER BY created_at DESC",
        [status]
      );
    } else {
      result = await pool.query(
        "SELECT * FROM tasks ORDER BY created_at DESC"
      );
    }

    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

/* =========================
   UPDATE TASK STATUS
========================= */
router.patch("/tasks/:id", async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const result = await pool.query(
      `
      UPDATE tasks
      SET
        title = COALESCE($1, title),
        description = COALESCE($2, description),
        status = COALESCE($3, status),
        updated_at = CURRENT_TIMESTAMP
      WHERE id = $4
      RETURNING *
      `,
      [title, description, status, id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const io = req.app.get("io");
    io.emit("taskUpdated", result.rows[0]);

    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: "Failed to update task" });
  }
});


/* =========================
   DELETE TASK
========================= */
router.delete("/tasks/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const result = await pool.query(
      "DELETE FROM tasks WHERE id = $1 RETURNING *",
      [id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Task not found" });
    }

    const io = req.app.get("io");
    io.emit("taskDeleted", Number(id));

    res.json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete task" });
  }
});

module.exports = router;
