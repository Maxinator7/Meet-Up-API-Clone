const Group = require("../Models/Group");
const groupCreateValidator = require("../Validators/GroupCreateValidator");
const groupUpdateValidator = require("../Validators/GroupUpdateValidator");

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
}

module.exports = new GroupRepository();
