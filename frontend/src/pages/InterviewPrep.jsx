import React, { useState } from 'react';

const InterviewPrep = () => {
  const [selectedDomain, setSelectedDomain] = useState('');
  const [selectedCompany, setSelectedCompany] = useState('');
  const [questions, setQuestions] = useState([]);
  const [companies, setCompanies] = useState([]);

  const staticData = {
    'Web Development': {
      companies: ['Google', 'Facebook', 'Microsoft'],
      questions: [
        { id: 1, text: 'What is a closure in JavaScript?', answer: 'A closure is a function bundled with its lexical environment.', rating: 0, showAnswer: false },
        { id: 2, text: 'Explain the CSS box model.', answer: 'The box model represents the layout structure: margin, border, padding, and content.', rating: 0, showAnswer: false },
      ],
    },
    'AI/ML': {
      companies: ['Tesla', 'NVIDIA', 'DeepMind'],
      questions: [
        { id: 3, text: 'What is supervised learning?', answer: 'Supervised learning is a type of machine learning where the model is trained on labeled data.', rating: 0, showAnswer: false },
        { id: 4, text: 'Explain the concept of overfitting.', answer: 'Overfitting happens when a model learns noise in the training data and performs poorly on unseen data.', rating: 0, showAnswer: false },
      ],
    },
    Cloud: {
      companies: ['Amazon', 'Azure', 'Google Cloud'],
      questions: [
        { id: 5, text: 'What is serverless architecture?', answer: 'Serverless architecture allows you to run code without managing servers.', rating: 0, showAnswer: false },
        { id: 6, text: 'What are the benefits of cloud computing?', answer: 'Cloud computing offers scalability, cost efficiency, and flexibility.', rating: 0, showAnswer: false },
      ],
    },
    Blockchain: {
      companies: ['IBM', 'Coinbase', 'Ripple'],
      questions: [
        { id: 7, text: 'What is a blockchain?', answer: 'A blockchain is a distributed ledger technology where transactions are recorded in blocks.', rating: 0, showAnswer: false },
        { id: 8, text: 'What is proof of work?', answer: 'Proof of work is a consensus mechanism used to validate transactions in a blockchain network.', rating: 0, showAnswer: false },
      ],
    },
  };

  const handleDomainSelect = (domain) => {
    setSelectedDomain(domain);
    setCompanies(staticData[domain].companies);
  };

  const handleCompanySelect = (company) => {
    setSelectedCompany(company);
    setQuestions(staticData[selectedDomain].questions);
  };

  const handleRating = (questionId, rating) => {
    setQuestions(questions.map((q) => (q.id === questionId ? { ...q, rating } : q)));
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Interview Preparation Questions</h1>

      {/* Domain Selection */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">Select a Domain</h2>
        <div className="flex space-x-4">
          <button
            onClick={() => handleDomainSelect('Web Development')}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 active:bg-blue-700 transition"
          >
            Web Development
          </button>
          <button
            onClick={() => handleDomainSelect('AI/ML')}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 active:bg-green-700 transition"
          >
            AI/ML
          </button>
          <button
            onClick={() => handleDomainSelect('Cloud')}
            className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 active:bg-purple-700 transition"
          >
            Cloud
          </button>
          <button
            onClick={() => handleDomainSelect('Blockchain')}
            className="bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600 active:bg-yellow-700 transition"
          >
            Blockchain
          </button>
        </div>
      </div>

      {/* Companies */}
      {selectedDomain && companies.length > 0 && (
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Select a Company</h2>
          <div className="flex space-x-4">
            {companies.map((company) => (
              <button
                key={company}
                onClick={() => handleCompanySelect(company)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 active:bg-gray-700 transition"
              >
                {company}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Questions */}
      {selectedCompany && questions.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold">Questions from {selectedCompany}</h2>
          {questions.map((question, index) => (
            <div key={question.id} className="bg-gray-100 p-4 mb-4 rounded shadow hover:shadow-lg transition">
              <p className="font-bold">
                {index + 1}. {question.text}
              </p>
              <p>
                <strong>Answer:</strong> {question.showAnswer ? question.answer : 'Hidden'}
              </p>
              <button
                onClick={() =>
                  setQuestions(questions.map((q) => (q.id === question.id ? { ...q, showAnswer: !q.showAnswer } : q)))
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
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <button
                      key={rating}
                      onClick={() => handleRating(question.id, rating)}
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
