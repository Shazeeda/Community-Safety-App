const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER || "shazeeda", 
  host: process.env.DB_HOST || "localhost", 
  database: process.env.DB_NAME || "safety_app", 
  password: process.env.DB_PASSWORD || "1234", 
  port: process.env.DB_PORT || 5432, 
});

pool.connect()
  .then(() => console.log("✅ Connected to PostgreSQL Database"))
  .catch((err) => console.error("Database Connection Error:", err.message));

module.exports = pool;
