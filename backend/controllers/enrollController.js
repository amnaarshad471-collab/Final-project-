const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");

// @desc    Enroll in a course
// @route   POST /api/enrollments
const enrollInCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    // make sure course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // check if already enrolled
    const alreadyEnrolled = await Enrollment.findOne({
      student: req.user._id,
      course: courseId,
    });

    if (alreadyEnrolled) {
      return res.status(400).json({ success: false, message: "You are already enrolled in this course" });
    }

    const enrollment = await Enrollment.create({
      student: req.user._id,
      course: courseId,
    });

    res.status(201).json({ success: true, data: enrollment });
  } catch (error) {
    console.error("Enrollment error:", error.message);
    res.status(500).json({ success: false, message: "Enrollment failed" });
  }
};

// @desc    Get courses the current student is enrolled in
// @route   GET /api/enrollments/my-courses
const getMyEnrollments = async (req, res) => {
  try {
    const enrollments = await Enrollment.find({ student: req.user._id })
      .populate({
        path: "course",
        populate: { path: "instructor", select: "name" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, data: enrollments });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch enrollments" });
  }
};

// @desc    Update progress for an enrollment
// @route   PUT /api/enrollments/:id/progress
const updateProgress = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ success: false, message: "Enrollment not found" });
    }

    // make sure this enrollment belongs to the logged in student
    if (enrollment.student.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    enrollment.progress = req.body.progress;
    await enrollment.save();

    res.json({ success: true, data: enrollment });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update progress" });
  }
};

module.exports = { enrollInCourse, getMyEnrollments, updateProgress };
