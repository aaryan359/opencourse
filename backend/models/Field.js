const mongoose = require("mongoose");

const fieldSchema = new mongoose.Schema({

  name: {

    type: String,
    required: true, 
    trim: true,
  },


  subtopic: [
    {
      type: mongoose.Schema.Types.ObjectId, 
      ref: 'SubTopic', 
    }
  ]
});

const Field = mongoose.model("Field", fieldSchema);

module.exports = Field;