const userService = require("../Services/UserService");
const validateRequest = require("../Decoraters/ValidateRequest");
const validateCreateUserRequest = require("../Validators/RequestValidators/createUserRequestValidator");
const groupService = require("../Services/GroupService");
const eventService = require("../Services/EventService");
class UserController {
  @validateRequest(validateCreateUserRequest)
  async createUser(req, res) {
    try {
      delete req.body.isAdult; // deleting age check from requst body
      const user = await userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async updateUser(req, res) {
    try {
      const user = await userService.updateUser(req.params.id, req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async loginUser(req, res) {
    try {
      const { email, password } = req.body;
      const { user, token } = await userService.loginUser(email, password);
      res.status(200).json({ user, token });
    } catch (error) {
      res.status(401).json({ error: error.message });
    }
  }

  logoutUser(req, res) {
    try {
      const message = userService.logoutUser(req);
      res.status(200).json({ message });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getUserDetails(req, res) {
    try {
      const user = await userService.getUserDetails(req.params.id);
      res.status(200).json(user);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }

  async joinGroup(req, res) {
    try {
      const group = await groupService.joinGroup(req.body);
      res.status(200).json({
        message: "Joined Group successfully.",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async exitGroup(req, res) {
    try {
      const group = await groupService.exitGroup(req.body);
      res.status(200).json({
        message: "Exited Group successfully.",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async attendEvent(req, res) {
    try {
      const event = await eventService.attendEvent(req.body);
      res.status(200).json(event);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getAllUsers(req, res) {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}

module.exports = new UserController();
