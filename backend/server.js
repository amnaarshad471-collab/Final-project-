// server.js - main entry point for SkillBridge API
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// middleware setup
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(express.json());

// simple request logger for debugging
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} ${req.path}`);
  next();
});

// import route files
const authRoutes = require("./routes/authRoutes");
const courseRoutes = require("./routes/courseRoutes");
const enrollRoutes = require("./routes/enrollRoutes");
const userRoutes = require("./routes/userRoutes");

// register routes
app.use("/api/auth", authRoutes);
app.use("/api/courses", courseRoutes);
app.use("/api/enrollments", enrollRoutes);
app.use("/api/users", userRoutes);

// root endpoint - just to check if server is running
app.get("/", (req, res) => {
  res.json({ message: "SkillBridge API is running", status: "ok" });
});

// handle 404
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// global error handler
app.use((err, req, res, next) => {
  console.error("Server Error:", err.message);
  res.status(500).json({ success: false, message: "Internal server error" });
});

// connect to mongodb and start server
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

if (!MONGO_URI) {
  console.error("ERROR: MONGO_URI not found in .env file!");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI, { serverSelectionTimeoutMS: 5000 })
  .then(() => {
    console.log("MongoDB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API URL: http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection failed:", err.message);
    console.error("Make sure MongoDB is running or check your MONGO_URI");
    process.exit(1);
  });
