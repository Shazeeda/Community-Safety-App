const express = require("express");
const pool = require('../db');
const router = express.Router();
const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET || "safety_app";
require("dotenv").config();

const authenticateUser = (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: "Unauthorized" });
  jwt.verify(token.split(" ")[1], JWT_SECRET, (err, decoded) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = decoded;
    next();
  });
};
router.post("/submit", authenticateUser, async (req, res) => {
  const { description, location } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO incidents (user_id, description, location) VALUES ($1, $2, $3) RETURNING *",
      [req.user.id, description, location]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put("/:id", authenticateUser, async (req, res) => {
  const { description, location } = req.body;
  try {
    const incident = await pool.query("SELECT * FROM incidents WHERE id = $1", [
      req.params.id,
    ]);
    if (
      incident.rows.length === 0 ||
      incident.rows[0].user_id !== req.user.id
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized to edit this incident" });
    }
    const result = await pool.query(
      "UPDATE incidents SET description = $1, location = $2 WHERE id = $3 RETURNING *",
      [description, location, req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM incidents ORDER BY created_at DESC"
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ error: "No incidents found" });
    }

    res.json(result.rows); 
  } catch (err) {
    console.error("Database query error:", err.message);
    res.status(500).json({ error: "Server error" });
  }
});

router.delete("/:id", authenticateUser, async (req, res) => {
  try {
    const incident = await pool.query("SELECT * FROM incidents WHERE id = $1", [
      req.params.id,
    ]);
    if (
      incident.rows.length === 0 ||
      incident.rows[0].user_id !== req.user.id
    ) {
      return res
        .status(403)
        .json({ error: "Unauthorized to delete this incident" });
    }
    await pool.query("DELETE FROM incidents WHERE id = $1", [req.params.id]);
    res.json({ message: "Incident deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
