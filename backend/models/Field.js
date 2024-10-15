const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true, // Corrected typo: 'require' to 'required'
    trim: true,
  },

  // Inside fields, there are multiple subtopics
  subtopics: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'SubTopic', // Corrected subtopic array to refer directly to SubTopic
    }
  ]
});

module.exports = mongoose.model("Field", fieldSchema);
