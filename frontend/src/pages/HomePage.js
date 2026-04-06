import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const HomePage = () => {
  const { currentUser } = useAuth();

  return (
    <div>
      {/* hero section */}
      <section className="hero-banner">
        <div className="container">
          <h1>Master New Skills with <span className="highlight">SkillBridge</span></h1>
          <p>Your gateway to quality education. Browse courses from expert instructors, track your progress, and level up your career.</p>
          <div className="hero-btns">
            <Link to="/courses" className="btn-fill">Explore Courses</Link>
            {!currentUser && <Link to="/register" className="btn-outline">Join for Free</Link>}
          </div>
        </div>
      </section>

      {/* features */}
      <section className="container py-5">
        <h2 className="section-heading">What Makes Us Different</h2>
        <p className="section-sub">A platform built for real learning outcomes</p>
        <div className="row">
          {[
            { icon: "📚", title: "Diverse Courses", desc: "From web development to business strategy, find courses that match your goals.", bg: "#0d9488" },
            { icon: "👨‍🏫", title: "Skilled Instructors", desc: "Learn from professionals who bring real-world experience to every lesson.", bg: "#6366f1" },
            { icon: "📈", title: "Progress Tracking", desc: "Stay motivated with visual progress indicators and enrollment dashboards.", bg: "#22c55e" },
          ].map((item, idx) => (
            <div className="col-md-4 mb-4" key={idx}>
              <div className="info-card h-100">
                <div className="card-icon" style={{ background: item.bg }}>{item.icon}</div>
                <h5 style={{ fontFamily: "var(--font-heading)" }}>{item.title}</h5>
                <p style={{ color: "var(--clr-body)", fontSize: "0.9rem" }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* user roles explanation */}
      <section style={{ background: "#f1f5f9", padding: "3.5rem 0" }}>
        <div className="container">
          <h2 className="section-heading">Built for Everyone</h2>
          <p className="section-sub">Three roles, one powerful platform</p>
          <div className="row">
            {[
              { emoji: "🎓", role: "Student", desc: "Browse the catalog, enroll in courses, and track your learning progress through your personal dashboard.", color: "#22c55e" },
              { emoji: "📝", role: "Instructor", desc: "Create courses with multiple lessons, manage your content library, and reach students around the world.", color: "#6366f1" },
              { emoji: "⚙️", role: "Admin", desc: "View platform analytics, manage all users and courses, and keep everything running smoothly.", color: "#dc2626" },
            ].map((r, i) => (
              <div className="col-md-4 mb-4" key={i}>
                <div className="info-card h-100">
                  <div style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{r.emoji}</div>
                  <h5 style={{ fontFamily: "var(--font-heading)", color: r.color }}>{r.role}</h5>
                  <p style={{ color: "var(--clr-body)", fontSize: "0.88rem", margin: 0 }}>{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* cta */}
      <section className="container text-center py-5">
        <h2 style={{ fontFamily: "var(--font-heading)", fontWeight: 800 }}>Ready to get started?</h2>
        <p style={{ color: "var(--clr-body)", marginBottom: "1.5rem" }}>Join SkillBridge today and start building your future.</p>
        <Link to={currentUser ? "/courses" : "/register"} className="btn-fill" style={{ padding: "0.8rem 2.5rem" }}>
          {currentUser ? "Browse Courses" : "Create Account"}
        </Link>
      </section>
    </div>
  );
};

export default HomePage;
