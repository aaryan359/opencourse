
const DailyGoal = require('../../models/InterviewSectionnmodels/DailyGoalschema');
const PracticeLog = require('../../models/InterviewSectionnmodels/Practicelog');
const Question = require('../../models/InterviewSectionnmodels/InterviewQuestion');


  // helper function to fetch question 
  const fetchQuestions = async (userId, goal, previousQuestionIds) => {
    const previousLogs = await PracticeLog.find({ user: userId }).select('questions');
    previousQuestionIds = previousLogs.flatMap(log => log.questions);
  
    const filterConditions = [];
    if (goal.filters.companyName) filterConditions.push({ companyName: goal.filters.companyName });
    if (goal.filters.skill) filterConditions.push({ skill: goal.filters.skill });
    if (goal.filters.Domain) filterConditions.push({ Domain: goal.filters.Domain });
    if (goal.filters.role) filterConditions.push({ role: goal.filters.role });
    if (goal.filters.questiontype) filterConditions.push({ questiontype: goal.filters.questiontype });
    if (goal.filters.ExperienceLevel) filterConditions.push({ ExperienceLevel: goal.filters.ExperienceLevel });
    if (goal.filters.difficulty) filterConditions.push({ difficulty: goal.filters.difficulty });
  
    return await Question.find({
      _id: { $nin: previousQuestionIds },
      ...(filterConditions.length > 0 ? { $or: filterConditions } : {}),
    }).limit(goal.questionsPerDay);
  };

  // api 

  const isgoalactive = async (req ,res)=>{
              
                   const {userId} =req.body;

                   try{
                         const existingGoal = await DailyGoal.findOne({ user: userId });
                            if(existingGoal){
                                return res.status(200).json({
                                         
                                    existingGoal
                                })
                            }

                            res.status(201).json({ message: 'Daily goal Not exist' });
                   }catch(error){
                               
                    res.status(500).json({ error: 'Error in checking  daily goal active or not.' });
                   }
  }

const setdailygoals =  async (req, res) => {
  const { userId, questionsPerDay, formData } = req.body;
            //  console.log("user is :",userId)
  try {
    const existingGoal = await DailyGoal.findOne({ user: userId });
    if (existingGoal) {
      return res.status(400).json({ message: 'Goal already exists. Reset or stop first.' });
    }
        //   console.log('before set goal')
    const newGoal = new DailyGoal({
      user: userId,
      questionsPerDay,
      filters:formData,
      active: true,
    });
    console.log('after set goal',newGoal)
    await newGoal.save();
    // console.log('after save goal')
    res.status(201).json({ message: 'Daily goal set successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'Error setting daily goal.' });
  }
};

const Stopdailygoals =  async (req, res) => {
    const { userId } = req.body;
  
    try {
      // Find the existing goal for the user
      const existingGoal = await DailyGoal.findOneAndDelete({ user: userId });
  
      if (!existingGoal) {
        return res.status(404).json({ message: 'No active goal found for this user.' });
      }
  
      
  
      res.status(200).json({ message: 'Daily goal stopped successfully.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Error stopping daily goal.' });
    }
  };



  const getdailyquestion = async (req, res) => {
    const { userId } = req.body;
  
    try {
      const goal = await DailyGoal.findOne({ user: userId, active: true });
      if (!goal) return res.status(404).json({ message: 'No active goal found.' });
  
      // Get current time and 6 AM time for today
      const now = new Date();
      const sixAmToday = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0);
  
      // Check if this is the first time fetching questions by seeing if `lastFetchedTime` is null
      const isFirstFetch = !goal.lastFetchedTime;
  
      if (isFirstFetch || now - goal.lastFetchedTime >= 24 * 60 * 60 * 1000) {
        // Update `lastFetchedTime` to 6 AM today and save it in the goal
        goal.lastFetchedTime = sixAmToday;
        await goal.save();
  
        // Fetch new questions
        const questions = await fetchQuestions(userId, goal);
        if (questions.length > 0) {
          // Save the fetched questions to the practice log
          const newLog = new PracticeLog({
            user: userId,
            questions: questions.map(q => q._id),
          });
          await newLog.save();
        }
  
        return res.json({ questions });
      } else {
        return res.json({ message: 'Less than 24 hours since last fetch.', questions: [] });
      }
    } catch (error) {
      res.status(500).json({ error: 'Error fetching daily questions.' });
    }
  };
  
  
  // Helper function to fetch questions based on user goal and previous logs
  
  

 const getpreviousquestion =  async (req, res) => {
    const { userId } = req.body;
  
    try {
      const logs = await PracticeLog.find({ user: userId }).populate('questions');
      const previousQuestions = logs.flatMap(log => log.questions);
  
      res.json({ previousQuestions });
    } catch (error) {
      res.status(500).json({ error: 'Error fetching previous questions.' });
    }
  };
  

module.exports = {setdailygoals,getdailyquestion , getpreviousquestion,Stopdailygoals,isgoalactive };

