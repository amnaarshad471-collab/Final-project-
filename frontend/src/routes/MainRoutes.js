import { Routes, Route } from "react-router-dom";
import RequireAuth from "../components/RequireAuth";
import HomePage from "../pages/HomePage";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import CoursesPage from "../pages/CoursesPage";
import CourseViewPage from "../pages/CourseViewPage";
import ProfilePage from "../pages/ProfilePage";
import StudentDash from "../pages/StudentDash";
import InstructorDash from "../pages/InstructorDash";
import AdminDash from "../pages/AdminDash";

const MainRoutes = () => (
  <Routes>
    <Route path="/" element={<HomePage />} />
    <Route path="/about" element={<AboutPage />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/courses" element={<CoursesPage />} />
    <Route path="/courses/:id" element={<CourseViewPage />} />
    <Route path="/profile" element={<RequireAuth><ProfilePage /></RequireAuth>} />
    <Route path="/student/dashboard" element={<RequireAuth allowedRoles={["student"]}><StudentDash /></RequireAuth>} />
    <Route path="/instructor/dashboard" element={<RequireAuth allowedRoles={["instructor"]}><InstructorDash /></RequireAuth>} />
    <Route path="/admin/dashboard" element={<RequireAuth allowedRoles={["admin"]}><AdminDash /></RequireAuth>} />
  </Routes>
);

export default MainRoutes;
