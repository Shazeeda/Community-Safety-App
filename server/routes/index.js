const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const aiChatRoute = require("./routes/aiChat");
app.use("/api/ai-chat", aiChatRoute);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
