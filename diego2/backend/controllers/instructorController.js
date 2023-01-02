const express = require("express");
const mongoose = require("mongoose");

const instructor = require("../models/instructor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const course = require("../models/course");
const nodemailer = require("nodemailer");

//const { default: mongoose } = require("mongoose");

const createCourse = async (req, res) => {
  const {
    Title,
    Price,
    instructor,
    Video,

    // Excercise,
    // ShortSummary,
  } = req.body;
  try {
    const c = await course.create({
      Title,
      Price,
      instructor,
      Video,
    });

    res.status(200).send(c);
  } catch (err) {
    res.json({ status: "error", error: err.message });
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
        {
          $and: [
            { Subject: { $regex: req.params.key2 } },
            { instructor: req.params.id },
          ],
        },
        {
          $and: [
            { Rating: { $regex: req.params.key2 } },
            { instructor: req.params.id },
          ],
        },
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
      $and: [
        { Price: { $lte: req.params.key2 } },
        { instructor: req.params.id },
      ],
    });
    res.send(data);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const viewCourses = async (req, res) => {
  let courses;
  try {
    courses = await course.find({ instructor: req.params.id });
  } catch {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
  return res.status(200).json(courses);
};

const viewRatingReview = async (req, res) => {
  let courses;
  try {
    courses = await course.find({ instructor: req.params.id });
  } catch {
    return res.status(404).json({
      message: "couldnot find", //show specific attribute in frontend
    });
  }
  return res.status(200).json(courses);
};

const changepassword = async (req, res) => {
  const instructorId = req.params.id;
  const { Password } = req.body;
  try {
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(Password, salt);
    const c = await instructor.findByIdAndUpdate(
      mongoose.Types.ObjectId(instructorId),
      { Password: hashedPassword }
    );
    res.json({ status: "OK" });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

//edit email
const editEmail = async (req, res) => {
  const instructorId = req.params.id;
  const { Email } = req.body;
  try {
    const c = await instructor.findByIdAndUpdate(
      mongoose.Types.ObjectId(instructorId),
      { Email: Email }
    );
    res.json({ status: "OK" });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const sendemail = async (req, res) => {
  const Ins_id = req.params.id;
  try {
    const user = await instructor.findById(mongoose.Types.ObjectId(Ins_id));

    const mail = user.Email;
    console.log(user.Email);
    let transporter = nodemailer.createTransport({
      service: "gmail ",
      auth: {
        user: "elearning.platform238@gmail.com ",
        pass: "slqxhggwvjuhoajv ",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailoption = {
      from: "elearning.platform238@gmail.com ",
      to: mail,
      Subject: "test",
      text: "you want to change password ",
    };

    transporter.sendMail(mailoption, function (err, success) {
      if (err) {
        res.json({ status: "error", error: err.message });
      } else {
        res.json({ status: "Email send successfly" });
      }
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const recive = async (req, res) => {
  const username = req.params.key;
  try {
    const user = await instructor.findOne({ UserName: username });
    const mail = user.Email;
    console.log(user);
    let transporter = nodemailer.createTransport({
      service: "gmail ",
      auth: {
        user: "elearning.platform238@gmail.com ",
        pass: "slqxhggwvjuhoajv ",
      },
      tls: {
        rejectUnauthorized: false,
      },
    });

    let mailoption = {
      from: "elearning.platform238@gmail.com ",
      to: mail,
      Subject: "test",
      text: `Go to this Link http://localhost:3000/EditProfileInstructor/${user._id}`,
    };

    transporter.sendMail(mailoption, function (err, success) {
      if (err) {
        res.json({ status: "error", error: err.message });
      } else {
        res.json({ status: "Email send successfly" });
      }
    });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const uploadVideo = async (req, res) => {
  const course_id = req.params.id;
  const vid = req.body;
  try {
    console.log(vid.Video);
    const result = await course.findByIdAndUpdate(
      mongoose.Types.ObjectId(course_id),
      { Video: vid.Video }
    );
    res.send(result);
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const uploadLinkUnderEachSubtitle = async (req, res) => {
  const course_id = req.params.id1;
  const instructor_id = req.params.id2;
  const { sub } = req.body;
  try {
    const exsist = await course.find({
      $and: [{ course_id: req.params.id1 }, { instructor_id: req.params.id2 }],
    });
    if (exsist) {
      const result = await course.findByIdAndUpdate(
        mongoose.Types.ObjectId(course_id),
        { sub }
      );
      res.send(result);
    } else {
      res.status(404).json("error");
    }
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

//edit biography
const editBiography = async (req, res) => {
  const instructorId = req.params.id;
  const { Biography } = req.body;
  try {
    const c = await instructor.findByIdAndUpdate(
      mongoose.Types.ObjectId(instructorId),
      { Biography: Biography }
    );
    res.json({ status: "OK" });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const setExam = async (req, res) => {
  const courseId = req.params.id;
  const { Exam } = req.body;
  try {
    const c = await course.findByIdAndUpdate(
      mongoose.Types.ObjectId(courseId),
      { Exam }
    );
    res.json({ status: "OK" });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const viewExam = async (req, res) => {
  let exams;
  try {
    exams = await course.find({ Instructor: req.params.id });
  } catch {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
  return res.status(200).json(exams);
};

const setDiscount = async (req, res) => {
  const courseId = req.params.id;
  const { Discount } = req.body;
  try {
    const c = await course.findByIdAndUpdate(
      mongoose.Types.ObjectId(courseId),
      { Discount }
    );
    res.json({ status: "OK" });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const mostview = async (req, res) => {
  const data = await course
    .find()
    .sort("-NoOfView")
    .limit(3)
    .exec((err, val) => {
      if (err) {
        res.send("err");
      } else {
        res.send(val);
      }
    });
};

const getmoney = async (req, res) => {
  inst_id = req.params.id;
  try {
    const data = await instructor.findById(inst_id);
    const mooney = data.money;
    res.status(200).send({ data });
  } catch {
    res.send("error");
  }
};

//view instructor
const viewInstructor = async (req, res) => {
  inst_id = req.params.id;
  try {
    data = await instructor.findById(inst_id);
  } catch {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
  return res.status(200).json(data);
};

module.exports = {
  createCourse,
  searchCourse,
  filterCourse,
  filterCourseprice,
  viewCourses,
  viewRatingReview,

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
};