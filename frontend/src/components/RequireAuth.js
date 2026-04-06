import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// wraps protected pages - redirects if not logged in or wrong role
const RequireAuth = ({ children, allowedRoles }) => {
  const { currentUser, isLoading } = useAuth();

  if (isLoading) {
    return <div className="loading-wrap"><div className="loader"></div></div>;
  }

  if (!currentUser) return <Navigate to="/login" />;

  if (allowedRoles && !allowedRoles.includes(currentUser.role)) {
    return <Navigate to="/" />;
  }

  return children;
};

export default RequireAuth;
