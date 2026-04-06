const jwt = require("jsonwebtoken");
const User = require("../models/User");

// helper to generate jwt token
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc    Register a new user
// @route   POST /api/auth/register
const register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // check if email already taken
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "Email already registered" });
    }

    // create new user
    const user = await User.create({ name, email, password, role: role || "student" });

    // generate token and send response
    const token = generateToken(user._id);

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error("Register error:", error.message);
    res.status(500).json({ success: false, message: error.message || "Registration failed" });
  }
};

// @desc    Login user
// @route   POST /api/auth/login
const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    // find user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    // check password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const token = generateToken(user._id);

    res.json({
      success: true,
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token,
      },
    });
  } catch (error) {
    console.error("Login error:", error.message);
    res.status(500).json({ success: false, message: "Login failed" });
  }
};

// @desc    Get current logged in user
// @route   GET /api/auth/me
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select("-password");
    res.json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Could not fetch profile" });
  }
};

module.exports = { register, login, getProfile };
