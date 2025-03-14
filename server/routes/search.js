const express = require('express');
const pool = require('../db'); 
const router = express.Router();


router.get('/', async (req, res) => {
    try {
        const { query } = req.query;

        if (!query) {
            return res.status(400).json({ error: "Search query is required" });
        }

        const result = await pool.query(
            `SELECT * FROM incidents WHERE 
             LOWER(description) LIKE LOWER($1) OR 
             LOWER(location) LIKE LOWER($1) 
             ORDER BY created_at DESC`,
            [`%${query}%`]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ error: "No matching incidents found" });
        }

        res.json(result.rows);
    } catch (err) {
        console.error("Search error:", err.message);
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router;
