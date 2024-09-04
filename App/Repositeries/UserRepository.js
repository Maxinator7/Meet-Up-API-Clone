const User = require("../Models/User");
const userCreateValidator = require("../Validators/UserCreateValidator");
const userUpdateValidator = require("../Validators/UserUpdateValidator");

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
}

module.exports = new UserRepository();
