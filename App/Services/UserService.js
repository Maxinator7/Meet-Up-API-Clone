const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userRepository = require("../Repositeries/UserRepository");
class userService {
  async createUser(userData) {
    userData.password = await bcrypt.hash(userData.password, 10);
    return await userRepository.createUser(userData);
  }
  async updateUser(userId, updateData) {
    return await userRepository.updateUser(userId, updateData);
  }

  async loginUser(email, password) {
    const user = await userRepository.findUserByEmail(email);

    if (!user) throw new Error("User not found");

    const isMatch = bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    return { user, token };
  }

  logoutUser(req) {
    // Invalidate the token on the client side
    return `Logged out successfully ${req}`;
  }

  async getUserDetails(userId) {
    return await userRepository.findUserById(userId);
  }

  async getAllUsers() {
    return await userRepository.getAllUsers();
  }
}

module.exports = new userService();
