const mongoose = require("mongoose");


const nontechsubtopicschema = new mongoose.Schema({

  
  subtopicname: {
    type: String,
   
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

const NonTechFieldsub = mongoose.model("NonTechsubtopic", nontechsubtopicschema);

const nontechfieldSchema = new mongoose.Schema({

  fieldname: {

    type: String,
  
    trim: true,
  },
  branchname: {
    type: String,
   
    trim: true,
  },
  subtopic:[{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'NonTechsubtopic'
  }]
});



const NonTechField = mongoose.model("NonTechField", nontechfieldSchema);

module.exports = {NonTechField,NonTechFieldsub};