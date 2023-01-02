import { useEffect, useState } from "react";
import axios from "axios";
import ListCard from "../../components/ListCard";
import { useParams } from "react-router-dom";

const ViewVideo = () => {
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
    <div>
      <iframe
        width="560"
        height="315"
        src={course?.Video}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>{" "}
      <div>
        <button onClick={() => (window.location.href = `/guest`)}>
          Go back
        </button>
      </div>
    </div>
  );
};

export default ViewVideo;
