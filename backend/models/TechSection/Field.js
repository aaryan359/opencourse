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
  ],
  userId: {
         type: mongoose.Schema.Types.ObjectId,
         ref: 'User', 
         
       }
});

const Field = mongoose.model("Field", fieldSchema);

module.exports = Field;