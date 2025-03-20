const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const authRoutes = require("./routes/auth");
const incidentRoutes = require("./routes/incidents");
const searchRoutes = require("./routes/search");
require("dotenv").config();

const app = express();

const pool = new Pool({
  user: process.env.DB_USER || "shazeeda",
  host: process.env.DB_HOST || "localhost",
  database: process.env.DB_NAME || "safety_app",
  password: process.env.DB_PASSWORD || "1234",
  port: process.env.DB_PORT || 5432,
});


app.use(
  cors({
    origin: "http://localhost:3002",
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

app.use(express.json()); 
app.options("*", cors()); 


app.use("/auth", authRoutes);
app.use("/incidents", incidentRoutes);
app.use("/search", searchRoutes);


app.get("/", (req, res) => {
  res.send("🚀 Server is running locally!");
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));