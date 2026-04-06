const User = require("../models/User");

// @desc    Get all users (admin only)
// @route   GET /api/users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password").sort({ createdAt: -1 });
    res.json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch users" });
  }
};

// @desc    Delete a user (admin only)
// @route   DELETE /api/users/:id
const removeUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // dont allow deleting admin accounts
    if (user.role === "admin") {
      return res.status(400).json({ success: false, message: "Cannot delete admin accounts" });
    }

    await User.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete user" });
  }
};

// @desc    Get platform analytics (admin only)
// @route   GET /api/users/analytics
const getAnalytics = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const students = await User.countDocuments({ role: "student" });
    const instructors = await User.countDocuments({ role: "instructor" });

    res.json({
      success: true,
      data: { totalUsers, students, instructors },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch analytics" });
  }
};

module.exports = { getAllUsers, removeUser, getAnalytics };
