const express = require('express');



const{ addQuestion,getQuestions,incrementAskedTo} = require('../../controllers/InterviewSection/Interviewquestion');
const{ setdailygoals,getdailyquestion,getpreviousquestion,Stopdailygoals,isgoalactive } =  require('../../controllers/InterviewSection/Setdailygoals');


const router = express.Router();

router.post('/addQuestion', addQuestion);
router.get('/getQuestions', getQuestions);
router.post('/incrementAskedTo', incrementAskedTo);
router.post('/setdailygoal',setdailygoals);
router.post('/getdailyquestion',getdailyquestion);
router.post('/getpreviousquestion',getpreviousquestion);
router.post('/stopdailygoals',Stopdailygoals);
router.post('/isgoalactive',isgoalactive);


module.exports = router;