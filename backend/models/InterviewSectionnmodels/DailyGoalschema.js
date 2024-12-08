
const mongoose = require('mongoose');

const dailyGoalSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true, // Ensure each user can have only one active goal
  },
  questionsPerDay: {
    type: Number,
    required: true, // Number of questions user wants to practice daily
  },
  filters: { 

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
   
  },
  ExperienceLevel: { 
    type: String, 
    
  },
  difficulty: { 
    type: String, 
   
  },

  },
  lastFetchedTime: { 
    type: Date, 
    default: null, // Track when the questions were last fetched
  },
  active: {
    type: Boolean,
    default: false, // Initially inactive until user starts it
  },
});

module.exports = mongoose.model('DailyGoal', dailyGoalSchema);
