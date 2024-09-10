const express = require("express");
const router = express.Router();
const userController = require("../Controllers/UserController");
const EventController = require("../Controllers/EventController");
const GroupsController = require("../Controllers/GroupController");

router.put("/user/:id", userController.updateUser);
router.post("/user/logout", userController.logoutUser);
router.get("/user/:id", userController.getUserDetails);

router.post("/event/", EventController.createEvent);
router.put("/event/:id", EventController.updateEvent);
router.delete("/event/:id", EventController.deleteEvent);
router.get("/event/:id", EventController.getEventDetails);

router.post("/group/", GroupsController.createGroup);
router.put("/group/:id", GroupsController.UpdateGroup);
router.delete("/group/:id", GroupsController.deleteGroup);
router.get("/group/:id", GroupsController.getGroupDetails);

module.exports = router;
