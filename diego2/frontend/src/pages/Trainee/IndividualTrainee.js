import { useEffect, useState } from "react";
import axios from "axios";
import ListCard from "../../components/ListCard";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";

const IndividualTrainee = () => {
  const [courses, setCourses] = useState([]);
  const [wallet, setWallet] = useState([]);

  const { id } = useParams();
  const fetchCourses = async () => {
    const { data } = await axios.get("/api/individualTrainee/viewcourse");

    setCourses(data);
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  const handleViewWallet = async () => {
    await axios.get(`/api/individualTrainee/viewwallet/${id}`).then(   
      (res) => {
        // console.log(res);

        const report1 = res.data.y;
        
        console.log(report1)
        setWallet(report1)

        alert("You have "+report1[0]+"$")
      }
    );

  }

  return (
    
    <div className="courses">

        <button onClick={()=>(window.location.href = `/IndRegisteredCourses/${id}`)}>View your Courses</button>
        <br />
        <br />
        <button onClick={handleViewWallet}>View your Wallet</button>
        
        <br />
        <br />
        <button onClick ={() => window.location.href=`/IndViewAllProblem/${id}`}>View past Reports</button>
        <br />
        <br />
        
        <Link to={"/IndMostView"} >Most viewed Courses</Link>
        {courses &&
          courses.map((course) => (
            <div className="course" key={course._id}>
              <h2>{course.Title}</h2>
              <p>{course.Subject}</p>
              <Link to={`/IndividualTraineeCourse/${id}/${course._id}`} >view Course</Link>
          </div>
        ))}


        
    </div>
  );
};

export default IndividualTrainee;
