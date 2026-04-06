const jwt = require("jsonwebtoken");
const User = require("../models/User");

// protect routes - checks if user is logged in
const protect = async (req, res, next) => {
  try {
    let token;

    // check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Not authorized - no token provided",
      });
    }

    // verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // find user and attach to request
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: "User not found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth middleware error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Not authorized - invalid token",
    });
  }
};

// restrict access to specific roles
const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Access denied. Required role: ${allowedRoles.join(" or ")}`,
      });
    }
    next();
  };
};

module.exports = { protect, authorize };
