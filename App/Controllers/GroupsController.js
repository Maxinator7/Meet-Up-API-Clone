const groupService = require("../Services/GroupService");

class GroupController {
  async createGroup(req, res) {
    try {
      const group = await groupService.createGroup(req.body);
      res.status(201).json(group);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async UpdateGroup(req, res) {
    try {
      const group = await groupService.updateGroup(req.params.id, req.body);
      res.status(200).json(group);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async deleteGroup(req, res) {
    try {
      await groupService.deleteGroup(req.params.id);
      res.status(200).json({
        message: "Group deleted successfully.",
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  async getGroupDetails(req, res) {
    try {
      const group = await groupService.getGroupDetails(req.params.id);
      res.status(200).json(group);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}

module.exports = new GroupController();
