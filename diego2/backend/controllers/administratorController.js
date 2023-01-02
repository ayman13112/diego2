const administrator = require("../models/administrator");

const instructor = require("../models/instructor");

const corporateTrainee = require("../models/corporateTrainee");

const individualTrainee = require("../models/individualTrainee");

const Course = require("../models/course");
const { findOne } = require("../models/administrator");
const { default: mongoose } = require("mongoose");
const { findByIdAndUpdate } = require("../models/individualTrainee");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const createAdministrator = async (req, res) => {
  const { UserName, Password } = req.body;
  try {
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(Password, salt);
    const user = await administrator.create({
      UserName: UserName,
      Password: hashedPassword,
    });
    res.json({ status: "OK" });
  } catch (err) {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
};

const createInstructor = async (req, res) => {
  const { UserName, Password } = req.body;
  try {
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(Password, salt);
    const user = await instructor.create({
      UserName: UserName,
      Password: hashedPassword,
    });
    res.json({ status: "OK" });
  } catch (err) {
    return res.send(err);
  }
};

const viewInstructor = async (req, res) => {
  let courses;
  try {
    courses = await instructor.find({});
  } catch {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
  return res.status(200).json(courses);
};

const viewAdmin = async (req, res) => {
  let courses;
  try {
    courses = await administrator.find({});
  } catch {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
  return res.status(200).json(courses);
};

const createCorporateTrainee = async (req, res) => {
  const { UserName, Password } = req.body;
  try {
    const salt = await bcrypt.genSalt(5);
    const hashedPassword = await bcrypt.hash(Password, salt);
    const user = await corporateTrainee.create({
      UserName: UserName,
      Password: hashedPassword,
    });
    res.json({ status: "OK" });
  } catch (err) {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
};

const createindividualTrainee = async (req, res) => {
  const { UserName } = req.body;
  try {
    const admin = await individualTrainee.create({
      UserName,
      // Password,
      // Email,
    });
    res.json({ status: "OK" });
  } catch (err) {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
};

const setpromotion = async (req, res) => {
  const cource_id = req.params.id;
  const Price1 = req.body;
  try {
    console.log(Price1)
    const user = await Course.findById(cource_id);
    console.log(user);
    const res1 = user.Price - (user.Price * (Price1.Price/100));
    const y = await Course.findByIdAndUpdate(
      mongoose.Types.ObjectId(cource_id),
      { Price: res1 }
    );

    res.status(200).send( "OK" );
  } catch (err) {
    res.json({ status: "error", error: err.message });
  }
};

const setallpromotion= async (req,res)=>{
  const promotion=req.body
  try{
  const z=await Course.find({})
  for(let i=0;i<z.length;i++){
    const a=z[i].Price
    const x=a-(a*(promotion.promotion/100))
    const update=await Course.findByIdAndUpdate((mongoose.Types.ObjectId(z[i]._id)),{Price:x})
  }
  res.status(200).send("ok")
}catch{
  res.send("error")
}
}

// const viewreqtrainees = async (req, res) => {
//   const cource_id = req.params.id;
//   try {
//     const user = await Course.findById(cource_id);
//     const x = user.reqcortrainee;
//     res.status(200).send({ x });

//   } catch {
//     res.send("error");
//   }
// };

const viewreqtrainees = async (req, res) => {
  const cource_id = req.params.id;
  try {
    const user = await Course.findById(cource_id);
    const x = user.reqcortrainee;
    const y=[];
    for(let i=0;i<x.length;i++){
      const a=mongoose.Types.ObjectId(x[i])
      const cor=await corporateTrainee.findById(a)
      y.push(cor.UserName)
    }
    res.status(200).send({ x,y });
  } catch {
    res.send("error");
  }
};
const acceptedtrainee = async (req, res) => {
  const cource_id = req.params.id;
  try {
    const user = await Course.findById(cource_id);
    const x = user.reqcortrainee;
    const y = user.cortrainee;

    while (x.length != 0) {
      const pop = x.pop();
      const cor = await corporateTrainee.findById(pop);
      const register = cor.registerdCourse;
      register.push(cource_id);
      y.push(pop);
      const a = await corporateTrainee.findByIdAndUpdate(
        mongoose.Types.ObjectId(pop),
        { registerdCourse: register }
      );
      const z = await Course.findByIdAndUpdate(
        mongoose.Types.ObjectId(cource_id),
        { cortrainee: y, reqcortrainee: x }
      );
    }

    res.send("ok");
  } catch {
    res.send("error");
  }
};

const acceptedtraineeone = async (req, res) => {
  const cor_id = req.params.id1
  const cource_id = req.params.id2;
  try {
    const user = await Course.findById(mongoose.Types.ObjectId(cource_id));
    const x = user.reqcortrainee;
    const y = user.cortrainee;

    let del =[]
    for(let i=0; i<x.length; i++)
    {
      if(x[i].equals(mongoose.Types.ObjectId(cor_id)))
      {
        del = x.slice(i,i)
        const update = Course.findByIdAndUpdate(mongoose.Types.ObjectId(cource_id),{reqcortrainee:del})
        console.log(user.reqcortrainee)
        y.push(cor_id)
        const z = await Course.findByIdAndUpdate(mongoose.Types.ObjectId(cource_id),{cortrainee:y})
      }
    }
    const cor = await corporateTrainee.findById(mongoose.Types.ObjectId(cor_id))
    const register = cor.registerdCourse;
    register.push(cource_id);
    const a = await corporateTrainee.findByIdAndUpdate(mongoose.Types.ObjectId(cor_id),{registerdCourse:register})

    res.send("ok");
  } catch {
    res.send("error");
  }
};

// const viewrefund=async (req,res)=>{
//   const cource_id =req.params.id
//   try{
//     const y=[];
//     const user = await Course.findById(cource_id)
//     const x=user.reqrefundtrainee
//     for(let i=0;i<x.length;i++){
//       const a=mongoose.Types.ObjectId(x[i])
//       const Ind=await individualTrainee.findById(a)
//       const z=Ind.UserName
//       y.push(z) 
//     }
//     res.status(200).send({x,y})
//   }catch{
//     res.send("error")
//   }
// }
const viewrefund=async (req,res)=>{
  const cource_id =req.params.id
  try{
    const y=[];
    const user = await Course.findById(cource_id)
    const x=user.reqrefundtrainee
    for(let i=0;i<x.length;i++){
      const a=mongoose.Types.ObjectId(x[i])
      const Ind=await individualTrainee.findById(a)
      const z=Ind.UserName
      y.push(Ind) 
    }
    res.status(200).send({y})
  }catch{
    res.send("error")
  }
}

// const acceptrefund = async (req, res) => {
//   const cource_id = req.params.id;
//   try {
//     const cou = await Course.findById(cource_id);

//     const x = cou.reqrefundtrainee;
//     while (x.length != 0) {
//       console.log("while");
//       const y = x.pop();
//       const user = await individualTrainee.findById(mongoose.Types.ObjectId(y));

//       const z = user.wallet;

//       const l = cou.Price * 0.5;
//       const a = z + l;

//       const couupdate = await Course.findByIdAndUpdate(
//         mongoose.Types.ObjectId(cource_id),
//         { reqrefundtrainee: x }
//       );
//       const walletupdate = await individualTrainee.findByIdAndUpdate(
//         mongoose.Types.ObjectId(y),
//         { wallet: a }
//       );
//     }
//     res.send("ok");
//   } catch {
//     res.send("error");
//   }
// };

// const acceptrefund = async (req, res) => {
//   const cource_id = req.params.id;
//   try {
//     const cou = await Course.findById(cource_id);

//     const x = cou.reqrefundtrainee;
//     const register=cou.registerdTrainees;
//     while (x.length != 0) {
//       console.log("while");
//       const y = x.pop();
//       const user = await individualTrainee.findById(mongoose.Types.ObjectId(y));

//       const z = user.wallet;

//       const l = cou.Price * 0.5;
//       const a = z + l;

//       const couupdate = await Course.findByIdAndUpdate(
//         mongoose.Types.ObjectId(cource_id),
//         { reqrefundtrainee: x }
//       );

//       const walletupdate = await individualTrainee.findByIdAndUpdate(
//         mongoose.Types.ObjectId(y),
//         { wallet: a }
//       );

//       for(let i=0;i<register.length;i++){
//         if(register[i]==mongoose.Types.ObjectId(y)){
//           const del=register.slice(i,i+1)
//           const regisupdate=await Course.findByIdAndUpdate(mongoose.Types.ObjectId(cource_id),{registerdTrainees:del})
//         }
//       }

//     }
//     res.send("ok");
//   } catch {
//     res.send("error");
//   }
// };


const acceptrefund = async (req, res) => {
  const cource_id = req.params.id;
  try {
    const cou = await Course.findById(cource_id);

    const x = cou.reqrefundtrainee;
    const register=cou.registerdTrainees;
    while (x.length != 0) {

      const y = x.pop();
      const user = await individualTrainee.findById(mongoose.Types.ObjectId(y));

      const z = user.wallet;

      const l = cou.Price * 0.5;
      const a = z + l;

      const couupdate = await Course.findByIdAndUpdate(
        mongoose.Types.ObjectId(cource_id),
        { reqrefundtrainee: x }
      );

      const walletupdate = await individualTrainee.findByIdAndUpdate(
        mongoose.Types.ObjectId(y),
        { wallet: a }
      );
    console.log("a")
      for(let i=0;i<register.length;i++){
        console.log("a")
        if(register[i].equals(mongoose.Types.ObjectId(y))){
          console.log("b")
          const del=register.splice(i,i)
          console.log("c")
          const regisupdate=await Course.findByIdAndUpdate(mongoose.Types.ObjectId(cource_id),{registerdTrainees:del})
        }
      }

    }
    res.send("ok");
  } catch {
    res.send("error");
  }
};

const acceptrefundone = async (req, res) => {
  const In_Id=req.params.id1
  const cource_id = req.params.id2;
  try {
    const cou = await Course.findById(cource_id);

    const x = cou.reqrefundtrainee;
    const register=cou.registerdTrainees;

    const g = await individualTrainee.findById(In_Id)
    const rcourse = g.registerdCourse
    for(let j=0;j<x.length;j++) {
     if(x[j].equals(mongoose.Types.ObjectId(In_Id))){
      console.log("a");
      const Id=mongoose.Types.ObjectId(x[j])
      const y = x.slice(j,j);
      const user = await individualTrainee.findById(mongoose.Types.ObjectId(Id));

      const z = user.wallet;

      const l = cou.Price * 0.5;
      const a = z + l;
      console.log("b");
      const couupdate = await Course.findByIdAndUpdate(
        mongoose.Types.ObjectId(cource_id),
        { reqrefundtrainee: y }
      );
        console.log("c")
      const walletupdate = await individualTrainee.findByIdAndUpdate(
        mongoose.Types.ObjectId(In_Id),
        { wallet: a }
      );
        console.log("d")
      for(let i=0;i<register.length;i++){

        if(register[i].equals(mongoose.Types.ObjectId(Id))){

          const del=register.splice(i,i)

          const regisupdate=await Course.findByIdAndUpdate(mongoose.Types.ObjectId(cource_id),{registerdTrainees:del})
        }

      }
      for(let k=0;k<rcourse.length;k++)
      {
        if(rcourse[k].equals(cource_id))
        {
          const del1=rcourse.splice(k,k)
          const rupdate=await individualTrainee.findByIdAndUpdate(mongoose.Types.ObjectId(Id),{registerdCourse:del1})
          console.log(del1)
          
        }
        
    }
    
     }

    }
    res.send("ok");
  }catch
  {
    res.send("error");
  }

  
};


const viewproblem = async (req, res) => {
  const cource_id = req.params.id;
  try {
    const user = await Course.findById(cource_id);
    res.status(200).send(user.report);
  } catch (err) {
    res.send(err);
  }
};

// const resolved = async (req, res) => {
//   const cource_id = req.params.id;
//   try {
//     const user = await Course.findById(cource_id);
//     const r = user.report;

//     while (r.length != 0) {
//       r.pop();
//     }
//     const z = await Course.findByIdAndUpdate(
//       mongoose.Types.ObjectId(cource_id),
//       { r: report }
//     );
//     res.send("ok");
//   } catch {
//     res.send("error");
//   }
// };

const resolved= async (req,res)=>{
  const Ind_id=req.params.id1
  const cource_id =req.params.id2
    try{
    const user =await individualTrainee.findById(Ind_id)
    const r=user.reporttype
    const resol=user.status
    const register=user.registerdCourse
    const a=[]
    console.log("a")
    for(let i=0;i<register.length;i++){
      console.log("b")
          if(register[i].equals(mongoose.Types.ObjectId(cource_id))){
            console.log("c")
            a[i]="Resolved"
            resol[i]= a[i]
          }
    }
    const z=await individualTrainee.findByIdAndUpdate((mongoose.Types.ObjectId(Ind_id)),{status:resol})
    res.send("ok")
  }catch{
    res.send("error")
  }
}

const corresolved= async (req,res)=>{
  const Ind_id=req.params.id1
  const cource_id =req.params.id2
    try{
    const user =await corporateTrainee.findById(Ind_id)
    const r=user.reporttype
    const resol=user.status
    const register=user.registerdCourse
    const a=[]
    console.log("a")
    for(let i=0;i<register.length;i++){
      console.log("b")
          if(register[i].equals(mongoose.Types.ObjectId(cource_id))){
            console.log("c")
            a[i]="Resolved"
            resol[i]= a[i]
          }
    }
    const z=await corporateTrainee.findByIdAndUpdate((mongoose.Types.ObjectId(Ind_id)),{status:resol})
    res.send("ok")
  }catch{
    res.send("error")
  }
}

const pending= async (req,res)=>{
  const Ind_id=req.params.id1
  const cource_id =req.params.id2
    try{
    const user =await individualTrainee.findById(Ind_id)
    const r=user.reporttype
    const resol=user.status
    const register=user.registerdCourse
    const a=[]
    let exist = false
    console.log("a")
    for(let i=0;i<register.length;i++){
      console.log("b")
          if(register[i].equals(mongoose.Types.ObjectId(cource_id))){        
            if(resol[i]!="Resolved")
              {
              //console.log("c")
              exist = true
              a[i]="Pending"
              resol[i]= a[i]
              const z=await individualTrainee.findByIdAndUpdate((mongoose.Types.ObjectId(Ind_id)),{status:resol})
              }       
          }
    }
    if(exist==true)
    {
        res.send("ok")
    }
    else
    {
      res.send("already resolved")
    }
  }catch{
    res.send("error")
  }
}

const corpending= async (req,res)=>{
  const Ind_id=req.params.id1
  const cource_id =req.params.id2
    try{
    const user =await corporateTrainee.findById(Ind_id)
    const r=user.reporttype
    const resol=user.status
    const register=user.registerdCourse
    const a=[]
    let exist = false
    console.log("a")
    for(let i=0;i<register.length;i++){
      console.log("b")
          if(register[i].equals(mongoose.Types.ObjectId(cource_id))){        
            if(resol[i]!="Resolved")
              {
              console.log("c")
              exist = true
              console.log("f")
              a[i]="Pending"
              console.log("e")
              resol[i]= a[i]
              const z=await corporateTrainee.findByIdAndUpdate((mongoose.Types.ObjectId(Ind_id)),{status:resol})
              console.log("d")
              }       
          }
    }
    if(exist==true)
    {
        res.send("ok")
    }
    else
    {
      res.send("already resolved")
    }
  }catch (err) {
    res.json({ status: "error", error: err.message });
  }
}


const viewCorpet = async (req, res) => {
  let courses;
  try {
    courses = await corporateTrainee.find({});
  } catch {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
  return res.status(200).json(courses);
};

const viewInd = async (req, res) => {
  let courses;
  try {
    courses = await individualTrainee.find({});
  } catch {
    return res.status(404).json({
      message: "couldnot find",
    });
  }
  return res.status(200).json(courses);
};

const Indviewproblem= async (req,res)=>{
  const cource_id=req.params.id
 try{
  const user=await Course.findById(cource_id)
  const Id=user.IndReport
  const y=[]
  const x=[]
  const Inds =[]
  for(let i=0;i<Id.length;i++){
    const Ind=await individualTrainee.findById(Id[i])
    const z=Ind.UserName
    y.push(z)
    const register=Ind.registerdCourse
    const t=Ind.reporttype
    for(let j=0;j<register.length;j++){
      if(register[j].equals(cource_id)){
        x.push(t[j])
      }
    }
    Inds.push(Ind)

  }
  res.status(200).send({Inds})
 }catch(err){
  res.send(err)
 }
}




const Corviewproblem= async (req,res)=>{
  const cource_id=req.params.id
 try{
  const user=await Course.findById(cource_id)
  const Id=user.CorReport
  const y=[]
  const x=[]
  const Corps =[]
  for(let i=0;i<Id.length;i++){
    const Ind=await corporateTrainee.findById(Id[i])
    const z=Ind.UserName
    y.push(z)
    const register=Ind.registerdCourse
    const t=Ind.reporttype
    for(let j=0;j<register.length;j++){
      if(register[j].equals(cource_id)){
        x.push(t[j])
      }
    }
    Corps.push(Ind)
  }
  res.status(200).send({Corps})
}catch(err){
 res.send(err)
}
}

const Indviewproblemtype=async (req,res)=>{
  const Ind_id=req.params.id1
  const cource_id=req.params.id2
  try{
    const user=await individualTrainee.findById(Ind_id)
    const r=user.registerdCourse
    const type=user.reporttype
    const z= []
    console.log("a")
    for(let i=0;i<r.length;i++){
      console.log("b")
      if(r[i].equals(mongoose.Types.ObjectId(cource_id))){
        console.log("c")
        z.push(type[i])
        console.log("d")
      }

    }
    res.status(200).send({z})
  }catch{
    res.send("error")
  }
}

const Corviewproblemtype=async (req,res)=>{
  const Ind_id=req.params.id1
  const cource_id=req.params.id2
  try{
    const user=await corporateTrainee.findById(Ind_id)
    const r=user.registerdCourse
    const type=user.reporttype
    const z= []
    console.log("a")
    for(let i=0;i<r.length;i++){
      console.log("b")
      if(r[i].equals(mongoose.Types.ObjectId(cource_id))){
        console.log("c")
        z.push(type[i])
        console.log("d")
      }

    }
    res.status(200).send({z})
  }catch{
    res.send("error")
  }
}

module.exports = {
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
  corresolved,
  pending,
  corpending,
  viewCorpet,
  viewInd,
  viewrefund,
  
  Indviewproblem,
  Corviewproblem,

  Indviewproblemtype,
  Corviewproblemtype,
};
