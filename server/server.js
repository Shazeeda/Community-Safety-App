const express = require("express");
const cors = require("cors");
const http = require("http");
const { Pool } = require("pg");
const authRoutes = require("./routes/auth");
const incidentRoutes = require("./routes/incidents");
const searchRoutes = require("./routes/search");
require("dotenv").config();

const app = express();
const server = http.createServer(app);

app.use(
  cors({
    origin: [
      "http://localhost:3002",
      "https://community-safety-app.onrender.com",
    ],
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/incidents", incidentRoutes);
app.use("/search", searchRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
