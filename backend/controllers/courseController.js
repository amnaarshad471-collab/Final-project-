const Course = require("../models/Course");

// @desc    Get all courses (with optional search/filter)
// @route   GET /api/courses
const getAllCourses = async (req, res) => {
  try {
    let query = {};

    // search by title if provided
    if (req.query.search) {
      query.title = { $regex: req.query.search, $options: "i" };
    }

    // filter by category
    if (req.query.category) {
      query.category = req.query.category;
    }

    const courses = await Course.find(query)
      .populate("instructor", "name email")
      .sort({ createdAt: -1 });

    res.json({ success: true, count: courses.length, data: courses });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch courses" });
  }
};

// @desc    Get single course by ID
// @route   GET /api/courses/:id
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id).populate("instructor", "name email");

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch course" });
  }
};

// @desc    Create a new course
// @route   POST /api/courses
const createCourse = async (req, res) => {
  try {
    // attach the logged in user as instructor
    req.body.instructor = req.user._id;

    const course = await Course.create(req.body);
    const populated = await course.populate("instructor", "name email");

    res.status(201).json({ success: true, data: populated });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to create course" });
  }
};

// @desc    Update a course
// @route   PUT /api/courses/:id
const updateCourse = async (req, res) => {
  try {
    let course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // only the instructor who created it or admin can update
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to update this course" });
    }

    course = await Course.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate("instructor", "name email");

    res.json({ success: true, data: course });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to update course" });
  }
};

// @desc    Delete a course
// @route   DELETE /api/courses/:id
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    // check ownership
    if (course.instructor.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      return res.status(403).json({ success: false, message: "Not authorized to delete this course" });
    }

    await Course.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Course removed successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to delete course" });
  }
};

// @desc    Add a lesson to a course
// @route   POST /api/courses/:id/lessons
const addLesson = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ success: false, message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user._id.toString()) {
      return res.status(403).json({ success: false, message: "Only the course instructor can add lessons" });
    }

    course.lessons.push(req.body);
    await course.save();

    const updated = await course.populate("instructor", "name email");
    res.status(201).json({ success: true, data: updated });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to add lesson" });
  }
};

module.exports = { getAllCourses, getCourseById, createCourse, updateCourse, deleteCourse, addLesson };
