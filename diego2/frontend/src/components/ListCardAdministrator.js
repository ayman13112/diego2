import React from "react";
import CourseCardAdministrator from "./CourseCardAdministrator";

const ListCardAdministrator = ({ searchResults }) => {
  const res = searchResults.map((course) => (
    <CourseCardAdministrator key={course.id} course={course} />
  ));

  const content = res?.length ? res : <h1>No courses found</h1>;
  return <main>{content}</main>;
};

export default ListCardAdministrator;