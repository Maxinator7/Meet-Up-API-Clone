const Group = require("../Models/Group");
const groupCreateValidator = require("../Validators/GroupCreateValidator");
const groupUpdateValidator = require("../Validators/GroupUpdateValidator");
const redisClient = require("../redisClient");

class GroupRepository {
  async createGroup(groupData) {
    const { error } = groupCreateValidator(groupData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    const group = new Group(groupData);
    return await group.save();
  }

  async updateGroup(groupId, groupData) {
    const { error } = groupUpdateValidator(groupData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return await Group.findByIdAndUpdate(groupId, groupData);
  }

  async deleteGroup(groupId) {
    return await Group.findByIdAndDelete(groupId);
  }

  async getGroupDetails(groupId) {
    return await Group.findById(groupId);
  }

  async getAllGroups() {
    let groups = await redisClient.get("groups");

    if (groups) {
      return groups;
    }

    groups = await Group.find();

    if (!groups) {
      throw new Error("Groups not found.");
    }

    // Store the result in Redis and set an expiration time (e.g., 1 hour)
    await redisClient.set("groups", JSON.stringify(groups), {
      EX: 3600, // 1 hour in seconds
    });

    return groups;
  }
}

module.exports = new GroupRepository();
