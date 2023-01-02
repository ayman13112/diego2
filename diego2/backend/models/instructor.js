const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const instructorSchema = new Schema(
  {
    UserName: {
      type: String,
      required: true,
      unique: true,
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
    // Rate: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    //   min: 0,
    //   max: 5,
    // },

    // Email: {
    //   type: String,
    //   required: true,
    // },

    // money:{
    //   type:Number,
    //   required:false,
    //   default:0
    // },

    // NoOfPeople: {
    //   type: Number,
    //   required: false,
    //   default: 0,
    // },

    // Biography: {
    //   type: String,
    //   required: true,
    // },
  },
  { timestamps: true }
);

const instructor = mongoose.model("instructor", instructorSchema);
module.exports = instructor;
