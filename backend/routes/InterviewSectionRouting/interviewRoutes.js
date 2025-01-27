
const express = require('express');
const router = express.Router();
const { uploadInterview ,getInterviewQuestions } = require('../../controllers/InterviewSection/interviewQuestionController');


router.post('/upload', uploadInterview);
router.get('/getallinterview/:field',getInterviewQuestions);


module.exports = router;

