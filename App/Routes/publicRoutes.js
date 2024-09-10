const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const eventController = require("../Controllers/EventController");
const groupController = require("../Controllers/GroupController");

router.get("/", (req, res) => {
  res.json({ status: true });
});

router.get("/user/", userController.getAllUsers);

router.get("/event/", eventController.getAllEvents);

router.get("/group/", groupController.getAllGroups);

router.post("/user", userController.createUser);
router.post("/user/login", userController.loginUser);

module.exports = router;
