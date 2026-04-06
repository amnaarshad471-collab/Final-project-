import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const TopNav = () => {
  const { currentUser, logoutUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logoutUser();
    navigate("/");
  };

  // figure out which dashboard to link to based on role
  let dashLink = "/student/dashboard";
  if (currentUser?.role === "admin") dashLink = "/admin/dashboard";
  else if (currentUser?.role === "instructor") dashLink = "/instructor/dashboard";

  return (
    <nav className="site-navbar">
      <Link to="/" className="logo">SkillBridge</Link>
      <div className="nav-links">
        <NavLink to="/" end>Home</NavLink>
        <NavLink to="/courses">Courses</NavLink>
        <NavLink to="/about">About</NavLink>
      </div>
      <div className="nav-actions">
        {currentUser ? (
          <>
            <NavLink to={dashLink}>Dashboard</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <>
            <NavLink to="/login">Login</NavLink>
            <Link to="/register" className="signup-btn">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default TopNav;
