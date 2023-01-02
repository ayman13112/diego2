const express = require("express");

const router = express.Router();
const {
  createAdministrator,
  createInstructor,
  createCorporateTrainee,
  createindividualTrainee,
  viewInstructor,
  viewAdmin,
  setpromotion,
  setallpromotion,
  viewreqtrainees,
  acceptedtrainee,
  acceptedtraineeone,
  acceptrefund,
  acceptrefundone,
  viewproblem,
  resolved,
  pending,
  corresolved,
  corpending,
  viewCorpet,
  viewInd,
  viewrefund,

  Indviewproblem,
  Corviewproblem,

  Indviewproblemtype,
  Corviewproblemtype,
  
} = require("../controllers/administratorController");

router.get("/viewinstructor", viewInstructor);

router.get("/viewadmin", viewAdmin);

router.post("/createadministrator", createAdministrator);

router.post("/createinstructor", createInstructor);

router.post("/createcorporateTrainee", createCorporateTrainee);

router.post("/createindividualTrainee", createindividualTrainee);

router.put("/setpromotion/:id", setpromotion);
router.put("/setallpromotion", setallpromotion);



router.get("/viewreqtrainees/:id", viewreqtrainees);
router.post("/acceptedtrainee/:id", acceptedtrainee);

router.post("/acceptedtrainee/:id", acceptedtrainee);
router.post("/acceptedtraineeone/:id1/:id2", acceptedtraineeone);

router.post("/acceptrefund/:id", acceptrefund);

router.post("/acceptrefundone/:id1/:id2", acceptrefundone);

router.get("/viewproblem/:id", viewproblem);

router.post("/resolved/:id1/:id2", resolved);
router.post("/corresolved/:id1/:id2", corresolved);
router.post("/pending/:id1/:id2", pending);
router.post("/corpending/:id1/:id2", corpending);

router.get("/viewCorpet", viewCorpet);

router.get("/viewInd", viewInd);

router.get("/viewrefund/:id", viewrefund);

router.get("/Indviewproblem/:id", Indviewproblem);

router.get("/Corviewproblem/:id", Corviewproblem);

router.get("/Indviewproblemtype/:id1/:id2", Indviewproblemtype);
router.get("/Corviewproblemtype/:id1/:id2", Corviewproblemtype);

module.exports = router;
