// models/User.js
const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({
    title:{
      type: String,
      require:true,
      trim:true,
    },

    description:{
        type: String,
        require:true,
        trim:true,
      },
    
});

module.exports = mongoose.model("Video", videoSchema);
