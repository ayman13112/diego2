const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const courseSchema = new Schema(
  {
    Title: {
      type: String,
      required: true,
    },

    // Rating: {
    //   type: String,
    //   default: 0,
    //   min: 0,
    //   max: 5,
    // },

    // Subject: {
    //   type: String,
    //   required: true,
    // },

    // Video: {
    //   type: String,
    //   required: true,

    // },

    // Subtitle: [
    //   {
    //     Name: {
    //       type: String,
    //       required: true,
    //     },

    //     TotalHours: {
    //       type: Number,
    //       required: true,
    //     },

    //     Link: {
    //       type: String,
    //       required: true,
    //     },
    //   },
    // ],

    Price: {
      type: Number,
      required: true,
      min: 0,
    },
    // Discount: {
    //   DiscountRate: {
    //     type: Number,
    //   },

    //   DiscountDuration: {
    //     type: Number,
    //   },
    // },
    //   promotion:{
    //     type:Number
    //   },
      NoOfView:{
        type:Number,
        default:0, 
        req:false,
      },

    registerdTrainees:[mongoose.Types.ObjectId],require:false,

    cortrainee:[mongoose.Types.ObjectId],require:false,

    reqcortrainee:[mongoose.Types.ObjectId],required:false,
    
    reqrefundtrainee:[mongoose.Types.ObjectId],required:false,


    IndReport:[mongoose.Types.ObjectId],required:false,
    CorReport:[mongoose.Types.ObjectId],required:false,
    
    // attendance:{
    //   ref:'individualTrainee',
    //   type:Number,
    //   required:false,
    //   default:0,
    //   max:100
    // },


    Exam: {
      Title: {
        type: String,
        required: true,
      },

      Questions: [
        {
          QuestionText: {
            type: String,
            required: true,
          },

          Options: [
            {
              OptionText: {
                type: String,
                required: true,
              },
              IsCorrect: {
                type: Boolean,
                required: true,
                hidden: true,
              },
            },
          ],
        },
      ],
    },

    // TotalHours: {
    //   type: Number,
    //   required: true,
    //   min: 0,
    // },
    // Link: {
    //   type: String,
    //   required: true,
    // },

    instructor: {
      type: String,
      ref: "Instructor",
      required: true,
    },

    Excercise: [
      {
        //{
        ExcerciseNumber: {
          type: Number,
        },
        TotalGrade: {
          type: Number,
          required: true,
        },
        Questions: [
          {
            QuestionText: {
              type: String,
              required: true,
            },

            Options: [
              {
                OptionText: {
                  type: String,
                  required: true,
                },
                IsCorrect: {
                  type: Boolean,
                  required: true,
                  hidden: true,
                },
              },
            ],
          },
        ],
      },
    ],

    // ShortSummary: {
    //   type: String,
    //   maxlength: 25,
    // },
  },

  { timestamps: true }
);
const course = mongoose.model("course", courseSchema);
module.exports = course;
