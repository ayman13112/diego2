import { useEffect, useState } from "react";
import axios from "axios";
import ListCard from "../components/ListCard";

const IndMostView = () => {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    const { data } = await axios.get("/api/individualTrainee/mostview");

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
    <div className="mostview">
      <div className="courses">
        
        <ListCard searchResults={courses} />
      </div>
      <button type="button"onClick={handleChange}> view </button>
    </div>
    
  );
};

export default IndMostView;
