const course = require("../models/course");
const { default: mongoose } = require("mongoose");

var ObjectId = require("mongodb").ObjectId;
const viewCourses = async (req, res) => {
  let courses;
  try {
    courses = await course.find({});
  } catch {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
  return res.status(200).json(courses);
};

const getCourse = async (req, res) => {
  const id = req.params.id;
  let courses;
  try {
    courses = await course.findById(id);
    res.send(courses);
  } catch {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
};

const searchCourse = async (req, res) => {
  try {
    let data = await course.find({
      $or: [
        { Title: { $regex: req.params.key } },
        { Subject: { $regex: req.params.key } },
        { instructor: { $regex: req.params.key } },
      ],
    });
    res.send(data);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const filterCourse = async (req, res) => {
  try {
    let data = await course.find({
      $or: [
        { Subject: { $regex: req.params.key } },
        { Rating: { $regex: req.params.key } },
      ],
    });
    res.send(data);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const filterCourseprice = async (req, res) => {
  try {
    let data = await course.find({
      Price: { $lte: req.params.key },
    });
    res.send(data);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const FindCourseById = async (req, res) => {
  try {
    let data = await course.find({ _id: req.params.key });
    res.send(data);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};
const mostview=async (req,res)=>{
  const data=await course.find().sort("-NoOfView").limit(3).exec((err,val)=>{
    if(err){
      res.send('err')
    }
    else{
      res.send(val)
    }
  })
  
}

module.exports = {
  viewCourses,
  getCourse,
  searchCourse,
  filterCourse,
  filterCourseprice,
  
  FindCourseById,
  mostview
};
