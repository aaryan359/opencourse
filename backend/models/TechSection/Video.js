// models/User.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({

    title:{
      type: String,
      require:true,
      trim:true,
    },

    url:{
      type:String,
      require:true
    },

    description:{
        type: String,
        require:true,
        trim:true,
      },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the user who uploaded the video
        
      }
});

const Video = mongoose.model("Video", videoSchema);

module.exports = Video