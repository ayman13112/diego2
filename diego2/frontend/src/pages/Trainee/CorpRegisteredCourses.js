import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Link } from "react-router-dom";

const CorpRegisteredCourses = () => {
  const [courses, setCourses] = useState(null);
  //const { id } = useParams();

  // const fetchCourses = async () => {
  //   const { data } = await axios.get(`/api/guest/getcourse/${id}`);

  //   setCourse(data);
  // };

  // useEffect(() => {
  //   fetchCourses();
  // }, []);

 

  const { id } = useParams();
  const fetchCourses = async () => {
    const { data } = await axios.get(`/api/corporateTrainee/seelist/${id}`);

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
              <Link to={`/CorpRegisteredCourse2/"${id}/${course._id}`} >View Course</Link>
              
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

        {/* <button onClick={handleSendReq}> Refund your money</button> */}

      </div>
    </article>
  );
};

export default CorpRegisteredCourses;
