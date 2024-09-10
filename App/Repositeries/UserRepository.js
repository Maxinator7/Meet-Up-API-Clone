const User = require("../Models/User");
const userCreateValidator = require("../Validators/UserCreateValidator");
const userUpdateValidator = require("../Validators/UserUpdateValidator");
const redisClient = require("../redisClient");

class UserRepository {
  async createUser(userData) {
    const { error } = userCreateValidator(userData);
    if (error) {
      throw new Error(error.details[0].message);
    }

    const user = new User(userData);
    return await user.save();
  }

  async updateUser(userId, updateData) {
    const { error } = userUpdateValidator(updateData);
    if (error) {
      throw new Error(error.details[0].message);
    }
    return await User.findByIdAndUpdate(userId, updateData, { new: true });
  }

  async findUserByEmail(email) {
    return await User.findOne({ email });
  }

  async findUserById(userId) {
    return await User.findById(userId);
  }

  async deleteUser(userId) {
    return await User.findByIdAndDelete(userId);
  }

  async getAllUsers() {
    let users = await redisClient.get("users");

    if (users) {
      // Parse and return cached data if exists
      return JSON.parse(users);
    }

    users = await User.find();

    if (!users) {
      throw new Error("Users not found.");
    }

    // Store the result in Redis and set an expiration time (e.g., 1 hour)
    await redisClient.set("users", JSON.stringify(users), {
      EX: 3600, // 1 hour in seconds
    });

    return users;
  }
}

module.exports = new UserRepository();
