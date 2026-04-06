const mongoose = require("mongoose");

// sub-schema for individual lessons inside a course
const lessonSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  duration: { type: String, default: "" },
});

// main course schema
const courseSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Course title is required"],
      trim: true,
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    instructor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    category: {
      type: String,
      required: [true, "Please select a category"],
      enum: [
        "Web Development",
        "Mobile Development",
        "Data Science",
        "Design",
        "Business",
        "Other",
      ],
    },
    price: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
    lessons: [lessonSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);
