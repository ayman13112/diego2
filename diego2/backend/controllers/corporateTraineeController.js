
const corporateTrainee = require("../models/corporateTrainee");
const mongoose = require("mongoose");
const course = require("../models/course");
const instructor = require("../models/instructor");
const administrator = require("../models/administrator");
const { updateOne } = require("../models/instructor");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

//var pdf = require("pdf-creator-node");
var fs = require("fs");

const {PDFDocument, StandardFonts} = require('pdf-lib');
// Read HTML Template
var html = fs.readFileSync("template.html", "utf8");

const nodemailer = require("nodemailer");

//var pdf = require("pdf-creator-node");
var fs = require("fs");
const { findById } = require("../models/corporateTrainee");
const { findByIdAndUpdate } = require("../models/individualTrainee");

//var html = fs.readFileSync("templete.html", "utf8");

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

const changepassword = async (req, res) => {
  const instructorId = req.params.id;
  const { Password } = req.body;
  try {
    const c = await corporateTrainee.findByIdAndUpdate(
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
  try {
    const user = await corporateTrainee.findOne({ UserName: UserName });

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

// const makefile=async (req,res)=>{
//   const data=req.params.id
//   const user =await corporateTrainee.findById(data)
//   const name=user.UserName
//   const mail =user.Email
//   var document = {
//     html: html,
//     data: {
//       name: name,
//     },
//     path: "./output.pdf",
//     type: "",
//   };
//   var options = {
//     format: "A3",
//     orientation: "portrait",
//     border: "10mm",
//     header: {
//         height: "45mm",
//         contents: '<div style="text-align: center;">Author: Shyam Hajare</div>'
//     },
//     footer: {
//         height: "28mm",
//         contents: {
//             first: 'Cover page',
//             2: 'Second page', // Any page number is working. 1-based index
//             default: '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
//             last: 'Last Page'
//         }
//     }
// };

// const makefile = async (req, res) => {
//   const data = req.params.id;
//   const user = await corporateTrainee.findById(data);
//   const name = user.UserName;
//   const mail = user.Email;
//   var document = {
//     html: html,
//     data: {
//       name: name,
//     },
//     path: "./output.pdf",
//     type: "",
//   };
//   var options = {
//     format: "A3",
//     orientation: "portrait",
//     border: "10mm",
//     header: {
//       height: "45mm",
//       contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
//     },
//     footer: {
//       height: "28mm",
//       contents: {
//         first: "Cover page",
//         2: "Second page", // Any page number is working. 1-based index
//         default:
//           '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
//         last: "Last Page",
//       },
//     },
//   };
//   pdf
//     .create(document, options)
//     .down.then((res) => {
//       console.log(res);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

const f = async (req, res) => {
  const cor_id = req.params.id
  try {
    const user = await corporateTrainee.findById(mongoose.Types.ObjectId(cor_id));

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

const sendreq = async (req, res) => {
  const cor_id = req.params.id1;
  const course_id = req.params.id2;
  try {
    const cou = await course.findById(course_id);
    const x = cou.reqcortrainee;
    x.push(cor_id);
    const y = await course.findByIdAndUpdate(
      mongoose.Types.ObjectId(course_id),
      { reqcortrainee: x }
    );
    res.send("ok");
  } catch {
    res.send("error");
  }
};

const writenotes = async (req, res) => {
  const cor_id = req.params.id1;
  const course_id = req.params.id2;
  const s = req.body;
  try {
    const user = await corporateTrainee.findById(cor_id);
    const len = user.registerdCourse.length;
    const z = user.notes;
    for (let i = 0; i < len; i++) {
      if (user.registerdCourse[i] == course_id) {
        z[i] = s.Note;
        const a = await corporateTrainee.findByIdAndUpdate(
          mongoose.Types.ObjectId(cor_id),
          { notes: z }
        );
      }
    }
    res.status(200).send("ok");
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const viewregisteredcourses = async (req, res) => {
  const in_id = req.params.id;
  try {
    const user = await corporateTrainee.findById(in_id);
    const registered = user.registerdCourse;
    const titles = [];
    for (let i = 0; i < registered.length; i++) {
      const t = registered[i];
      const courses = await course.findById(mongoose.Types.ObjectId(t));
      titles.push(courses.Title);
    }
    res.status(200).send({ titles });
  } catch {
    res.send("error");
  }
};

const report =async (req,res)=>{
  const cor_id=req.params.id1
  const course_id=req.params.id2
  const body=req.body
  try{
  const user=await corporateTrainee.findById(cor_id)
  const reporttypes=user.reporttype
  const register =user.registerdCourse
  const resl = user.status
  const cou=await course.findById(course_id)
  const add=cou.CorReport
  add.push(cor_id)
  const update=await course.findByIdAndUpdate((mongoose.Types.ObjectId(course_id)),{CorReport:add})
  console.log("a")
  for(let i=0;i<register.length;i++){
    console.log("b")
    if(register[i].equals(course_id)){
      console.log("c")
      console.log(register[i])
      reporttypes[i]=body.body
      resl[i]="unseen"
      console.log(reporttypes[i])
      const z=await corporateTrainee.findByIdAndUpdate((mongoose.Types.ObjectId(cor_id)),{reporttype:reporttypes})
    
      const upstatus=await corporateTrainee.findByIdAndUpdate((mongoose.Types.ObjectId(cor_id)),{status:resl})
    }
  }
  res.status(200).send("ok")
}catch{
  res.send("error")
}
}

const getStatus = async (req, res) => {
  const ind_id=req.params.id1
  const course_id=req.params.id2
  try{
  const user=await corporateTrainee.findById(ind_id)
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
  const c=await corporateTrainee.findById(Cor_id)
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


  // const makefile = async (req, res) => {
  //   const cor_id=req.params.id1
  //   const cource_id=req.params.id2
  //   const user = await corporateTrainee.findById(cor_id);
  //   const n=user.notes
  //   const register=user.registerdCourse
  //   y=[]
  //   for(let i=0;i<register.length;i++){
  //     if(register[i].equals(mongoose.Types.ObjectId(cource_id))){
  //       y.push(n[i])
  //     }
  //   }
  //   var document = {
  //     //data: 
  //     html: html,
  //     content:{
  //       y
  //     },
  //     path: "C://Users/andre/OneDrive/Desktop/diego2/backend/output.pdf",
  //     type: "",
  //   };
  //   var options = {
  //     format: "A3",
  //     orientation: "portrait",
  //     border: "10mm",
  //     header: {
  //       height: "45mm",
  //       contents: '<div style="text-align: center;">Author: Shyam Hajare</div>',
  //     },
  //     footer: {
  //       height: "28mm",
  //       contents: {
  //         first: "Cover page",
  //         2: "Second page", // Any page number is working. 1-based index
  //         default:
  //           '<span style="color: #444;">{{page}}</span>/<span>{{pages}}</span>', // fallback value
  //         last: "Last Page",
  //       },
  //     },
  //   };
  //   pdf
  //     .create(document, options)
  //     .down.then((res) => {
  //       console.log(res);
  //     })
  //     .catch((error) => {
  //       console.error(error);
  //     });
  // };

  const makefile = async (req, res) => {
    const cor_id=req.params.id
    const cource_id=req.params.id2
    const user = await corporateTrainee.findById(cor_id);
    console.log(user.notes)
    const n=user.notes
    const register=user.registerdCourse
    y=[]
    for(let i=0;i<register.length;i++){
      if(register[i].equals(mongoose.Types.ObjectId(cource_id))){
        y.push(n[i])
      }
  }
    const doc = await PDFDocument.create()

    const timesRomanFont = await doc.embedFont(StandardFonts)

    const page = doc.addPage()
    page.drawText(y,{
      font:timesRomanFont,
      size:20,
    })

    fs.writeFileSync("./output.pdf", await doc.save())
}

const getuser=async (req,res)=>{
  const doc = await PDFDocument.create()
  const cor_id=req.params.id1
  const cource_id=req.params.id2
  const user=await corporateTrainee.findById(cor_id)
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


const viewreporttype=async (req,res)=>{
  const Ind_id=req.params.id1
const cource_id=req.params.id2
const y=[]
const z=[]
try{
const user=await corporateTrainee.findById(mongoose.Types.ObjectId(Ind_id))
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

module.exports = {
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
  report,
  getStatus,
  seelist,
  getuser,
  viewreporttype,
};
