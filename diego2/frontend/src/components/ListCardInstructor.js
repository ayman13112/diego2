import React from "react";
import CourseCardInstructor from "./CourseCardInstructor";

const ListCardInstructor = ({ searchResults }) => {
  const res = searchResults.map((course) => (
    <CourseCardInstructor key={course.id} course={course} />
  ));

  const content = res?.length ? res : <h1>No courses found</h1>;
  return <main>{content}</main>;
};

export default ListCardInstructor;
