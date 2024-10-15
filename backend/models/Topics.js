const mongoose = require("mongoose");

const subTopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  videos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video' // Reference to the Video model
  }]
});

const SubTopic = mongoose.model("SubTopic", subTopicSchema); // Ensure "SubTopic" is registered

module.exports = SubTopic;
