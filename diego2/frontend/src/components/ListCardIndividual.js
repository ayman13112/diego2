import React from "react";
import CourseCardIndividual from "./CourseCardIndividual";

const ListCardIndividual = ({ searchResults }) => {
  const res = searchResults.map((course) => (
    <CourseCardIndividual key={course.id} course={course} />
  ));

  const content = res?.length ? res : <h1>No courses found</h1>;
  return <main>{content}</main>;
};

export default ListCardIndividual;