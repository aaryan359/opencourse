const mongoose = require("mongoose");

const nontechfieldSchema = new mongoose.Schema({

  fieldname: {

    type: String,
    required: true, 
    trim: true,
  },
  branchname: {
    type: String,
    required: true,
    trim: true,
  },
  subtopicname: {
    type: String,
    required: true,
    trim: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Reference to the user who uploaded the video
    
  },
  nonTechvideo:[
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'NonTechVideo', 
    }
  ] ,
  qaPairs: [
    {
      question: {
        type: String,
        required: true, // Ensure question is provided
        trim: true,
      },
      answer: {
        type: String,
        required: true, // Ensure answer is provided
        trim: true,
      },
    },
  ],
});

const NonTechField = mongoose.model("NonTechField", nontechfieldSchema);

module.exports = NonTechField;