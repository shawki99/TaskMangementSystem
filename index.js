const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const userRoutes = require("./src/routes/userRoutes");
const taskRoutes = require("./src/routes/taskRoutes");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MongoDB
mongoose
  .connect(process.env.CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));
console.log(process.env.CONNECTION_STRING);

// Middleware
app.use(bodyParser.json());

// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
