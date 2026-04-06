import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [busy, setBusy] = useState(false);
  const { loginUser } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) { setErrMsg("Both fields are required"); return; }
    setBusy(true);
    try {
      const userData = await loginUser(email, password);
      // redirect based on role
      if (userData.role === "admin") navigate("/admin/dashboard");
      else if (userData.role === "instructor") navigate("/instructor/dashboard");
      else navigate("/student/dashboard");
    } catch (err) {
      setErrMsg(err.response?.data?.message || "Login failed, please try again");
    }
    setBusy(false);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-box">
        <div style={{ textAlign: "center", fontSize: "2.5rem", marginBottom: "0.5rem" }}>🔐</div>
        <h2>Welcome Back</h2>
        <p className="subtitle">Sign in to your SkillBridge account</p>
        {errMsg && <div className="msg-box err">{errMsg}</div>}
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>Email Address</label>
            <input type="email" value={email} onChange={(e) => { setEmail(e.target.value); setErrMsg(""); }} placeholder="you@example.com" />
          </div>
          <div className="input-group">
            <label>Password</label>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setErrMsg(""); }} placeholder="Enter your password" />
          </div>
          <button type="submit" className="btn-submit" disabled={busy}>
            {busy ? "Signing in..." : "Sign In"}
          </button>
        </form>
        <p style={{ textAlign: "center", marginTop: "1.25rem", fontSize: "0.88rem", color: "var(--clr-body)" }}>
          New here? <Link to="/register" style={{ fontWeight: 700 }}>Create an account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
