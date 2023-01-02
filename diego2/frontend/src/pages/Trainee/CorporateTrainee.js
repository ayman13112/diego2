import { useEffect, useState } from "react";
import axios from "axios";
import ListCard from "../../components/ListCard";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const CorporateTrainee = () => {
  const [courses, setCourses] = useState([]);

  const { id } = useParams();
  const fetchCourses = async () => {
    const { data } = await axios.get("/api/individualTrainee/viewcourse");

    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="courses">
        <Link to={"/CorMostView"} >most view courses</Link>
        {courses &&
          courses.map((course) => (
            <div className="course" key={course._id}>
              <h2>{course.Title}</h2>
              <p>{course.Subject}</p>
              <Link to={`/CorporateTraineeCourse/${id}/${course._id}`} >view Course</Link>
              
              {/* <button
      {courses &&
        courses.map((course) => (
          <div className="course" key={course._id}>
            <h2>{course.Title}</h2>
            <p>{course.Subject}</p>
            <Link to={"/traineeCourse/" + course._id}>view Course</Link>

            {/* <button
                onClick={() => (window.location.href = `/course/${course._id}`)}
                key={course._id}
              >
                {" "}
                view Course{" "}
              </button> */}
          </div>
        ))}


        <button onClick={()=>(window.location.href = `/CorpRegisteredCourses/${id}`)}>View your Courses</button>
    </div>
  );
};

export default CorporateTrainee;
