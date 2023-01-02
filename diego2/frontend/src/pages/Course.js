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
        <button onClick={() => (window.location.href = `/guest`)}>
          Go back
        </button>

        

      </div>
    </article>
  );
};

export default Course;
