const express = require("express");
const app = express();
const connectDB = require("./connection");
const user = require("./Routes/User");
const authMiddleware = require("./Middlewares/auth");
require("dotenv").config();

// Middleware to parse JSON bodies
app.use(express.json());
app.use("/meetup/api/", user);

// Protected Route Example
app.get("/api/protected", authMiddleware, (req, res) => {
  res.json({ message: "This is a protected route", user: req.user });
});

const startServer = () => {
  const port = process.env.PORT || 3000;

  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
};

connectDB()
  .then(startServer)
  .catch((err) => {
    console.error("Failed to connect to the database", err);
    process.exit(1); // Exit the process with failure
  });
