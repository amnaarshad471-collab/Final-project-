import { useState, useEffect } from "react";
import { apiGetUsers, apiDeleteUser, apiGetAnalytics, apiGetCourses, apiDeleteCourse } from "../services/api";
import { useAuth } from "../context/AuthContext";

const AdminDash = () => {
  const { currentUser } = useAuth();
  const [users, setUsers] = useState([]);
  const [courses, setCourses] = useState([]);
  const [stats, setStats] = useState(null);
  const [tab, setTab] = useState("overview");
  const [loading, setLoading] = useState(true);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const fetchAll = async () => {
    setLoading(true);
    try {
      const [uRes, cRes, aRes] = await Promise.all([apiGetUsers(), apiGetCourses(), apiGetAnalytics()]);
      setUsers(uRes.data.data);
      setCourses(cRes.data.data);
      setStats(aRes.data.data);
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { fetchAll(); }, []);

  const removeUser = async (id) => {
    if (!window.confirm("Remove this user?")) return;
    try { await apiDeleteUser(id); setMsg({ text: "User removed", type: "ok" }); fetchAll(); }
    catch (err) { setMsg({ text: err.response?.data?.message || "Failed", type: "err" }); }
  };

  const removeCourse = async (id) => {
    if (!window.confirm("Delete this course?")) return;
    try { await apiDeleteCourse(id); setMsg({ text: "Course deleted", type: "ok" }); fetchAll(); }
    catch (err) { setMsg({ text: "Failed", type: "err" }); }
  };

  if (loading) return <div className="loading-wrap"><div className="loader"></div></div>;

  const overviewCards = [
    { label: "Total Users", value: stats?.totalUsers || 0, emoji: "👥", bg: "#0d9488" },
    { label: "Students", value: stats?.students || 0, emoji: "🎓", bg: "#22c55e" },
    { label: "Instructors", value: stats?.instructors || 0, emoji: "📝", bg: "#6366f1" },
    { label: "Courses", value: courses.length, emoji: "📚", bg: "#f97316" },
  ];

  return (
    <div>
      <div className="dash-header"><div className="container"><h2>Admin Dashboard</h2><p>Welcome, {currentUser?.name}!</p></div></div>
      <div className="container py-4">
        {msg.text && <div className={`msg-box ${msg.type}`}>{msg.text}<span onClick={() => setMsg({ text: "", type: "" })} style={{ float: "right", cursor: "pointer", opacity: 0.5 }}>✕</span></div>}

        <div className="tab-bar">
          <button className={tab === "overview" ? "on" : ""} onClick={() => setTab("overview")}>Overview</button>
          <button className={tab === "users" ? "on" : ""} onClick={() => setTab("users")}>Users ({users.length})</button>
          <button className={tab === "courses" ? "on" : ""} onClick={() => setTab("courses")}>Courses ({courses.length})</button>
        </div>

        {tab === "overview" && (
          <div className="row">
            {overviewCards.map((card, i) => (
              <div className="col-md-3 col-6 mb-4" key={i}>
                <div className="stat-box">
                  <div className="stat-dot" style={{ background: card.bg }}>{card.emoji}</div>
                  <div className="stat-num">{card.value}</div>
                  <div className="stat-label">{card.label}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {tab === "users" && (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead><tr><th>Name</th><th>Email</th><th>Role</th><th>Joined</th><th>Action</th></tr></thead>
              <tbody>{users.map((u) => (
                <tr key={u._id}>
                  <td><strong>{u.name}</strong></td>
                  <td style={{ color: "var(--clr-body)" }}>{u.email}</td>
                  <td><span className={`role-tag ${u.role}`}>{u.role}</span></td>
                  <td style={{ color: "var(--clr-light)", fontSize: "0.82rem" }}>{new Date(u.createdAt).toLocaleDateString()}</td>
                  <td>{u.role !== "admin" ? <button className="btn-light btn-sm" style={{ color: "var(--clr-red)" }} onClick={() => removeUser(u._id)}>Remove</button> : <span style={{ fontSize: "0.78rem", color: "var(--clr-light)" }}>Protected</span>}</td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}

        {tab === "courses" && (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead><tr><th>Title</th><th>Instructor</th><th>Category</th><th>Price</th><th>Lessons</th><th>Action</th></tr></thead>
              <tbody>{courses.map((c) => (
                <tr key={c._id}>
                  <td><strong>{c.title}</strong></td>
                  <td style={{ color: "var(--clr-body)" }}>{c.instructor?.name || "N/A"}</td>
                  <td><span className="tag">{c.category}</span></td>
                  <td>{c.price === 0 ? "Free" : `$${c.price}`}</td>
                  <td>{c.lessons?.length || 0}</td>
                  <td><button className="btn-light btn-sm" style={{ color: "var(--clr-red)" }} onClick={() => removeCourse(c._id)}>Delete</button></td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDash;
