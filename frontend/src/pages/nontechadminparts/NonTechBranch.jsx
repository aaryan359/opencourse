import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';

const TopicPage = () => {
  const [fields, setFields] = useState({});
  const location = useLocation();
  const navigate = useNavigate();
  const { fieldname } = useParams(); // Get the fieldname from URL params
  const { topics } = location.state || { topics: {} }; // Default to an empty object if state is undefined

  useEffect(() => {
    setFields(topics);
  }, [topics]);

  const handleTopicClick = (topic) => {
    const subtopics = fields[topic]; // Get subtopics for the clicked topic
    navigate(`/nontech/${fieldname}/${topic}`, { state: { subtopics } }); // Pass both fieldname and topic in URL
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-md" >
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Topics in {fieldname}</h1>

      {Object.keys(topics).length > 0 ? (
        <div className="flex flex-wrap justify-center gap-4 mb-6">
          {Object.entries(topics).map(([topicKey]) => (
            <button
              key={topicKey}
              className={`py-3 px-6 rounded-full shadow-lg ${
               
                
                   'bg-blue-300 text-gray-800 hover:bg-blue-400'
              } transition-transform duration-300 transform hover:scale-105`}
              onClick={() => handleTopicClick(topicKey)} // Handle click for each topic
            >
             {topicKey.charAt(0).toUpperCase() + topicKey.slice(1)}
            </button>
          ))}
        </div>
      ) : (
        <p className="text-center">No topics available for this field.</p>
      )}
    </div>
  );
};

export default TopicPage;
