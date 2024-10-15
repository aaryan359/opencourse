const mongoose = require("mongoose");

const subTopicSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  videos: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video' // Reference to the Video model
    }
  ]
});

module.exports = mongoose.model("SubTopic", subTopicSchema);
