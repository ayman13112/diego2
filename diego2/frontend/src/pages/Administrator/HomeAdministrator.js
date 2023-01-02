import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import ListCardAdministrator from "../../components/ListCardAdministrator";

import UserFormAdmin from "../../components/UserFormAdmin";
import Navbar from "../../components/Navbar";

const HomeAdministrator = () => {
  const [courses, setCourses] = useState([]);

  //fetch courses
  const fetchCourses = async () => {
    const { data } = await axios.get(`/api/guest/viewcourse`);

    setCourses(data);
  };

  const handleChange = async (e) => {
    e.preventDefault();
    if (e.target != null) {
      const { value } = e.target;
      const filteredCourses = courses.filter(
        (course) => course.Title.toLowerCase().includes(value.toLowerCase())
        // || course.Subject.toLowerCase().includes(value.toLowerCase()) ||
        // course.Instructor.toLowerCase().includes(value.toLowerCase())
      );

      setCourses(filteredCourses);
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);
  return (
    <div className="homeAdministrator">
      <details>
        <summary></summary>
        <nav class="menu">
          <a onClick={() => (window.location.href = `/HomeAdministrator`)}>
            Home
          </a>

          <a onClick={() => (window.location.href = `/AddAdministrator`)}>
            Add Administrator
          </a>
          <a onClick={() => (window.location.href = `/AddInstructor`)}>
            Add Instructor
          </a>
          <a onClick={() => (window.location.href = `/AddCorporateTrainee`)}>
            Add CorporateTrainee
          </a>
          <a onClick={() => (window.location.href = `/SetAllPromotion`)}>
             Set Promotion for all Courses
          </a>
          

          <a href="#link">About</a>
        </nav>
      </details>
      <div className="courses">
        <input type={"text"} onChange={handleChange} />
        <ListCardAdministrator searchResults={courses} />
      </div>
    </div>
  );
};

export default HomeAdministrator;
