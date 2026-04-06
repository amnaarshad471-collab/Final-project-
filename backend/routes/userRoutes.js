const router = require("express").Router();
const { getAllUsers, removeUser, getAnalytics } = require("../controllers/userController");
const { protect, authorize } = require("../middleware/auth");

router.get("/", protect, authorize("admin"), getAllUsers);
router.get("/analytics", protect, authorize("admin"), getAnalytics);
router.delete("/:id", protect, authorize("admin"), removeUser);

module.exports = router;
