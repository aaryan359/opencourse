const mongoose = require("mongoose");

const subTopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video' 
  }]
});

const SubTopic = mongoose.model("SubTopic", subTopicSchema); 

module.exports = SubTopic;
