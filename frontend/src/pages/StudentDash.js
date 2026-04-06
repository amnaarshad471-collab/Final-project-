import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { apiMyEnrollments } from "../services/api";
import { useAuth } from "../context/AuthContext";

const StudentDash = () => {
  const { currentUser } = useAuth();
  const [myEnrollments, setMyEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    apiMyEnrollments()
      .then((res) => setMyEnrollments(res.data.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <div className="dash-header">
        <div className="container">
          <h2>Student Dashboard</h2>
          <p>Welcome back, {currentUser?.name}!</p>
        </div>
      </div>
      <div className="container py-4">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 style={{ fontFamily: "var(--font-heading)", margin: 0 }}>My Courses ({myEnrollments.length})</h4>
          <Link to="/courses" className="btn-fill btn-sm">Browse Courses</Link>
        </div>

        {loading ? (
          <div className="loading-wrap"><div className="loader"></div></div>
        ) : myEnrollments.length === 0 ? (
          <div className="empty-box">
            <div className="big-icon">📚</div>
            <h4 style={{ color: "var(--clr-body)" }}>Nothing here yet</h4>
            <p style={{ color: "var(--clr-light)" }}>Enroll in a course to get started</p>
            <Link to="/courses" className="btn-fill" style={{ marginTop: "0.75rem", display: "inline-block" }}>Find Courses</Link>
          </div>
        ) : (
          <div className="row">
            {myEnrollments.map((item) => (
              <div key={item._id} className="col-md-6 mb-4">
                <div style={{ background: "var(--clr-white)", border: "1px solid var(--clr-border)", borderRadius: "var(--rounded-lg)", padding: "1.25rem" }}>
                  <h5 style={{ fontFamily: "var(--font-heading)", fontSize: "1rem", marginBottom: "0.2rem" }}>{item.course?.title}</h5>
                  <p style={{ fontSize: "0.8rem", color: "var(--clr-light)", margin: "0 0 0.3rem" }}>By: {item.course?.instructor?.name}</p>
                  <span className="tag">{item.course?.category}</span>
                  <div style={{ marginTop: "1rem" }}>
                    <div className="d-flex justify-content-between" style={{ fontSize: "0.82rem", color: "var(--clr-body)", marginBottom: "0.3rem" }}>
                      <span>Progress</span>
                      <span style={{ fontWeight: 700 }}>{item.progress}%</span>
                    </div>
                    <div className="progress-track">
                      <div className="progress-fill" style={{ width: `${item.progress}%` }}></div>
                    </div>
                  </div>
                  <Link to={`/courses/${item.course?._id}`} className="btn-light btn-sm" style={{ marginTop: "0.9rem", display: "inline-block" }}>
                    View Course
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentDash;
