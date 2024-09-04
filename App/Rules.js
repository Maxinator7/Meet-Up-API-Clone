const User = require("../App/Models/User"); // Import your User model

// Function to check if the email is unique
const emailUnique = async (email) => {
  const user = await User.findOne({ email });
  return !user; // Returns true if the email is not found (unique)
};

module.exports = emailUnique;
