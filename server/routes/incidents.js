const express = require("express");
const router = express.Router();
const pool = require("../db");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET || "safety_app";

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ error: "Unauthorized - No token provided" });
  }

  jwt.verify(token, JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: "Invalid token" });
    }
    req.user = decoded;
    next();
  });
};

router.post("/", authenticateUser, async (req, res) => {
  const { title, description, location, date } = req.body;

  if (!title || !description || !location || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const result = await pool.query(
      "INSERT INTO incidents (user_id, title, description, location, date) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [req.user.id, title, description, location, date]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    console.error("Error reporting incident:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM incidents ORDER BY id DESC");
    res.json(result.rows);
  } catch (err) {
    console.error("Database query error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/my-incidents", authenticateUser, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM incidents WHERE user_id = $1 ORDER BY id DESC",
      [req.user.id]
    );

    res.json(result.rows);
  } catch (err) {
    console.error("Database query error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.put("/:id", authenticateUser, async (req, res) => {
  const { title, description, location, date } = req.body;

  if (!title || !description || !location || !date) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const incident = await pool.query("SELECT * FROM incidents WHERE id = $1", [
      req.params.id,
    ]);

    if (incident.rows.length === 0) {
      return res.status(404).json({ error: "Incident not found" });
    }

    if (incident.rows[0].user_id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized to edit this incident" });
    }

    const result = await pool.query(
      "UPDATE incidents SET title = $1, description = $2, location = $3, date = $4 WHERE id = $5 RETURNING *",
      [title, description, location, date, req.params.id]
    );

    res.json(result.rows[0]);
  } catch (err) {
    console.error("Error updating incident:", err.message);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.delete("/:id", authenticateUser, async (req, res) => {
  const { id } = req.params;

  try {
    const incident = await pool.query("SELECT * FROM incidents WHERE id = $1", [
      id,
    ]);

    if (incident.rows.length === 0) {
      return res.status(404).json({ error: "Incident not found" });
    }

    if (incident.rows[0].user_id !== req.user.id) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this incident" });
    }

    await pool.query("DELETE FROM incidents WHERE id = $1", [id]);
    res.json({ message: "Incident deleted successfully" });
  } catch (error) {
    console.error("Error deleting incident:", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
