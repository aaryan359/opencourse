const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  title: { 
    type: String, 
    required: true 
  },
  description: { 
    type: String 
  },
  company: { 
    type: String,
    default:"unknown"
  },
  skill:{ 
    type: String, 
    required: true 
  }, // Example: ['JavaScript', 'Python']
  industry:{ 
    type: String, 
    required: true 
  }, // Example: ['Web Development', 'AI/ML']
  jobRole:{ 
    type: String, 
    required: true 
  }, // Example: ['Frontend Developer', 'Data Analyst']
  questionType: { 
    type: String, 
    enum: ['HR', 'System Design', 'Case Study', 'Conceptual', 'Behavioral'] 
  },
  ExperienceLevel: { 
    type: String, 
    enum: ['Fresher', '1-5', '5+'] 
  },
  difficulty: { 
    type: String, 
    enum: ['Easy', 'Medium', 'Hard'] 
  },
  askedTo: { 
    type: Number, 
    default: 0 // Number of times this question has been reported in interviews
  },
  postedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' 
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model('Question', questionSchema);
