import axios from "axios";

// create axios instance with base URL
const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

// attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ---- Auth endpoints ----
export const apiRegister = (data) => api.post("/auth/register", data);
export const apiLogin = (data) => api.post("/auth/login", data);
export const apiGetMe = () => api.get("/auth/me");

// ---- Course endpoints ----
export const apiGetCourses = (params) => api.get("/courses", { params });
export const apiGetCourse = (id) => api.get(`/courses/${id}`);
export const apiCreateCourse = (data) => api.post("/courses", data);
export const apiUpdateCourse = (id, data) => api.put(`/courses/${id}`, data);
export const apiDeleteCourse = (id) => api.delete(`/courses/${id}`);
export const apiAddLesson = (courseId, data) => api.post(`/courses/${courseId}/lessons`, data);

// ---- Enrollment endpoints ----
export const apiEnroll = (courseId) => api.post("/enrollments", { courseId });
export const apiMyEnrollments = () => api.get("/enrollments/my-courses");
export const apiUpdateProgress = (id, progress) => api.put(`/enrollments/${id}/progress`, { progress });

// ---- User/Admin endpoints ----
export const apiGetUsers = () => api.get("/users");
export const apiDeleteUser = (id) => api.delete(`/users/${id}`);
export const apiGetAnalytics = () => api.get("/users/analytics");

export default api;
