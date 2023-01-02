import { useParams } from "react-router-dom";

const GuestHome = () => {
  const { id } = useParams();
  return (
    <div className="GuestHome">
      <details>
        <summary></summary>
        <nav class="menu">
          <a onClick={() => (window.location.href = `/GuestHome`)}>Home</a>
          <a onClick={() => (window.location.href = `/GesMostView`)}>most view course</a>
          <a onClick={() => (window.location.href = `/GuestCourse`)}>
            View Available Courses
          </a>
          <a href="#link">About</a>
        </nav>
      </details>
    </div>
  );
};

export default GuestHome;
