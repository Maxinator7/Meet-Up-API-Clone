const User = require("../Models/User");
const roleAuth = (role) => {
  return async (req, res, next) => {
    try {
      // Fetch the user from the database using ID from req.body
      const user = await User.findById(req.user.id); // Ensure that `id` is sent in the request body
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Add the user's role to the req object
      req.userRole = user.role;

      // Check if the user's role matches the required role(s)
      if (!role.includes(req.userRole)) {
        return res.status(403).json({ message: "Access denied" });
      }

      // Proceed to the next middleware
      next();
    } catch (error) {
      console.error("Error in roleAuth middleware:", error);
      return res.status(500).json({ message: "Server error" });
    }
  };
};

module.exports = roleAuth;
