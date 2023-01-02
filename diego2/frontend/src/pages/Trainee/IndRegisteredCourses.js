import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const CorpRegisteredCourses = () => {
  const [courses, setCourses] = useState(null);
 

  const { id } = useParams();
  const fetchCourses = async () => {
    const { data } = await axios.get(`/api/individualTrainee/seelist/${id}`);

    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <article>
      <div>

      {courses &&
          courses.map((course) => (
            <div className="course" key={course._id}>
              <h2>{course.Title}</h2>
              <p>{course.Subject}</p>
              <Link to={`/IndRegisteredCourse2/${id}/${course._id}`} >View Course</Link>
              
          </div>
        ))}

        {/* <button onClick={handleSendReq}> Refund your money</button> */}

      </div>
    </article>
  );
};

export default CorpRegisteredCourses;
