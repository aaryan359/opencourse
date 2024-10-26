import React, { useState, useEffect } from 'react';
import axios from 'axios';

const InterviewPrep = () => {
  const [selectedField, setSelectedField] = useState('');
  const [questions, setQuestions] = useState([]);
  const [noQuestionsMessage, setNoQuestionsMessage] = useState('');

  const handleFieldSelect = async (field) => {
    setSelectedField(field);
    setNoQuestionsMessage(''); 

    try {
      // Fetch questions filtered by the selected field
      const response = await axios.get(`http://localhost:5001/interview/getallinterview/${encodeURIComponent(field)}`);
      console.log("this is the data of questions",response.data)
      if (response.data.length === 0) {
        setNoQuestionsMessage(`No questions available for ${field} at this moment.`);
        setQuestions([]); 
      } else {
        setQuestions(response.data);
      }

      

    } catch (error) {
      console.error("Error fetching questions:", error);
      setNoQuestionsMessage('Error fetching questions. Please try again later.');
    }
  };

  const handleRating = (questionId, rating) => {
    setQuestions(questions.map((q) => (q._id === questionId ? { ...q, rating } : q)));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Interview Preparation Questions</h1>

      {/* Field Selection */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Select a Field</h2>
        <div className="flex space-x-4">
          {["WebDev",
  "Blockchain",
  "Data Science",
  "AI/ML",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "Internet of Things (IoT)",
  "Game Development",
  "Augmented Reality (AR)",
  "Virtual Reality (VR)",
  "Software Engineering",
  "Big Data",
  "UI/UX Design",
  "Embedded Systems",
  "Computer Vision",
  "Quantum Computing",
  "Robotics",
  "Natural Language Processing (NLP)",
  "Networking",
  "Edge Computing",
  "Generative AI",
  "AI Ethics",
  "Explainable AI",
  "Autonomous Systems",
  "AI-Powered Automation",
  "AI in Healthcare",
  "AI in Finance",
  "AI in Education",
  "Deep Learning",
  "Reinforcement Learning",
  "Federated Learning",
  "AI in Cybersecurity",
  "AI-Driven Personalization",
  "Speech Recognition",
  "AI in Manufacturing",
  "AI in Retail",
  "AI in Marketing",
  "AI Governance",
  "Conversational AI",
  "AI-Enhanced Creativity",
  "AI in Drug Discovery",
  "AI in Climate Science",
  "Synthetic Data",
  "AI for Social Good",
  "AI Regulation and Policy",
  "AI in Energy Optimization",
  "Machine Learning",
  "Supervised Learning",
  "Unsupervised Learning",
  "Transfer Learning",
  "Generative Adversarial Networks (GANs)",
  "Self-Supervised Learning",
  "Neural Networks",
  "Transformer Models",
  "Natural Language Generation (NLG)",
  "Prompt Engineering",
  "Multimodal AI",
  "AI in Art and Creativity",
             "AI for Human Augmentation",].map(field => (
            <button
              key={field}
              onClick={() => handleFieldSelect(field)}
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition"
            >
              {field}
            </button>
          ))}
        </div>
      </div>

      {/* Questions */}
      {questions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Questions in {selectedField}</h2>
          {questions.map((question, index) => (
            <div key={question._id} className="bg-gray-100 p-4 mb-4 rounded shadow hover:shadow-lg transition">
              <p className="font-bold">
                {index + 1}. {question.text} <span className="italic">({question.company})</span>
              </p>
              <p>
                <strong>Answer:</strong> {question.showAnswer ? question.answer : 'Hidden'}
              </p>
              <button
                onClick={() =>
                  setQuestions(questions.map((q) => (q._id === question._id ? { ...q, showAnswer: !q.showAnswer } : q)))
                }
                className="bg-blue-500 text-white px-2 py-1 mt-2 rounded hover:bg-blue-600 active:bg-blue-700 transition"
              >
                {question.showAnswer ? 'Hide Answer' : 'Show Answer'}
              </button>

              {/* Rating */}
              <div className="mt-2">
                <strong>Rating: </strong>
                {question.rating}
                <div className="flex mt-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <button
                      key={rating}
                      onClick={() => handleRating(question._id, rating)}
                      className="bg-yellow-400 text-white px-2 py-1 rounded mr-2 hover:bg-yellow-500 active:bg-yellow-600 transition"
                    >
                      {rating} Stars
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default InterviewPrep;
