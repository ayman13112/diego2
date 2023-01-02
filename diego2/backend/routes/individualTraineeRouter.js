const express = require("express");

const router = express.Router();

const {
  viewCourses,
  searchCourse,
  filterCourse,
  filterCourseprice,
  changepassword,
  setrate,
  setcourcerate,
  receiveemail,
  viewExam,
  signUp,  
  mostview,
  FindCourseById,
  
  payonline,
  reqrefund,
  viewwallet,
  addnote,
  writenotes,
  viewregisteredcourses,

  report,

  getStatus,
  seelist,

  seeallproblem,
  viewreporttype,
  viewstaustype1,

  f,

  getuser,
  getexc,
} = require("../controllers/individualTraineeController");

router.get("/viewcourse", viewCourses);
router.get("/searchcourse/:key", searchCourse);
router.get("/filtercourse/:key", filterCourse);
router.get("/filtercourseprice/:key", filterCourseprice);
router.put("/changepassword/:id", changepassword);
router.put("/setrate/:id", setrate);
router.put("/setcourcerate/:id", setcourcerate);
router.post("/receiveemail", receiveemail);
router.get("/viewExam/:id", viewExam);

router.post("/signup", signUp);
router.get("/FindCourseById/:key", FindCourseById);
router.get("/mostview", mostview);

router.post("/payonline/:id1/:id2", payonline);

router.post("/reqrefund/:id1/:id2",reqrefund);
router.get("/viewwallet/:id",viewwallet)
router.get("/addnote/:id",addnote);

router.post("/writenotes/:id1/:id2",writenotes);

router.post("/viewregisteredcourses/:id",viewregisteredcourses)

router.post("/report/:id1/:id2",report)

router.get("/getStatus/:id1/:id2",getStatus);

router.get("/addnote/:id",addnote);

router.get("/seelist/:id",seelist);

router.get("/seeallproblem/:id",seeallproblem);

router.get("/viewreporttype/:id1/:id2",viewreporttype);

router.get("/viewstaustype/:id/:id2",viewstaustype1);

router.post("/f/:id",f);

router.post("/getuser/:id1/:id2",getuser);

router.get("/getexc/:id",getexc);
module.exports = router;
