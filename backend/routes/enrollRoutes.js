const router = require("express").Router();
const { enrollInCourse, getMyEnrollments, updateProgress } = require("../controllers/enrollController");
const { protect, authorize } = require("../middleware/auth");

router.post("/", protect, authorize("student"), enrollInCourse);
router.get("/my-courses", protect, authorize("student"), getMyEnrollments);
router.put("/:id/progress", protect, authorize("student"), updateProgress);

module.exports = router;
