const express = require("express");

const router = express.Router();

const {
  viewCourses,
  getCourse,
  searchCourse,
  filterCourse,
  filterCourseprice,

  FindCourseById,
  mostview,
} = require("../controllers/guestController");

router.get("/viewcourse", viewCourses);
router.get("/getcourse/:id", getCourse);
router.get("/searchcourse/:key", searchCourse);
router.get("/filtercourse/:key", filterCourse);
router.get("/filtercourseprice/:key", filterCourseprice);

router.get("/FindCourseById/:key", FindCourseById);
router.get("/mostview",mostview)

module.exports = router; 
