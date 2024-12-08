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
    ref: 'User', 
    
  },
  nonTechvideo:[
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'NonTechVideo', 
    }

  ] 
 

});

const NonTechField = mongoose.model("NonTechField", nontechfieldSchema);

module.exports = NonTechField;