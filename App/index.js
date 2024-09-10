const express = require("express");
const app = express();
const connectDB = require("./connection");
const user = require("./Routes/User");
const publicRoutes = require("./Routes/publicRoutes");
const authMiddleware = require("./Middlewares/auth");
const roleAuth = require("./Middlewares/roleAuth");
require("dotenv").config();

// Middleware to parse JSON bodies
app.use(express.json());

app.use("/meetup/api/", publicRoutes); // public routes
app.use("/meetup/api/", authMiddleware, roleAuth("admin"), user);

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
