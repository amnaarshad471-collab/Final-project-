import { Link } from "react-router-dom";

// map category to emoji for the card thumbnail
const categoryIcons = {
  "Web Development": "💻",
  "Mobile Development": "📱",
  "Data Science": "📊",
  "Design": "🎨",
  "Business": "📈",
  "Other": "📚",
};

// different bg colors for each category
const categoryColors = {
  "Web Development": "linear-gradient(135deg, #134e4a, #0d9488)",
  "Mobile Development": "linear-gradient(135deg, #1e3a5f, #3b82f6)",
  "Data Science": "linear-gradient(135deg, #312e81, #6366f1)",
  "Design": "linear-gradient(135deg, #701a75, #d946ef)",
  "Business": "linear-gradient(135deg, #78350f, #f59e0b)",
  "Other": "linear-gradient(135deg, #1e293b, #475569)",
};

const CourseCard = ({ course }) => {
  const emoji = categoryIcons[course.category] || "📚";
  const bgColor = categoryColors[course.category] || categoryColors["Other"];

  return (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="course-item h-100">
        <div className="course-thumb" style={{ background: bgColor }}>
          {emoji}
        </div>
        <div className="course-info">
          <span className="tag">{course.category}</span>
          <h5 style={{ fontFamily: "var(--font-heading)", fontWeight: 700, margin: "0.4rem 0 0.2rem", fontSize: "1rem" }}>
            {course.title}
          </h5>
          <p style={{ fontSize: "0.82rem", color: "var(--clr-light)", margin: "0 0 0.4rem" }}>
            By: {course.instructor?.name || "Unknown"}
          </p>
          <p style={{ fontSize: "0.85rem", color: "var(--clr-body)", flex: 1, marginBottom: "1rem" }}>
            {course.description?.length > 90
              ? course.description.substring(0, 90) + "..."
              : course.description}
          </p>
          <div className="d-flex justify-content-between align-items-center">
            <span className="price-tag">
              {course.price === 0 ? "Free" : `$${course.price}`}
            </span>
            <Link to={`/courses/${course._id}`} className="btn-light btn-sm">
              View Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
