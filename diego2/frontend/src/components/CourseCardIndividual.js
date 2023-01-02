import React from "react";
import ViewVideo from "../pages/Guest/ViewVideo";
const CourseCardIndividual = ({ course }) => {
  return (
    <div id="container">
      <div class="product-details">
        <h1>{course.Title}</h1>

        <p class="information">
          <span>Subject: {course.ShortSummary}</span>
        </p>

        <p>
          <span>Instructor: {course.Instructor}</span>
        </p>

        <div class="control">
          <button
            class="btn"
            onClick={() => (window.location.href = `/courseIndividual/${course._id}`)}
            key={course._id}
          >
            <span class="buy">view course</span>
          </button>
          <button
            class="btn"
            onClick={() =>
              (window.location.href = `course/video/${course._id}`)
            }
            key={course._id}
          >
            <span class="buy">view video</span>
          </button>
        </div>
      </div>

      <div class="product-image">
        <div class="info">
          <h2> Description</h2>
          <ul>
            <li>
              <strong>Price: </strong>
              {course.Price}
            </li>
            <li>
              <strong>Rating: </strong>
              {course.Rating}
            </li>
            <li>
              <strong>Total Hours: </strong>
              {course.TotalHours}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseCardIndividual;
