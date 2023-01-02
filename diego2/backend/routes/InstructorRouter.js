const express = require("express");

const router = express.Router();

const {
  createCourse,
  searchCourse,
  filterCourse,
  filterCourseprice,
  viewCourses,

  changepassword,
  sendemail,
  recive,
  uploadVideo,
  uploadLinkUnderEachSubtitle,

  editBiography,
  editEmail,
  setExam,
  viewExam,
  setDiscount,
  mostview,
  getmoney,
  viewInstructor,
  viewSpecificCourse,
} = require("../controllers/instructorController");

router.post("/createcourse", createCourse);
router.get("/searchcourse/:key", searchCourse);
router.get("/filtercourse/:id/:key2", filterCourse);
router.get("/filtercourseprice/:id/:key2", filterCourseprice);
router.get("/viewcourse/:id", viewCourses);

router.put("/changepassword/:id", changepassword);
router.post("/receiveemail/:id", sendemail);
router.get("/recive/:key", recive);
router.put("/uploadVideoLinkAsCoursePreview/:id", uploadVideo);
router.put(
  "/uploadLinkUnderEachSubtitle/:id1/:id2",
  uploadLinkUnderEachSubtitle
);

router.put("/editemail/:id", editEmail);
router.put("/editbiography/:id", editBiography);
router.put("/createexam/:id", setExam);
router.get("/viewexam/:id", viewExam);
router.put("/setdiscount/:id", setDiscount);

router.get("/mostview", mostview);

router.get("/getmoney/:id", getmoney);

router.get("/viewinstructor/:id", viewInstructor);

module.exports = router;