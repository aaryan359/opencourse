// to store the fields models

const mongoose = require("mongoose");

const videoSchema = new mongoose.Schema({

    name:{
      type: String,
      require:true,
      trim:true,
    },

    // inside fields there are multiple topics

    subtopic:[
        {
            name:{
                type:String
            },
            videos:{
                type: Schema.Types.ObjectId, 
                ref: 'Video' // give refrence to video model
                },
        }
    ],
    
});

module.exports = mongoose.model("Video", videoSchema);
