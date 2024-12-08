  const Question  = require('../../models/InterviewSectionnmodels/InterviewQuestion');

const addQuestion = async (req, res) => {
    try {
      const question = await Question.create(req.body); // Use create to add the new question
      res.status(201).json({ message: 'Question added successfully', question });
    } catch (error) {
      res.status(400).json({ message: 'Error adding question', error });
    }
  };
  

  const getQuestions = async (req, res) => {
    
    try {
      const questions = await Question.find(); // Retrieve all questions from the database
      res.status(200).json(questions);
    } catch (error) {
      res.status(500).json({ message: 'Error retrieving questions', error });
    }

  };
  

  const incrementAskedTo = async (req, res) => {
    try {
      const question = await Question.findByIdAndUpdate(
        req.body.id,
        { $inc: { askedTo: 1 } }, // Increment the askedTo count by 1
        { new: true } // Return the updated document
      );
  
      if (!question) {
        return res.status(404).json({ message: 'Question not found' });
      }
  
      res.status(200).json({ message: 'Asked count incremented', question });
    } catch (error) {
      res.status(500).json({ message: 'Error incrementing asked count', error });
    }
  };


  module.exports = { addQuestion,incrementAskedTo,getQuestions };