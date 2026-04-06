import { createContext, useState, useContext, useEffect } from "react";
import { apiLogin, apiRegister } from "../services/api";

const AuthCtx = createContext();

// custom hook so we dont have to import useContext everywhere
export const useAuth = () => useContext(AuthCtx);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // check if user data exists in localStorage on first load
  useEffect(() => {
    try {
      const saved = localStorage.getItem("sb_user");
      if (saved) {
        setCurrentUser(JSON.parse(saved));
      }
    } catch (e) {
      localStorage.removeItem("sb_user");
      localStorage.removeItem("token");
    }
    setIsLoading(false);
  }, []);

  const loginUser = async (email, password) => {
    const res = await apiLogin({ email, password });
    const userData = res.data.data;
    setCurrentUser(userData);
    localStorage.setItem("sb_user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    return userData;
  };

  const registerUser = async (name, email, password, role) => {
    const res = await apiRegister({ name, email, password, role });
    const userData = res.data.data;
    setCurrentUser(userData);
    localStorage.setItem("sb_user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token);
    return userData;
  };

  const logoutUser = () => {
    setCurrentUser(null);
    localStorage.removeItem("sb_user");
    localStorage.removeItem("token");
  };

  return (
    <AuthCtx.Provider value={{ currentUser, loginUser, registerUser, logoutUser, isLoading }}>
      {children}
    </AuthCtx.Provider>
  );
};
