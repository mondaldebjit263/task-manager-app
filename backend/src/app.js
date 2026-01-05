const express = require("express");
const cors = require("cors");
const taskRoutes = require("./routes/taskRoutes");
const pool = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", taskRoutes);

app.get("/", (req, res) => {
  res.send("Server is running");
});

app.get("/db-test", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ dbTime: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: "DB not connected" });
  }
});

module.exports = app;
