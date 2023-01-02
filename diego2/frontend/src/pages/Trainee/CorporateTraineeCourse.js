import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const TraineeCourse = () => {
  const [course, setCourse] = useState(null);
  //const { id } = useParams();

  // const fetchCourses = async () => {
  //   const { data } = await axios.get(`/api/guest/getcourse/${id}`);

  //   setCourse(data);
  // };

  // useEffect(() => {
  //   fetchCourses();
  // }, []);

  const [showRate, setShowRate] = useState(false);
  const [rating, setRating] = useState(null);
  const [showInstructorRate, setShowInstructorRate] = useState(false);
  const [instructorRating, setinstructorRating] = useState(null);

  const { id1,id2 } = useParams();
  const fetchCourses = async () => {
    await axios
      .get(`/api/individualTrainee/FindCourseById/${id2}`)
      .then((res) => {
        console.log(res.data[0]);
        setCourse(res.data[0]);
      });
  };

  const handleRateSubmit = async (e) => {
    e.preventDefault();

    await axios
      .put(`/api/individualTrainee/setcourcerate/${id2}`, {
        Rating: rating,
      })
      .then((res) => {
        console.log(res);
        setShowRate(false);
        alert("thank you for your feedback");
      });
  };

  const handleInstructorRateSubmit = async (e) => {
    e.preventDefault();
    alert(instructorRating);

    await axios
      .put(`/api/individualTrainee/setrate/${course?.instructor}`, {
        Rate: instructorRating,
      })
      .then((res) => {
        setShowInstructorRate(false);
        alert("ins thank you for your feedback");
      });
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleShowRate = () => {
    setShowRate(!showRate);
  };

  const handleShowInstructorRate = () => {
    setShowInstructorRate(!showInstructorRate);
  };

  const handleSendReq = () => {
    axios
     .post(`/api/corporateTrainee/sendreq/${id1}/${id2}`)
     .then((res) => {
        console.log(res);
        alert("Request sent successfully");
      });
  }

  return (
    <article>
      <div>

        <h1>{course?.Title}</h1>
        <p> {course?.Subject}</p>
        <p> {course?.Price}</p>

        <button onClick={handleShowRate}>
          {showRate == true ? "set Rate !" : "show rate ? "}
        </button>
        {showRate == true ? (
          <div>
            <form className="classForm" onSubmit={handleRateSubmit}>
              <h3> Give a rating </h3>

              <label>Title</label>
              <input
                type="number"
                required
                onChange={(e) => setRating(e.target.value)}
              />

              <button> Click here </button>
            </form>
          </div>
        ) : (
          <div></div>
        )}

        <button onClick={handleShowInstructorRate}>
          {showInstructorRate == true
            ? "set Instructor Rate !"
            : "show Instructor rate ? "}
        </button>
        {showInstructorRate == true ? (
          <div>
            <form className="classForm" onSubmit={handleInstructorRateSubmit}>
              <h3> Give a rating for your instructor </h3>

              <label>Title</label>
              <input
                type="number"
                required
                onChange={(e) => setinstructorRating(e.target.value)}
              />

              <button> Click here </button>
            </form>
          </div>
        ) : (
          <div></div>
        )}

        <button onClick={handleSendReq}> Request access to the course </button>
        <br />
        <button onClick={()=>(window.location.href = `/CorpReportProblem/${id1}/${id2}`)}>Report a problem</button>
      </div>
    </article>
  );
};

export default TraineeCourse;
