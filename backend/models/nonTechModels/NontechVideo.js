// models/User.js
const mongoose = require("mongoose");

const NonTechvideoSchema = new mongoose.Schema({

    title:{
      type: String,
      require:true,
      trim:true,
    },

    url:{
      type:String,
      require:true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        
      }
});

const NonTechVideo = mongoose.model("NonTechVideo", NonTechvideoSchema);

module.exports = NonTechVideo;