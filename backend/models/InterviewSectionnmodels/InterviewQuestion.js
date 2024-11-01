const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  questions: { 
    type: String, 
    required: true 
  },
  answers: { 
    type: String ,
    required: true 
  },
  companyName: { 
    type: String,
    default:"unknown"
  },
  skill:{ 
    type: String, 
   
  }, // Example: ['JavaScript', 'Python']
  Domain:{ 
    type: String, 
    
  }, // Example: ['Web Development', 'AI/ML']
  role:{ 
    type: String, 
   
  }, // Example: ['Frontend Developer', 'Data Analyst']
  questiontype: { 
    type: String, 
    enum: ['hr', 'system design', 'case study', 'conceptual', 'behavioral'] 
  },
  ExperienceLevel: { 
    type: String, 
    enum: ['fresher', '1-5', '5+'] 
  },
  difficulty: { 
    type: String, 
    enum: ['easy', 'medium', 'hard'] 
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
