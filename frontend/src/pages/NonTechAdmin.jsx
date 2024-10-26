
    import React, { useState, useEffect } from 'react';
    import axios from 'axios';
    
    const NonTechAdmin = () => {
      const [selectedField, setSelectedField] = useState(null);
      const [selectedTopic, setSelectedTopic] = useState(null);
      const [selectedSubtopic, setSelectedSubtopic] = useState(null);
      const [videoURL, setVideoURL] = useState('');
      const [qaPairs, setQAPairs] = useState([{ question: '', answer: '' }]);
      const [fields, setFields] = useState({});
      const [user, setUser] = useState(null);
      const [videos, setVideos] = useState([]);
      const [error, setError] = useState(null);
      const [successMessage, setSuccessMessage] = useState('');
    
    
      const dummyFields = {
        engineering: {
          topics: {
            cse: ['Python', 'Data Structures', 'Algorithms', 'Operating Systems', 'Computer Networks'],
            mechanical: ['Thermodynamics', 'Fluid Mechanics', 'Heat Transfer', 'Mechanical Design'],
            electrical: ['Circuit Theory', 'Electromagnetics', 'Power Systems', 'Control Systems'],
            civil: ['Structural Engineering', 'Geotechnical Engineering', 'Construction Management'],
          },
        },
        medical: {
          topics: {
            anatomy: ['Human Anatomy', 'Pathology', 'Histology'],
            physiology: ['Exercise Physiology', 'Neurophysiology', 'Cardiovascular Physiology'],
            surgery: ['General Surgery', 'Orthopedic Surgery', 'Neurosurgery'],
            pharmacology: ['Clinical Pharmacology', 'Toxicology', 'Pharmacodynamics'],
          },
        },
        business: {
          topics: {
            finance: ['Corporate Finance', 'Investment Analysis', 'Financial Markets', 'Risk Management'],
            marketing: ['Digital Marketing', 'Consumer Behavior', 'Brand Management', 'Market Research'],
            management: ['Project Management', 'Organizational Behavior', 'Leadership', 'Human Resources'],
            entrepreneurship: ['Startup Strategy', 'Business Models', 'Innovation', 'Funding'],
          },
        },
        law: {
          topics: {
            corporateLaw: ['Contract Law', 'Company Law', 'Mergers and Acquisitions', 'Corporate Governance'],
            criminalLaw: ['Criminal Procedure', 'Evidence', 'White Collar Crime', 'Juvenile Justice'],
            constitutionalLaw: ['Civil Rights', 'Judicial Review', 'Federalism', 'Legislation'],
            intellectualProperty: ['Patent Law', 'Copyright Law', 'Trademark Law', 'Trade Secrets'],
          },
        },
        education: {
          topics: {
            pedagogy: ['Instructional Design', 'Curriculum Development', 'Teaching Methods'],
            specialEducation: ['Learning Disabilities', 'Autism Spectrum Disorders', 'Behavioral Management'],
            educationalTechnology: ['EdTech Tools', 'E-learning Development', 'Gamification in Education'],
            higherEducation: ['College Administration', 'Academic Research', 'Student Services'],
          },
        },
        environmentalScience: {
          topics: {
            ecology: ['Ecosystem Dynamics', 'Biodiversity', 'Conservation Biology', 'Climate Change'],
            environmentalPolicy: ['Environmental Law', 'Sustainable Development', 'Environmental Ethics'],
            renewableEnergy: ['Solar Energy', 'Wind Energy', 'Hydropower', 'Geothermal Energy'],
            wasteManagement: ['Recycling Technologies', 'Waste Minimization', 'Landfill Management', 'Hazardous Waste'],
          },
        },
        humanities: {
          topics: {
            history: ['Ancient Civilizations', 'Modern History', 'World Wars', 'Cultural History'],
            philosophy: ['Ethics', 'Metaphysics', 'Epistemology', 'Political Philosophy'],
            literature: ['Classical Literature', 'Modern Fiction', 'Poetry Analysis', 'Literary Criticism'],
            sociology: ['Social Theory', 'Cultural Sociology', 'Social Movements', 'Gender Studies'],
          },
        },
        arts: {
          topics: {
            visualArts: ['Painting', 'Sculpture', 'Digital Art', 'Art History'],
            performingArts: ['Theater', 'Dance', 'Music Theory', 'Stagecraft'],
            filmStudies: ['Film Theory', 'Film Production', 'Screenwriting', 'Cinematography'],
            design: ['Graphic Design', 'Interior Design', 'Fashion Design', 'Product Design'],
          },
        },
        computerScience: {
          topics: {
            softwareEngineering: ['Agile Methodologies', 'Version Control', 'Software Testing', 'DevOps'],
            dataScience: ['Data Mining', 'Machine Learning', 'Data Visualization', 'Big Data'],
            cybersecurity: ['Network Security', 'Cryptography', 'Ethical Hacking', 'Cyber Law'],
            artificialIntelligence: ['Neural Networks', 'Natural Language Processing', 'Computer Vision', 'Robotics'],
          },
        },
        economics: {
          topics: {
            microeconomics: ['Supply and Demand', 'Market Structures', 'Consumer Theory', 'Production Theory'],
            macroeconomics: ['National Income', 'Inflation', 'Unemployment', 'Monetary Policy'],
            internationalEconomics: ['International Trade', 'Globalization', 'Foreign Exchange', 'Balance of Payments'],
            developmentEconomics: ['Economic Growth', 'Poverty Alleviation', 'Sustainable Development', 'Inequality'],
          },
        },
      };
    
      const dummyUser = { name: 'meena' };
      const dummyVideos = {
        'Thermodynamics': ['https://video1.com', 'https://video2.com'],
        'Fluid Mechanics': ['https://fluid1.com'],
      };
    
      useEffect(() => {

        const fetchFields = () => setFields(dummyFields);

        const fetchUser = () => setUser(dummyUser);

        fetchFields();
        fetchUser();
        
      }, []);
    
      useEffect(() => {
        if (selectedSubtopic) {
          const fetchVideos = () => setVideos(dummyVideos[selectedSubtopic] || []);
          fetchVideos();
        }
      }, [selectedSubtopic]);
    
      const handleAddQA = () => setQAPairs([...qaPairs, { question: '', answer: '' }]);
    
      const handleQAChange = (index, field, value) => {
        const newQAPairs = [...qaPairs];
        newQAPairs[index][field] = value;
        setQAPairs(newQAPairs);
      };
    
      const handleUpload = () => {
        if (!videoURL || !qaPairs[0].question || !qaPairs[0].answer) {
          setError('Please provide a valid video URL and at least one question-answer pair.');
          return;
        }
    
        if (videos.length >= 5) {
          setError('You have reached the maximum upload limit of 5 videos for this topic.');
          return;
        }
    
        setVideos([...videos, videoURL]);
        setSuccessMessage('Video and Q&A uploaded successfully!');
        setVideoURL('');
        setQAPairs([{ question: '', answer: '' }]);
      };
    
      return (
        <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-md">
          <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Admin Dashboard</h1>
    
          {error && <div className="bg-red-500 text-white p-4 rounded-md">{error}</div>}
          {successMessage && <div className="bg-green-500 text-white p-4 rounded-md">{successMessage}</div>}
    
          {user ? (
            <>
              <p className="text-lg mb-4">Welcome, <span className="font-semibold">{user.name}</span>!</p>
    
              {!selectedField && (
                <div className="flex flex-wrap justify-center gap-4 mb-6">
                  {Object.keys(fields).map((field) => (
                    <button
                      key={field}
                      className="bg-gradient-to-r from-green-500 to-blue-500 text-white py-3 px-6 rounded-full shadow-lg hover:scale-105 transform transition-all duration-300"
                      onClick={() => setSelectedField(field)}
                    >
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                    </button>
                  ))}
                </div>
              )}
    
              {selectedField && (
                <div className="space-y-4">
                  <div className="mb-6">
                    <h2 className="text-3xl font-bold mb-4 text-center text-gray-700">Topics in {selectedField.charAt(0).toUpperCase() + selectedField.slice(1)}</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                      {Object.keys(fields[selectedField].topics).map((topic) => (
                        <button
                          key={topic}
                          className={`py-3 px-6 rounded-full shadow-lg ${
                            selectedTopic === topic
                              ? 'bg-blue-600 text-white'
                              : 'bg-blue-300 text-gray-800 hover:bg-blue-400'
                          } transition-transform duration-300 transform hover:scale-105`}
                          onClick={() => setSelectedTopic(topic)}
                        >
                          {topic.charAt(0).toUpperCase() + topic.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>
    
                  {selectedTopic && (
                    <div className="mb-6">
                      <h3 className="text-2xl font-semibold mb-4 text-center text-gray-600">Subtopics in {selectedTopic.charAt(0).toUpperCase() + selectedTopic.slice(1)}</h3>
                      <div className="flex flex-wrap justify-center gap-4">
                        {fields[selectedField].topics[selectedTopic].map((subtopic) => (
                          <button
                            key={subtopic}
                            className={`py-3 px-6 rounded-full shadow-lg ${
                              selectedSubtopic === subtopic
                                ? 'bg-red-600 text-white'
                                : 'bg-red-300 text-gray-800 hover:bg-red-400'
                            } transition-transform duration-300 transform hover:scale-105`}
                            onClick={() => setSelectedSubtopic(subtopic)}
                          >
                            {subtopic}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
    
                  {selectedSubtopic && (
                    <div className="mt-8 space-y-6 bg-gray-100 p-6 rounded-lg">
                      <div>
                        <h4 className="text-2xl font-bold mb-4 text-gray-700">Uploaded Videos for {selectedSubtopic}</h4>
                        {videos.length > 0 ? (
                          <ul className="list-disc pl-6">
                            {videos.map((video, index) => (
                              <li key={index} className="text-blue-500">{video}</li>
                            ))}
                          </ul>
                        ) : (
                          <p>No videos uploaded yet for this subtopic.</p>
                        )}
                      </div>
    
                      <div>
                        <label className="block text-xl font-medium mb-2">Upload Video URL for {selectedSubtopic}</label>
                        <input
                          type="text"
                          value={videoURL}
                          onChange={(e) => setVideoURL(e.target.value)}
                          placeholder="Enter video URL"
                          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
    
                      <div>
                        <label className="block text-xl font-medium mb-4">Upload Questions and Answers</label>
                        {qaPairs.map((qa, index) => (
                          <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
                            <input
                              type="text"
                              value={qa.question}
                              onChange={(e) => handleQAChange(index, 'question', e.target.value)}
                              placeholder={`Question ${index + 1}`}
                              className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                            <input
                              type="text"
                              value={qa.answer}
                              onChange={(e) => handleQAChange(index, 'answer', e.target.value)}
                              placeholder="Answer"
                              className="flex-1 p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
                            />
                          </div>
                        ))}
                        <button
                          className="bg-yellow-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300"
                          onClick={handleAddQA}
                        >
                          Add More Questions
                        </button>
                      </div>
    
                      <div className="text-center">
                        <button
                          className="bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                          onClick={handleUpload}
                        >
                          Upload Video & QA
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}
    
              <div className="text-center mt-8">
                <button
                  className="bg-red-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300"
                  onClick={() => setSelectedField(null)}
                >
                  Back to Fields
                </button>
              </div>
            </>
          ) : (
            <p>Loading user info...</p>
          )}
        </div>
      );
    };
    
    export default NonTechAdmin;
    