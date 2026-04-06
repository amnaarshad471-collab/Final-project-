import { useState, useEffect } from "react";
import { apiGetCourses, apiCreateCourse, apiUpdateCourse, apiDeleteCourse, apiAddLesson } from "../services/api";
import { useAuth } from "../context/AuthContext";

const CATS = ["Web Development", "Mobile Development", "Data Science", "Design", "Business", "Other"];

const InstructorDash = () => {
  const { currentUser } = useAuth();
  const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({ title: "", description: "", category: "", price: 0 });
  const [lessonForm, setLessonForm] = useState({ title: "", content: "", duration: "" });
  const [lessonTarget, setLessonTarget] = useState(null);
  const [msg, setMsg] = useState({ text: "", type: "" });

  const loadMyCourses = async () => {
    try {
      const res = await apiGetCourses();
      setMyCourses(res.data.data.filter((c) => c.instructor?._id === currentUser?._id));
    } catch (err) { console.error(err); }
    setLoading(false);
  };

  useEffect(() => { loadMyCourses(); // eslint-disable-next-line
  }, []);

  const submitCourse = async (e) => {
    e.preventDefault();
    if (!form.title || !form.description || !form.category) { setMsg({ text: "Fill in all required fields", type: "err" }); return; }
    try {
      if (editId) { await apiUpdateCourse(editId, form); setMsg({ text: "Course updated!", type: "ok" }); }
      else { await apiCreateCourse(form); setMsg({ text: "Course created!", type: "ok" }); }
      setForm({ title: "", description: "", category: "", price: 0 }); setEditId(null); setShowForm(false); loadMyCourses();
    } catch (err) { setMsg({ text: err.response?.data?.message || "Something went wrong", type: "err" }); }
  };

  const startEdit = (c) => { setForm({ title: c.title, description: c.description, category: c.category, price: c.price }); setEditId(c._id); setShowForm(true); };

  const removeCourse = async (id) => {
    if (!window.confirm("Delete this course? This cannot be undone.")) return;
    try { await apiDeleteCourse(id); setMsg({ text: "Course deleted", type: "ok" }); loadMyCourses(); }
    catch (err) { setMsg({ text: "Delete failed", type: "err" }); }
  };

  const submitLesson = async (e) => {
    e.preventDefault();
    if (!lessonForm.title || !lessonForm.content) { setMsg({ text: "Lesson title and content are required", type: "err" }); return; }
    try { await apiAddLesson(lessonTarget, lessonForm); setMsg({ text: "Lesson added!", type: "ok" }); setLessonForm({ title: "", content: "", duration: "" }); setLessonTarget(null); loadMyCourses(); }
    catch (err) { setMsg({ text: "Failed to add lesson", type: "err" }); }
  };

  const cancelForm = () => { setForm({ title: "", description: "", category: "", price: 0 }); setEditId(null); setShowForm(false); };

  return (
    <div>
      <div className="dash-header"><div className="container"><h2>Instructor Dashboard</h2><p>Welcome, {currentUser?.name}!</p></div></div>
      <div className="container py-4">
        {msg.text && <div className={`msg-box ${msg.type}`}>{msg.text} <span onClick={() => setMsg({ text: "", type: "" })} style={{ float: "right", cursor: "pointer", opacity: 0.5 }}>✕</span></div>}
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h4 style={{ fontFamily: "var(--font-heading)", margin: 0 }}>My Courses ({myCourses.length})</h4>
          <button className="btn-fill btn-sm" onClick={() => { setShowForm(!showForm); if (editId) cancelForm(); }}>
            {showForm ? "Close" : "+ New Course"}
          </button>
        </div>

        {showForm && (
          <div style={{ background: "var(--clr-white)", border: "1px solid var(--clr-border)", borderRadius: "var(--rounded-lg)", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h5 style={{ fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>{editId ? "Edit Course" : "Create Course"}</h5>
            <form onSubmit={submitCourse}>
              <div className="input-group"><label>Title *</label><input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder="Course title" /></div>
              <div className="input-group"><label>Description *</label><textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows="3" placeholder="What will students learn?" /></div>
              <div className="row">
                <div className="col-md-6"><div className="input-group"><label>Category *</label><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}><option value="">Pick one...</option>{CATS.map((c) => <option key={c} value={c}>{c}</option>)}</select></div></div>
                <div className="col-md-6"><div className="input-group"><label>Price ($)</label><input type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} min="0" /></div></div>
              </div>
              <div className="d-flex gap-2"><button type="submit" className="btn-fill btn-sm">{editId ? "Save Changes" : "Create"}</button><button type="button" className="btn-light btn-sm" onClick={cancelForm}>Cancel</button></div>
            </form>
          </div>
        )}

        {lessonTarget && (
          <div style={{ background: "var(--clr-white)", border: "2px solid var(--clr-primary)", borderRadius: "var(--rounded-lg)", padding: "1.5rem", marginBottom: "1.5rem" }}>
            <h5 style={{ fontFamily: "var(--font-heading)", marginBottom: "1rem" }}>Add Lesson</h5>
            <form onSubmit={submitLesson}>
              <div className="input-group"><label>Title *</label><input value={lessonForm.title} onChange={(e) => setLessonForm({ ...lessonForm, title: e.target.value })} placeholder="Lesson title" /></div>
              <div className="input-group"><label>Content *</label><textarea value={lessonForm.content} onChange={(e) => setLessonForm({ ...lessonForm, content: e.target.value })} rows="3" placeholder="Lesson content or description" /></div>
              <div className="input-group"><label>Duration (optional)</label><input value={lessonForm.duration} onChange={(e) => setLessonForm({ ...lessonForm, duration: e.target.value })} placeholder="e.g. 45 mins" /></div>
              <div className="d-flex gap-2"><button type="submit" className="btn-fill btn-sm">Add Lesson</button><button type="button" className="btn-light btn-sm" onClick={() => { setLessonTarget(null); setLessonForm({ title: "", content: "", duration: "" }); }}>Cancel</button></div>
            </form>
          </div>
        )}

        {loading ? <div className="loading-wrap"><div className="loader"></div></div> : myCourses.length === 0 ? (
          <div className="empty-box"><div className="big-icon">📝</div><h4 style={{ color: "var(--clr-body)" }}>No courses yet</h4><p style={{ color: "var(--clr-light)" }}>Create your first course above</p></div>
        ) : (
          <div className="data-table-wrap">
            <table className="data-table">
              <thead><tr><th>Title</th><th>Category</th><th>Price</th><th>Lessons</th><th>Actions</th></tr></thead>
              <tbody>{myCourses.map((c) => (
                <tr key={c._id}>
                  <td><strong>{c.title}</strong></td>
                  <td><span className="tag">{c.category}</span></td>
                  <td>{c.price === 0 ? "Free" : `$${c.price}`}</td>
                  <td>{c.lessons?.length || 0}</td>
                  <td>
                    <button className="btn-light btn-sm" style={{ marginRight: 4 }} onClick={() => startEdit(c)}>Edit</button>
                    <button className="btn-light btn-sm" style={{ marginRight: 4 }} onClick={() => { setLessonTarget(c._id); setLessonForm({ title: "", content: "", duration: "" }); }}>+ Lesson</button>
                    <button className="btn-light btn-sm" style={{ color: "var(--clr-red)", borderColor: "var(--clr-red)" }} onClick={() => removeCourse(c._id)}>Delete</button>
                  </td>
                </tr>
              ))}</tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default InstructorDash;
