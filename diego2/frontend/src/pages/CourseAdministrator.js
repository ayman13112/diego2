import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Course = () => {
  const [course, setCourse] = useState(null);
  const { id } = useParams();

  const fetchCourses = async () => {
    const { data } = await axios.get(`/api/guest/getcourse/${id}`);

    setCourse(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <article>
      <div>
        <h1>{course?.Title}</h1>
        <p> {course?.Subject}</p>
        <p> {course?.Price}</p>
        <p>{course?.Instructor}</p>
        
        <br />
        <button onClick={() => (window.location.href = `/RefundReqsInd/${id}`)}>
          View Refund Trainee Requests
        </button>
        <br />
        <button onClick={() => (window.location.href = `/CourseReqsCorp/${id}`)}>
          View Course Trainee Requests
        </button>
        <br />
        <button onClick={() => (window.location.href = `/ViewReportedProblem/${id}`)}>
          View Reported ViewReportedProblems
        </button>
        <br />
        <button onClick={() => (window.location.href = `/SetPromotion/${id}`)}>
          Set Promotion for the course
        </button>
        <br />
        <button onClick={() => (window.location.href = `/HomeAdministrator`)}>
          Go back
        </button>

        

      </div>
    </article>
  );
};

export default Course;
