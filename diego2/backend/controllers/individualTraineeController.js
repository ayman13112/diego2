const individualTrainee = require("../models/individualTrainee");
const mongoose = require("mongoose");
const course = require("../models/course");
const instructor = require("../models/instructor");
const { response } = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer")

var fs = require("fs");
const {PDFDocument, StandardFonts} = require('pdf-lib');

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
  } catch (error) {
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

const changepassword = async (req, res) => {
  const instructorId = req.params.id;
  const { Password } = req.body;
  try {
    const c = await individualTrainee.findByIdAndUpdate(
      mongoose.Types.ObjectId(instructorId),
      { Password }
    );
    res.json({ status: "OK" });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const setrate = async (req, res) => {
  const instructorId = req.params.id;
  const { Rate1 } = req.body;

  try {
    const user = await instructor.findById(instructorId);

    const x = user.NoOfPeople + 1;
    const result = (user.Rate * user.NoOfPeople + Rate1) / x;

    const y = await instructor.findByIdAndUpdate(
      mongoose.Types.ObjectId(instructorId),
      { x }
    );

    const c = await instructor.findByIdAndUpdate(
      mongoose.Types.ObjectId(instructorId),
      { result }
    );
    res.json({ status: "OK" });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

// const setrate= async (req,res)=>{
//   const instructorId = req.params.id;
//   const { Rate } = req.body ;

//   try {
//     const c = await instructor.findByIdAndUpdate(
//       mongoose.Types.ObjectId(instructorId),
//       { Rate }
//     );
//     res.json({ status: "OK" });
//   } catch (err) {
//     res.json({ status: "error", error: err.message });
//   }
// }

const setcourcerate = async (req, res) => {
  const courceId = req.params.id;
  const { Rate1 } = req.body;

  try {
    const user = await course.findById({ courceId });

    const x = user.NoOfPeople + 1;
    const result =
      (parseInt(user.Rating) * user.NoOfPeople + parseInt(Rate1)) / x;

    const y = await course.findByIdAndUpdate(
      mongoose.Types.ObjectId(courceId),
      { x }
    );

    const c = await course.findByIdAndUpdate(
      mongoose.Types.ObjectId(courceId),
      { result }
    );
    res.json({ status: "OK" });
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
}

const receiveemail = async (req, res) => {
  const { UserName } = req.body;
  var x;
  try {
    const user = await individualTrainee.findOne({ UserName: UserName });

    const mail = user.Email;
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
      text: "change password",
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

// handlePassword()
// {
//   <label>{textbox1.value}</label>
// }

///////////////////////////////////////////
/*const viewExercise = async (req,res) => {
  const course_title = req.params.key;
  try{
    const course = await course.findOne({ Title: course_title });
    const exercise = course.Exercise
    res.json(course)

    console.log(course)
  }catch(err){
    res.json({ status: "error", error: err.message });
  }
}*/

const viewExam = async (req, res) => {
  let exams;
  try {
    exams = await course.find({ _id: req.params.id });
  } catch {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
  return res.status(200).json(exams);
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

const payonline=async (req,res)=>{
  const In_Id=req.params.id1
  const cource_id=req.params.id2
  // const Name=req.body
  // const Number=req.body
  // const curency=req.body
  try{
    console.log("a")
  const user=await course.findById(cource_id)
  const x=user.registerdTrainees
  const mooney_id=mongoose.Types.ObjectId(user.instructor)
  const ins= await instructor.findById(mooney_id)
  const rese=(user.Price)+(ins.money)
  const t=await individualTrainee.findById(In_Id)
  const register=t.registerdCourse
  x.push(In_Id)
  register.push(cource_id)
  console.log("a")
  const update=await course.findByIdAndUpdate((mongoose.Types.ObjectId(cource_id)),{registerdTrainees:x})
  const mupdate=await instructor.findByIdAndUpdate((mongoose.Types.ObjectId(mooney_id)),{money:rese}) 
  const ind=await individualTrainee.findByIdAndUpdate((mongoose.Types.ObjectId(In_Id)),{registerdCourse:register})
  res.send('ok')
}catch{
    res.send('error')
  }

}

const reqrefund=async (req,res)=>{
const in_id=req.params.id1
const course_id=req.params.id2
const user=await individualTrainee.findById(in_id)
const cou=await course.findById(course_id)
const x=cou.reqrefundtrainee
if(user.attendance<50){
 x.push(in_id)
 const z=await course.findByIdAndUpdate((mongoose.Types.ObjectId(course_id)),{reqrefundtrainee:x})
 res.send('ok')
}
else{
  console.log('no');
  res.send('no')
}
}

const viewwallet =async (req,res)=>{
  const in_id=req.params.id
  const y = []
  try{
  const user =await individualTrainee.findById(in_id)
  const x=user.wallet
  y.push(x)
  
  res.status(200).send({y})
  }catch{
    res.send("error")
  }

}

const addnote = async (req,res)=>{
  const in_id=req.params.id
  try{
  const user=await individualTrainee.findById(in_id)
  const x=user.notes
  const z=await individualTrainee.findByIdAndUpdate((mongoose.Types.ObjectId(in_id)),{notes:x})
  
  res.status(200).send({x}) 
}catch{
    res.send("error");
  }
  
}


const writenotes= async (req,res)=>{
  const in_id=req.params.id1
  const course_id=req.params.id2
  const s=req.body
  try{
  const user =await individualTrainee.findById(in_id)
  const len=user.registerdCourse.length
  const z=user.notes
  for(let i=0;i<len;i++){
    
    if (user.registerdCourse[i]==course_id){

        z[i]=s.Note
        const a=await individualTrainee.findByIdAndUpdate((mongoose.Types.ObjectId(in_id)),{notes:z}) 
      }
  }
res.status(200).send("ok")
}
catch(err){
  res.json({ status: "error", error: err.message });
}
}



const viewregisteredcourses=async (req,res)=>{
  const in_id=req.params.id
  try{
  const user=await individualTrainee.findById(in_id)
  const registered=user.registerdCourse
  const titles=[];
  for(let i=0;i<registered.length;i++){
    const t=registered[i]
    const courses =await course.findById(mongoose.Types.ObjectId(t))
    titles.push(courses.Title)
  }
  res.status(200).send({titles})
}catch{
res.send("error")
}
}

const maxAge = 3 * 24 * 60 * 60;
const createToken = (UserName) => {
  return jwt.sign({ UserName }, "supersecret", {
    expiresIn: maxAge,
  });
};

//signup function
const signUp = async (req, res) => {
  const { UserName, Password, Name, Gender } = req.body;
  try {
    if (!UserName || !Password) {
      throw new Error("Please enter all fields");
    }
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(Password, salt);
    const user = await individualTrainee.create({
      UserName: UserName,
      Password: hashedPassword,
      Name: Name,
      Gender: Gender,
    });
    const token = createToken(individualTrainee.UserName);

    res.cookie("jwt", token, { httpOnly: true, maxAge: maxAge * 1000 });
    res.status(200).json({ user, token });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const report =async (req,res)=>{
  const cor_id=req.params.id1
  const course_id=req.params.id2
  const body=req.body
  try{
  const user=await individualTrainee.findById(cor_id)
  const reporttypes=user.reporttype
  const register =user.registerdCourse
  const resl = user.status
  const cou=await course.findById(course_id)
  const add=cou.IndReport
  add.push(cor_id)
  const update=await course.findByIdAndUpdate((mongoose.Types.ObjectId(course_id)),{IndReport:add})
  console.log("a")
  for(let i=0;i<register.length;i++){
    console.log("b")
    if(register[i].equals(course_id)){
      console.log("c")
      console.log(register[i])
      reporttypes[i]=body.body
      resl[i]="unseen"
      console.log(reporttypes[i])
      const z=await individualTrainee.findByIdAndUpdate((mongoose.Types.ObjectId(cor_id)),{reporttype:reporttypes})
      const upstatus=await individualTrainee.findByIdAndUpdate((mongoose.Types.ObjectId(cor_id)),{status:resl})
    }
  }
  res.status(200).send("ok")
}catch (err) {
  res.json({ status: "error", error: err.message });
}
}

const getStatus = async (req, res) => {
  const ind_id=req.params.id1
  const course_id=req.params.id2
  try{
  const user=await individualTrainee.findById(ind_id)
  for(let i=0; i<user.registerdCourse.length; i++) {
    if(user.registerdCourse[i].equals(course_id)){
      res.status(200).send(user.status[i])
      break;
    }

  }
  }catch(e){
    res.status(400).json({ error: e.message })
}
}

const seelist=async (req,res)=>{
  const Cor_id=req.params.id
  const cou=[]
  try{
  const c=await individualTrainee.findById(Cor_id)
  const register=c.registerdCourse
  for(let i=0;i<register.length;i++){
    const z=await course.findById(register[i])
    cou.push(z)
  }
  res.status(200).send(cou)
  }catch{
  res.send("error")
  }
  }

  const seeallproblem=async (req,res)=>{
    const Ind_id=req.params.id
    try{
      const user=await individualTrainee.findById(Ind_id)
      // const x=user.reporttype
      // const y=user.status
      res.status(200).send(user)
    }catch (err) {
      res.json({ status: "error", error: err.message });
    }
  }

  const viewreporttype=async (req,res)=>{
    const Ind_id=req.params.id1
 const cource_id=req.params.id2
 const y=[]
 const z=[]
 try{
  const user=await individualTrainee.findById(mongoose.Types.ObjectId(Ind_id))
  const register=user.registerdCourse
  const x=user.status
  const a= user.reporttype
  for(let i=0;i<register.length;i++){
    if(register[i].equals(mongoose.Types.ObjectId(cource_id))){
      y.push(x[i])
      z.push(a[i])
    }
  }
  res.status(200).send({z,y})
 }catch (err) {
  res.json({ status: "error", error: err.message });
}
  }
  const viewstaustype1 = async (req,res)=>{
    const Ind_id=req.params.id1
    const cource_id=req.params.id2
    const y=[]
    try{
     const user=await individualTrainee.findById(mongoose.Types.ObjectId(Ind_id))
     const register=user.registerdCourse
     const x=user.status
     for(let i=0;i<register.length;i++){
       if(register[i].equals(mongoose.Types.ObjectId(cource_id))){
         y.push(x[i])
       }
     }
     res.status(200).send(y)
    }catch (err) {
     res.json({ status: "error", error: err.message });
   }
   }


   const f = async (req, res) => {
    const cor_id = req.params.id
    try {
      const user = await individualTrainee.findById(mongoose.Types.ObjectId(cor_id));
  
      const mail = user.Email;
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
        text: "Congratulation! You have successfully completed the course",
        attachments: [
          {   // utf-8 string as an attachment
              filename: 'Doc2.pdf',
              path: 'C://Users/andre/OneDrive/Desktop/diego2/backend/Doc2.pdf'
          }],
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


  const getuser=async (req,res)=>{
    const doc = await PDFDocument.create()
    const cor_id=req.params.id1
    const cource_id=req.params.id2
    const user=await individualTrainee.findById(cor_id)
    console.log(user)
    const n=user.notes
    const register=user.registerdCourse
    let y= ""
    for(let i=0;i<register.length;i++){
      if(register[i].equals(mongoose.Types.ObjectId(cource_id))){
        y=n[i]
        console.log(y)
      }
  }
  
  
    //const timesRomanFont = await doc.embedFont(StandardFonts)
  
    const page = doc.addPage()
    page.drawText(y)
  
    fs.writeFileSync("./output.pdf", await doc.save())
    res.send("ok")
  }

  const getexc=async(req,res)=>{
    const cource_id=req.params.id
    try{
      const user=await course.findById(mongoose.Types.ObjectId(cource_id))
      const x=user.Exam.Questions
      res.send(x)
    }catch{
      res.send("error")
    }
  }

module.exports = {
  viewCourses,
  searchCourse,
  filterCourse,
  filterCourseprice,
  changepassword,
  setrate,
  setcourcerate,
  receiveemail,
  viewExam,
  //viewSpecificCourse

  FindCourseById,
                  mostview,
                  payonline,
                  reqrefund,
                  viewwallet,
                  addnote,
                  writenotes,
                  viewregisteredcourses,
  signUp,
  report,
  
  getStatus,
  seelist,
  seeallproblem,
  viewreporttype,
  viewstaustype1,

  f,
  getuser,
  getexc,
};
