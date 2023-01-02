const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const corporateTraineeSchema = new Schema(
  {
    UserName: {
      type: String,
      required: true,
    },
    Password: {
      type: String,
      required: true,
    },
    // Name: {
    //   type: String,
    //   required: true,
    // },
    // Email: {
    //   type: String,
    //   required: true,
    // },
    registerdCourse: [mongoose.Types.ObjectId],
    require: false,
    notes: [String],
    require: false,

    reporttype:[String],required:false,
    status:[String],required:false,
  },
  { timestamps: true }
);

const corporateTrainee = mongoose.model(
  "corporateTrainee",
  corporateTraineeSchema
);
module.exports = corporateTrainee;
