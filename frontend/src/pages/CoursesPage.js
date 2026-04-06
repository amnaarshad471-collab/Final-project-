import { useState, useEffect } from "react";
import { apiGetCourses } from "../services/api";
import CourseCard from "../components/CourseCard";

const categories = ["Web Development", "Mobile Development", "Data Science", "Design", "Business", "Other"];

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("");

  const loadCourses = async () => {
    setLoading(true);
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedCat) params.category = selectedCat;
      const res = await apiGetCourses(params);
      setCourses(res.data.data);
    } catch (err) {
      console.error("Failed to load courses:", err);
    }
    setLoading(false);
  };

  // reload when category changes
  useEffect(() => { loadCourses(); // eslint-disable-next-line
  }, [selectedCat]);

  const onSearch = (e) => { e.preventDefault(); loadCourses(); };

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 style={{ fontFamily: "var(--font-heading)", fontWeight: 800, fontSize: "2rem" }}>Browse Courses</h1>
        <p style={{ color: "var(--clr-body)" }}>Find the perfect course for your goals</p>
      </div>

      <form onSubmit={onSearch} className="search-area">
        <input placeholder="Search by title..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
        <select value={selectedCat} onChange={(e) => setSelectedCat(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((c) => <option key={c} value={c}>{c}</option>)}
        </select>
        <button type="submit" className="btn-fill">Search</button>
      </form>

      {loading ? (
        <div className="loading-wrap"><div className="loader"></div></div>
      ) : courses.length === 0 ? (
        <div className="empty-box">
          <div className="big-icon">🔍</div>
          <h4 style={{ color: "var(--clr-body)" }}>No courses found</h4>
          <p style={{ color: "var(--clr-light)" }}>Try different search terms or clear the filter</p>
        </div>
      ) : (
        <div className="row">{courses.map((c) => <CourseCard key={c._id} course={c} />)}</div>
      )}
    </div>
  );
};

export default CoursesPage;
