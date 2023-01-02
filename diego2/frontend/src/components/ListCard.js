import React from "react";
import CourseCard from "./CourseCard";

const ListCard = ({ searchResults }) => {
  const res = searchResults.map((course) => (
    <CourseCard key={course.id} course={course} />
  ));

  const content = res?.length ? res : <h1>No courses found</h1>;
  return <main>{content}</main>;
};

export default ListCard;
