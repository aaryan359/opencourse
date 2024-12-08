const mongoose = require('mongoose');

const practiceLogSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  questions: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Question',
  }],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('PracticeLog', practiceLogSchema);
