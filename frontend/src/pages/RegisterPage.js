import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RegisterPage = () => {
  const [formData, setFormData] = useState({ name: "", email: "", password: "", password2: "", role: "student" });
  const [errMsg, setErrMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const onChange = (e) => { setFormData({ ...formData, [e.target.name]: e.target.value }); setErrMsg(""); };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { name, email, password, password2, role } = formData;

    if (!name || !email || !password) { setErrMsg("Please fill in all required fields"); return; }
    if (password !== password2) { setErrMsg("Passwords do not match"); return; }
    if (password.length < 6) { setErrMsg("Password needs at least 6 characters"); return; }

    setBusy(true);
    try {
      const userData = await registerUser(name, email, password, role);
      if (userData.role === "admin") navigate("/admin/dashboard");
      else if (userData.role === "instructor") navigate("/instructor/dashboard");
      else navigate("/student/dashboard");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Registration failed");
    }
    setBusy(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "0.5rem" }}>🚀</div>
        <h2>Join SkillBridge</h2>
        <p className="subtitle">Create your account and start learning</p>
        {errMsg && <div className="msg-box err">{errMsg}</div>}
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Full Name</label>
            <input name="name" value={formData.name} onChange={onChange} placeholder="Your full name" />
          </div>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" name="email" value={formData.email} onChange={onChange} placeholder="you@example.com" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" name="password" value={formData.password} onChange={onChange} placeholder="At least 6 characters" />
          </div>
          <div className="input-group">
            <label>Confirm Password</label>
            <input type="password" name="password2" value={formData.password2} onChange={onChange} placeholder="Re-enter your password" />
          </div>
          <div className="input-group">
            <label>I want to join as</label>
            <select name="role" value={formData.role} onChange={onChange}>
              <option value="student">Student</option>
              <option value="instructor">Instructor</option>
            </select>
          </div>
          <button type="submit" className="btn-submit" disabled={busy}>
            {busy ? "Creating Account..." : "Create Account"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.88rem", color: "var(--clr-body)" }}>
          Already registered? <Link to="/login" style={{ fontWeight: 700 }}>Sign in</Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
