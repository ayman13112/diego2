import { useEffect, useState } from "react";
import axios from "axios";
import ListCard from "../../components/ListCard";

const GuestCourse = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const { data } = await axios.get("/api/guest/viewcourse");

    setCourses(data);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target != null) {
      const { value } = e.target;
      const filteredCourses = courses.filter(
        (course) => course.Title.toLowerCase().includes(value.toLowerCase())
        //   || course.Subject.toLowerCase().includes(value.toLowerCase()) ||
        //   course.Instructor.toLowerCase().includes(value.toLowerCase())
      );

      setCourses(filteredCourses);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="GuestCourse">
      <div className="courses">
        <input type={"text"} onChange={handleChange} />
        <ListCard searchResults={courses} />
      </div>
    </div>
  );
};

export default GuestCourse;
