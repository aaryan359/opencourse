// models/Interview.js
const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
    companyName: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true
    },
    interviewType: {
        type: String,
        required: true,
         // restrict the values to these options
        enum: ['fresher', 'experienced', 'non-tech'] 
        
    },
    field: {
        type: String,
        required: true
    },
    questions: {
        type: String,
        required: true
    },
    answers: {
        type: String,
        required: true
    },
    additionalNotes: {
        type: String,
        default: '' 
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Interview = mongoose.model('Interview', interviewSchema);

module.exports = Interview;
