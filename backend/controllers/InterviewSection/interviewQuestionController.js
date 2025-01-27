// controllers/interviewController.js
const Interview = require('../../models/InterviewSectionnmodels/Interview');

// Controller to upload interview question
exports.uploadInterview = async (req, res) => {
    try {
        const { companyName, role, interviewType, field, questions, answers, additionalNotes } = req.body;

        // Validate request body
        if (!companyName || !role || !interviewType || !field || !questions || !answers) {
            return res.status(400).json({ error: 'All fields are required' });
        }

        // Create a new interview document
        const newInterview = new Interview({
            companyName,
            role,
            interviewType,
            field,// different schema to field schema i named Field1 to avoid conflict
            questions,
            answers,
            additionalNotes,
        });

        // Save the interview to the database
        const savedInterview = await newInterview.save();
        res.status(201).json({
            message: 'Interview experience uploaded successfully',
            interview: savedInterview,
        });
    } catch (error) {
        console.error('Error uploading interview experience:', error);
        res.status(500).json({ error: 'Server error. Please try again later.' });
    }
};

 

exports.getInterviewQuestions = async (req, res) => {
    try {
        const field = decodeURIComponent(req.params.field).trim();
        console.log("Decoded field:", field);

        // Case-insensitive search for the field
        const questions = await Interview.find({ field: new RegExp(`^${field}$`, "i") }); // Filter by field

        if (!questions || questions.length === 0) {
            return res.status(404).json({ message: 'No interview questions found for this field.' });
        }

        // Extract only the questions from the documents
        const extractedQuestions = questions.map(question => ({
            _id: question._id,
            text: question.questions, 
            company: question.companyName,
            showAnswer: false,
            answer: question.answers,
            rating: 0 // Default rating
        }));


        res.status(200).json(extractedQuestions);
    } catch (error) {
        console.error('Error while fetching data:', error);
        res.status(500).json({ error: "Server error. Please try again later." });
    }
};
