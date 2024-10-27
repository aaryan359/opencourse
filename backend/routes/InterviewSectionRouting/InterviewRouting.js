const express = require('express');


const { AddNonTechvideos } = require('../../controllers/NontechController/nontechcontrollers');
const{ addQuestion,getQuestions,incrementAskedTo} = require('../../controllers/InterviewSection/Interviewquestion');


const router = express.Router();

router.post('/addQuestion', addQuestion);
router.get('/getQuestions', getQuestions);
router.post('/incrementAskedTo', incrementAskedTo);


module.exports = router;