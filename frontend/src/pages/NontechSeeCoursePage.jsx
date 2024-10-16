import React, { useState, useEffect } from 'react';
import { FaStar } from 'react-icons/fa';

const NontechSeeCoursePage = () => {
  const [selectedField, setSelectedField] = useState(null);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [videos, setVideos] = useState([]);
  const [qaPairs, setQAPairs] = useState([]);
  const [ratings, setRatings] = useState({}); // Store ratings for each Q&A pair

  // Dummy data
  const dummyFields = {
    Engineering: {
      topics: {
        Mechanical: {
          courses: {
            Dynamics: {
              videos: ['https://www.youtube.com/', 'https://www.youtube.com/'],
              qaPairs: [
                { id: 1, question: 'What is Newton’s Second Law?', answer: 'F = ma' },
                { id: 2, question: 'Explain the concept of equilibrium.', answer: 'When all forces balance out.' },
              ],
            },
            Thermodynamics: {
              videos: ['https://www.youtube.com/', 'https://www.youtube.com/'],
              qaPairs: [
                { id: 3, question: 'What is the first law of thermodynamics?', answer: 'Energy cannot be created or destroyed.' },
                { id: 4, question: 'Define entropy.', answer: 'A measure of disorder in a system.' },
              ],
            },
          },
        },
        Electrical: {
          courses: {
            Circuits: {
              videos: ['https://www.youtube.com/', 'https://www.youtube.com/'],
              qaPairs: [
                { id: 5, question: 'What is Ohm’s Law?', answer: 'V = IR' },
                { id: 6, question: 'Explain Kirchhoff’s Current Law.', answer: 'Sum of currents entering a node equals sum exiting.' },
              ],
            },
          },
        },
      },
    },
    Medical: {
      topics: {
        Cardiology: {
          courses: {
            'Heart Anatomy': {
              videos: ['https://www.youtube.com/', 'https://www.youtube.com/'],
              qaPairs: [
                { id: 7, question: 'What are the chambers of the heart?', answer: 'Two atria and two ventricles.' },
                { id: 8, question: 'Describe the function of the left ventricle.', answer: 'Pumps oxygenated blood to the body.' },
              ],
            },
          },
        },
      },
    },
  };

  // Initialize ratings from local storage or set to empty
  useEffect(() => {
    const storedRatings = JSON.parse(localStorage.getItem('qaRatings')) || {};
    setRatings(storedRatings);
  }, []);

  // Update local storage whenever ratings change
  useEffect(() => {
    localStorage.setItem('qaRatings', JSON.stringify(ratings));
  }, [ratings]);

  // Fetch videos and Q&A when course is selected
  useEffect(() => {
    if (selectedCourse) {
      const { videos, qaPairs } = dummyFields[selectedField].topics[selectedTopic].courses[selectedCourse];
      setVideos(videos);
      // Initialize ratings for new Q&A pairs if not present
      const initialRatings = qaPairs.reduce((acc, qa) => {
        if (!acc[qa.id]) acc[qa.id] = 0;
        return acc;
      }, { ...ratings });
      setRatings(initialRatings);
      setQAPairs(qaPairs);
    }
  }, [selectedCourse]);

  // Handle rating change
  const handleRating = (qaId, rating) => {
    setRatings(prevRatings => ({
      ...prevRatings,
      [qaId]: rating,
    }));
  };

  // Sort Q&A pairs based on ratings
  const sortedQAPairs = [...qaPairs].sort((a, b) => (ratings[b.id] || 0) - (ratings[a.id] || 0));

  return (
    <div className="p-6 max-w-6xl mx-auto bg-gradient-to-b from-blue-50 to-blue-200 shadow-lg rounded-lg">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-gray-800">Explore Courses and Q&A</h1>

      {/* Field Selection */}
      {!selectedField && (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {Object.keys(dummyFields).map((field) => (
            <button
              key={field}
              className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-4 px-8 rounded-full shadow-lg hover:scale-105 transform transition-transform duration-300"
              onClick={() => setSelectedField(field)}
            >
              {field}
            </button>
          ))}
        </div>
      )}

      {/* Topic Selection */}
      {selectedField && !selectedTopic && (
        <div className="space-y-4">
          <h2 className="text-3xl font-bold mb-4 text-center text-gray-700">Topics in {selectedField}</h2>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(dummyFields[selectedField].topics).map((topic) => (
              <button
                key={topic}
                className="py-3 px-6 rounded-full shadow-lg bg-blue-300 text-gray-800 hover:bg-blue-400 transition-transform duration-300 transform hover:scale-105"
                onClick={() => setSelectedTopic(topic)}
              >
                {topic}
              </button>
            ))}
            <button
              className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
              onClick={() => setSelectedField(null)}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Course Selection */}
      {selectedField && selectedTopic && !selectedCourse && (
        <div className="space-y-4">
          <h3 className="text-3xl font-semibold mb-4 text-center text-gray-600">Courses in {selectedTopic}</h3>
          <div className="flex flex-wrap justify-center gap-4">
            {Object.keys(dummyFields[selectedField].topics[selectedTopic].courses).map((course) => (
              <button
                key={course}
                className="py-3 px-6 rounded-full shadow-lg bg-purple-300 text-gray-800 hover:bg-purple-400 transition-transform duration-300 transform hover:scale-105"
                onClick={() => setSelectedCourse(course)}
              >
                {course}
              </button>
            ))}
            <button
              className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
              onClick={() => {
                setSelectedTopic(null); // Reset topic selection
              }}
            >
              Back
            </button>
          </div>
        </div>
      )}

      {/* Display Videos and Q&A */}
      {selectedCourse && (
        <div className="mt-8 space-y-6">
          {/* Videos Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-2xl font-bold mb-4 text-gray-700">Videos for {selectedCourse}</h4>
            {videos.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {videos.map((video, index) => (
                  <div key={index} className="aspect-w-16 aspect-h-9">
                    <iframe
                      className="rounded-lg shadow-lg"
                      src={video}
                      title={`Video ${index + 1}`}
                      frameBorder="0"
                      allowFullScreen
                    />
                  </div>
                ))}
              </div>
            ) : (
              <p>No videos available for this course yet.</p>
            )}
          </div>

          {/* Q&A Section */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h4 className="text-2xl font-bold mb-4 text-gray-700">Q&A for {selectedCourse}</h4>
            {sortedQAPairs.length > 0 ? (
              <ul className="space-y-4">
                {sortedQAPairs.map((qa) => (
                  <li key={qa.id} className="bg-gray-50 p-4 rounded-lg shadow">
                    <p className="font-semibold text-lg">Q: {qa.question}</p>
                    <p className="mb-2">A: {qa.answer}</p>
                    {/* Rating Stars */}
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <FaStar
                          key={star}
                          className={`cursor-pointer ${ratings[qa.id] >= star ? 'text-yellow-500' : 'text-gray-400'}`}
                          onClick={() => handleRating(qa.id, star)}
                        />
                      ))}
                    </div>
                    <p className="mt-2 text-sm text-gray-500">Rating: {ratings[qa.id] || 0} / 5</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Q&A available for this course yet.</p>
            )}
          </div>
          {/* Back Button for Course */}
          <button
            className="bg-red-500 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
            onClick={() => setSelectedCourse(null)} // Reset course selection
          >
            Back
          </button>
        </div>
      )}
    </div>
  );
};

export default NontechSeeCoursePage;
