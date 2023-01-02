const express = require("express");

const router = express.Router();

const {
  viewCourses,
  searchCourse,
  filterCourse,
  changepassword,
  setrate,
  setcourcerate,
  receiveemail,

  mostview,
  makefile,
  sendreq,
  f,
  writenotes,
  viewregisteredcourses,
  //updatemostview,
  report,
  getStatus,
  seelist,
  getuser,
  viewreporttype,
} = require("../controllers/corporateTraineeController");

router.get("/viewCourse", viewCourses);
router.get("/searchcourse/:key", searchCourse);
router.get("/filtercourse/:key", filterCourse);
router.put("/changepassword/:id", changepassword);
router.put("/setrate/:id", setrate);
router.put("/setcourcerate/:id", setcourcerate);
router.post("/receiveemail", receiveemail);
router.get("/mostview", mostview);
router.put("/changepassword/:id", changepassword);
router.put("/setrate/:id", setrate);
router.put("/setcourcerate/:id", setcourcerate);
router.post("/receiveemail", receiveemail);

router.post("/makefile/:id1/:id2",makefile)

//router.post("/updatemostview/:id", updatemostview);

// router.post("/recivecer/:key",recivecer)

router.post("/sendreq/:id1/:id2", sendreq);

router.post("/f/:id",f)

router.post("/writenotes/:id1/:id2", writenotes);

router.post("/viewregisteredcourses/:id", viewregisteredcourses);

router.post("/report/:id1/:id2",report)
router.post("/viewregisteredcourses/:id", viewregisteredcourses);

router.get("/getStatus/:id1/:id2",getStatus)
router.get("/seelist/:id",seelist)

router.post("/getuser/:id1/:id2",getuser)

router.get("/viewreporttype/:id1/:id2",viewreporttype);

module.exports = router;
