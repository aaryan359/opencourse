import React, { useState } from "react";
import '../App.css';

const Roadmap = () => {
  const [selectedField, setSelectedField] = useState("");
  const [topics, setTopics] = useState([
    {
      name: "HTML & CSS",
      subtopics: ["HTML Basics", "CSS Fundamentals", "Responsive Design"],
    },
    {
      name: "JavaScript",
      subtopics: ["JavaScript Basics", "ES6 Features", "DOM Manipulation"],
    },
    {
      name: "React",
      subtopics: ["Components", "State & Props", "Hooks"],
    },
    {
      name: "Blockchain",
      subtopics: ["Blockchain Basics", "Smart Contracts", "Ethereum"],
    },
  ]);

  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  const TopicTimeline = ({ topicList }) => {
    return topicList.map((topic, index) => (
      <div key={index} className="timeline-item">
        <div className="timeline-icon">
          {index + 1}
        </div>
        <div className="timeline-content">
          <h3 className="font-semibold text-gray-800 text-lg mb-2">{topic.name}</h3>
          <ul className="list-disc pl-5 mt-2 text-gray-700">
            {topic.subtopics.map((subtopic, subIndex) => (
              <li key={subIndex} className="text-sm">
                <div className="subtimeline-item">
                  <div className="subtimeline-content">
                    <span>{subtopic}</span>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    ));
  };

  return (
    <div className="container mx-auto p-8 max-w-4xl">
      <h1 className="text-4xl font-extrabold mb-6 text-center text-indigo-700">
        Roadmaps
      </h1>

      <div className="flex justify-center space-x-4 mb-6">
        <button
          onClick={() => handleFieldClick("Web Developer")}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Web Developer
        </button>

        <button
          onClick={() => handleFieldClick("Software Engineer")}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Software Engineer
        </button>
        <button
          onClick={() => handleFieldClick("Web Design")}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Web Design
        </button>
        <button
          onClick={() => handleFieldClick("Blockchain")}
          className="bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold py-2 px-6 rounded-full shadow-lg transform transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
        >
          Blockchain
        </button>
      </div>

      {selectedField && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4 text-gray-800 text-center">
            Selected Field: {selectedField}
          </h2>
          <div className="timeline">
            <TopicTimeline topicList={topics} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Roadmap;
