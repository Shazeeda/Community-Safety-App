const express = require('express');
const cors = require('cors');
const http = require('http');
const { Pool } = require('pg');
const authRoutes = require('./routes/auth');
const incidentRoutes = require('./routes/incidents');
require('dotenv').config();
const searchRoutes = require('./routes/search');

const app = express();
const server = http.createServer(app);

app.use(cors());
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/incidents', incidentRoutes);
app.use('/search', searchRoutes);
app.use("/api/incidents", incidentRoutes);

app.get("/", (req, res) => {
  res.send("Server is running!");
});

const PORT = 3000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));