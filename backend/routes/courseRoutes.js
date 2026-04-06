const router = require("express").Router();
const { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, addLesson } = require("../controllers/courseController");
const { protect, authorize } = require("../middleware/auth");

router.get("/", getAllCourses);
router.get("/:id", getCourseById);
router.post("/", protect, authorize("instructor", "admin"), createCourse);
router.put("/:id", protect, authorize("instructor", "admin"), updateCourse);
router.delete("/:id", protect, authorize("instructor", "admin"), deleteCourse);
router.post("/:id/lessons", protect, authorize("instructor"), addLesson);

module.exports = router;
