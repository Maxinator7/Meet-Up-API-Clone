const groupRepository = require("../Repositeries/GroupRepository");
const User = require("../Models/User");
const Event = require("../Models/Event");

class GroupService {
  async createGroup(groupData) {
    if (groupData.members || groupData.founders) {
      await this.validateUsers(groupData);
    }

    if (groupData.events) {
      await this.validateEvent(groupData);
    }
    return await groupRepository.createGroup(groupData);
  }
  async updateGroup(groupId, groupData) {
    await this.checkGroup(groupId);

    if (groupData.members || groupData.founders) {
      await this.validateUsers(groupData);
    }

    if (groupData.events) {
      await this.validateEvent(groupData);
    }
    return await groupRepository.updateGroup(groupId, groupData);
  }
  async deleteGroup(groupId) {
    await this.checkGroup(groupId);
    return await groupRepository.deleteGroup(groupId);
  }
  async getGroupDetails(groupId) {
    return await this.checkGroup(groupId);
  }

  async joinGroup(userId, groupId) {
    await this.checkGroup(groupId);
    // fetch group and add member to the group and retun reqd response
    console.log(userId, groupId);
    return { message: "Joinned Group" };
  }

  async exitGroup(groupId) {
    await this.checkGroup(groupId);
    // fetch group and remove member from the group and retun reqd response

    console.log(groupId);
    return { message: "Exited Group" };
  }

  async checkGroup(id) {
    const group = await groupRepository.getGroupDetails(id);

    if (!group) {
      throw new Error("Group do not exist.");
    }
    return group;
  }

  async getAllGroups() {
    const groups = await groupRepository.getAllGroups();

    if (!groups) {
      throw new Error("Groups not found.");
    }
    return groups;
  }

  async validateUsers(groupData) {
    if (groupData.members) {
      const existingMembers = await User.find(
        { _id: { $in: groupData.members } },
        { _id: 1 }
      );

      if (existingMembers.length !== groupData.members.length) {
        throw new Error("One or more members do not exist");
      }
    }

    if (groupData.founders) {
      const existingFounders = await User.find(
        { _id: { $in: groupData.founders } },
        { _id: 1 }
      );

      if (existingFounders.length !== groupData.founders.length) {
        throw new Error("One or more founderss do not exist");
      }
    }
  }

  async validateEvent(groupData) {
    if (groupData.events) {
      const existingEvents = await Event.find(
        { _id: { $in: groupData.events } },
        { _id: 1 }
      );

      if (existingEvents.length !== groupData.events.length) {
        throw new Error("One or more events do not exist");
      }
    }
  }
}

module.exports = new GroupService();
