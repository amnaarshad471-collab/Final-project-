const AboutPage = () => {
  const techList = [
    { name: "React 18", desc: "Component-based UI framework with hooks", emoji: "⚛️" },
    { name: "Node.js & Express", desc: "Backend API server and routing", emoji: "🟢" },
    { name: "MongoDB & Mongoose", desc: "NoSQL database with ODM layer", emoji: "🍃" },
    { name: "JWT & Bcrypt", desc: "Authentication and password security", emoji: "🔐" },
    { name: "React Router v6", desc: "Client-side navigation and route guards", emoji: "🧭" },
    { name: "Bootstrap 5", desc: "Responsive layout and grid system", emoji: "🎨" },
  ];

  return (
    <div>
      <div style={{ background: "linear-gradient(160deg, #134e4a, #0d9488)", padding: "3.5rem 0", textAlign: "center" }}>
        <div className="container">
          <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, color: "#fff", fontSize: "2.25rem" }}>About SkillBridge</h1>
          <p style={{ color: "rgba(255,255,255,0.55)", maxWidth: 500, margin: "0.75rem auto 0" }}>
            A complete Learning Management System built as a MERN Stack final project.
          </p>
        </div>
      </div>

      <div className="container py-5">
        <div className="row mb-5">
          <div className="col-lg-7 mb-4">
            <h2 style={{ fontFamily: "var(--font-heading)" }}>Project Overview</h2>
            <p style={{ color: "var(--clr-body)", lineHeight: 1.8 }}>
              SkillBridge is a full-stack Learning Management System where students can browse courses and track progress,
              instructors can create educational content with lessons, and administrators can manage the entire platform.
            </p>
            <h4 style={{ fontFamily: "var(--font-heading)", marginTop: "1.5rem" }}>Key Features</h4>
            <ul style={{ color: "var(--clr-body)", lineHeight: 2.2, paddingLeft: "1.2rem" }}>
              <li>Role-based access control with three user types</li>
              <li>JWT authentication and protected routes</li>
              <li>Full CRUD for courses and embedded lessons</li>
              <li>Course enrollment with progress tracking</li>
              <li>Admin analytics and user management</li>
              <li>Responsive design for mobile and desktop</li>
            </ul>
          </div>
          <div className="col-lg-5 mb-4">
            <div style={{ background: "#f1f5f9", borderRadius: "var(--rounded-lg)", padding: "1.5rem" }}>
              <h5 style={{ fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>Project Info</h5>
              {[["Course", "MERN Stack Web Development"], ["Type", "Final Project"], ["Stack", "MongoDB · Express · React · Node"], ["Marks", "100"]].map(([k, v]) => (
                <div key={k} className="d-flex justify-content-between" style={{ padding: "0.5rem 0", borderBottom: "1px solid #e2e8f0" }}>
                  <span style={{ fontWeight: 700, fontSize: "0.88rem" }}>{k}</span>
                  <span style={{ color: "var(--clr-body)", fontSize: "0.88rem" }}>{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <h2 className="section-heading">Technologies Used</h2>
        <p className="section-sub">Modern tools for modern web development</p>
        <div className="row">
          {techList.map((t, i) => (
            <div className="col-md-4 col-6 mb-4" key={i}>
              <div className="info-card h-100" style={{ textAlign: "left", padding: "1.25rem" }}>
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span style={{ fontSize: "1.3rem" }}>{t.emoji}</span>
                  <h6 style={{ fontFamily: "var(--font-heading)", margin: 0, fontWeight: 700 }}>{t.name}</h6>
                </div>
                <p style={{ color: "var(--clr-light)", fontSize: "0.82rem", margin: 0 }}>{t.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
