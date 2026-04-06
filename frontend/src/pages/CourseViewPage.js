import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiGetCourse, apiEnroll } from "../services/api";
import { useAuth } from "../context/AuthContext";

const CourseViewPage = () => {
  const { id } = useParams();
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [enrolling, setEnrolling] = useState(false);
  const [feedback, setFeedback] = useState({ text: "", type: "" });

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const res = await apiGetCourse(id);
        setCourse(res.data.data);
      } catch (err) { console.error(err); }
      setLoading(false);
    };
    fetchCourse();
  }, [id]);

  const handleEnroll = async () => {
    if (!currentUser) { navigate("/login"); return; }
    setEnrolling(true);
    try {
      await apiEnroll(course._id);
      setFeedback({ text: "Enrolled successfully! Check your dashboard.", type: "ok" });
    } catch (err) {
      setFeedback({ text: err.response?.data?.message || "Could not enroll", type: "err" });
    }
    setEnrolling(false);
  };

  if (loading) return <div className="loading-wrap"><div className="loader"></div></div>;
  if (!course) return <div className="container py-5"><h3>Course not found</h3></div>;

  return (
    <div>
      {/* course header */}
      <div style={{ background: "linear-gradient(160deg, #134e4a, #0d9488)", padding: "2.5rem 0" }}>
        <div className="container">
          <span className="tag" style={{ background: "rgba(255,255,255,0.15)", color: "#fff" }}>{course.category}</span>
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "#fff", fontSize: "2rem", margin: "0.6rem 0 0.3rem" }}>{course.title}</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", margin: 0 }}>By: {course.instructor?.name || "Unknown"}</p>
        </div>
      </div>

      <div className="container py-4">
        <div className="row" style={{ marginTop: "-1.5rem" }}>
          {/* main content */}
          <div className="col-lg-8 mb-4">
            <div style={{ background: "var(--clr-white)", border: "1px solid var(--clr-border)", borderRadius: "var(--rounded-lg)", padding: "1.5rem" }}>
              <h4 style={{ fontFamily: "var(--font-heading)" }}>About This Course</h4>
              <p style={{ color: "var(--clr-body)", lineHeight: 1.75 }}>{course.description}</p>

              <h4 style={{ fontFamily: "var(--font-heading)", marginTop: "1.75rem" }}>
                Lessons ({course.lessons?.length || 0})
              </h4>
              {course.lessons?.length > 0 ? (
                <div style={{ marginTop: "0.75rem" }}>
                  {course.lessons.map((lesson, idx) => (
                    <div key={lesson._id || idx} className="lesson-row">
                      <div className="num">{idx + 1}</div>
                      <div style={{ flex: 1 }}>
                        <strong style={{ fontSize: "0.92rem" }}>{lesson.title}</strong>
                        <p style={{ margin: 0, fontSize: "0.8rem", color: "var(--clr-light)" }}>{lesson.content}</p>
                      </div>
                      {lesson.duration && (
                        <span style={{ fontSize: "0.78rem", color: "var(--clr-light)", whiteSpace: "nowrap" }}>
                          ⏱ {lesson.duration}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p style={{ color: "var(--clr-light)", fontStyle: "italic" }}>No lessons have been added yet.</p>
              )}
            </div>
          </div>

          {/* sidebar */}
          <div className="col-lg-4 mb-4">
            <div style={{ background: "var(--clr-white)", border: "1px solid var(--clr-border)", borderRadius: "var(--rounded-lg)", padding: "1.5rem", textAlign: "center", position: "sticky", top: 80 }}>
              <div className="price-tag" style={{ fontSize: "1.8rem", marginBottom: "0.3rem" }}>
                {course.price === 0 ? "Free" : `$${course.price}`}
              </div>
              <p style={{ color: "var(--clr-light)", fontSize: "0.85rem", marginBottom: "1.25rem" }}>
                {course.lessons?.length || 0} lessons included
              </p>
              {feedback.text && <div className={`msg-box ${feedback.type}`}>{feedback.text}</div>}
              {currentUser?.role === "student" && (
                <button className="btn-submit" onClick={handleEnroll} disabled={enrolling}>
                  {enrolling ? "Enrolling..." : "Enroll Now"}
                </button>
              )}
              {!currentUser && (
                <button className="btn-submit" onClick={() => navigate("/login")}>Login to Enroll</button>
              )}
              <p style={{ fontSize: "0.78rem", color: "var(--clr-light)", marginTop: "1rem", marginBottom: 0 }}>
                Added: {new Date(course.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseViewPage;
