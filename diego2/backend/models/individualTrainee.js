const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const individualTraineeSchema = new Schema(
  {
    UserName: {
      type: String,
      required: true,
      unique: true,
    },
    // Password: {
    //   type: String,
    //   required: true,
    // },
    wallet: {
      type:Number,
      required:false,
      default:0
    },
    attendance:{
      type :Number,
      required:false,
      default:0
    },
    
    registerdCourse:[mongoose.Types.ObjectId],require:false,

    reporttype:[String],required:false,
    status:[String],required:false,

    notes:[String],require:false,
  //   Name: {
  //     type: String,
  //     required: true,
  //   },
  //   Email: {
  //     type: String,
  //     required: true,
  //   },
  },
  
  { timestamps: true }
);

//static method to login user
individualTraineeSchema.statics.login = async function (UserName, Password) {
  const user = await this.findOne({ UserName });
  if (user) {
    const auth = await bcrypt.compare(Password, user.Password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect username");
};

const individualTrainee = mongoose.model(
  "individualTrainee",
  individualTraineeSchema
);
module.exports = individualTrainee;
