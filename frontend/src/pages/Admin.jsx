import React, { useState } from "react";

const API_KEY = 'AIzaSyBrvRtAQndmAf5e9u2q8qqv-4OwdclE7Q0'


function Admin() {
  const [fields, setFields] = useState(["WebDev", "Blockchain"]);
  const [selectedField, setSelectedField] = useState(null);

  const [topics, setTopics] = useState({
    WebDev: ["HTML", "CSS", "JavaScript"],
    Blockchain: ["Basics", "Smart Contracts"],
  });

  const [myVideos, setMyVideos] = useState([
    { title: "Introduction to HTML", field: "WebDev" },
    { title: "Getting Started with CSS", field: "WebDev" },
    { title: "Understanding Smart Contracts", field: "Blockchain" },
  ]);






  const [newField, setNewField] = useState("");
  const [newTopic, setNewTopic] = useState("");

  const predefinedFields = [
    "WebDev",
    "Blockchain",
    "Data Science",
    "AI/ML",
    "Mobile Development",
  ];

  const handleFieldClick = (field) => {
    setSelectedField(field);
  

  };


  const handleAddField = () => {
    // Check if the selected field is already in the fields array
    if (fields.includes(newField)) {
      alert(`${newField} has already been added.`);
      return; // Do not proceed if the field already exists
    }

    if (newField) {
      setFields([...fields, newField]);
      setTopics({ ...topics, [newField]: [] });
      setNewField(""); // Reset the field selection
    }
  };

  const handleAddTopic = () => {
    // Check if the topic already exists in the selected field
    if (topics[selectedField]?.includes(newTopic)) {
      alert(`${newTopic} already exists in ${selectedField}.`);
      return;
    }

    if (newTopic) {
      setTopics({
        ...topics,
        [selectedField]: [...topics[selectedField], newTopic],
      });
      setNewTopic(""); // Reset the new topic input
    }
  };

  const handleUploadVideo = (topic) => {
    alert(`You can now upload a video for ${topic}`);
    // You would implement actual video upload logic here
  };

  // Function to handle drag and drop
  const handleDragStart = (e, topic) => {
    e.dataTransfer.setData("text/plain", topic);
  };

  const handleDrop = (e) => {
    const topic = e.dataTransfer.getData("text/plain");
    const newTopics = topics[selectedField].filter((t) => t !== topic);
    const dropIndex = e.target.dataset.index;

    newTopics.splice(dropIndex, 0, topic); // Insert topic at the new position
    setTopics({ ...topics, [selectedField]: newTopics });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-200 p-6">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">
        Admin Dashboard
      </h1>




     {/* videos section */}

      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        {/* My Videos Section */}
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">
            My Videos
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myVideos.map((video, index) => (
              <div
                key={index}
                className="p-4 bg-purple-100 text-purple-900 rounded-lg shadow-lg"
              >
                <h3 className="text-xl font-bold text-center">{video.title}</h3>
                <p className="text-center text-sm">{video.field}</p>
              </div>
            ))}
          </div>
        </div>





        {/* add new filed */}

        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-blue-700">
              Manage Learning Fields
            </h2>
            <div className="flex items-center">
              <select
                value={newField}
                onChange={(e) => setNewField(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 mr-2"
              >
                <option value="" disabled>
                  Select a field
                </option>

                {predefinedFields.map((field) => (
                  <option key={field} value={field}>
                    {field}
                  </option>
                ))}
              </select>
              <button
                className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
                onClick={handleAddField}
              >
                Add New Field
              </button>
            </div>
          </div>





          {/* Fields Grid */}


          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
            {fields.map((field) => (
              <div
                key={field}
                className="p-4 bg-blue-100 text-blue-900 rounded-lg shadow-lg cursor-pointer hover:bg-blue-300 hover:scale-105 transform transition duration-300"
                onClick={() => handleFieldClick(field)}
              >
                <h3 className="text-xl font-bold text-center">{field}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Display selected field topics */}
        {selectedField && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-700">
                {selectedField} Topics
              </h2>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors"
                onClick={handleAddTopic}
              >
                Add Topic
              </button>
            </div>

            {/* New Topic Input Form */}
            <div className="mb-4">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Enter new topic"
                className="border border-gray-300 rounded-lg p-2 mr-2"
              />
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700 transition-colors"
                onClick={handleAddTopic}
              >
                Add Topic
              </button>
            </div>

            {/* Topics Grid with Drag-and-Drop */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
              {topics[selectedField].map((topic, index) => (
                <div
                  key={topic}
                  data-index={index}
                  draggable
                  onDragStart={(e) => handleDragStart(e, topic)}
                  onDrop={handleDrop}
                  onDragOver={(e) => e.preventDefault()}
                  className="p-4 bg-green-100 text-green-900 rounded-lg shadow-lg cursor-pointer hover:bg-green-300 hover:scale-105 transform transition duration-300"
                >
                  <h3 className="text-xl font-bold text-center">{topic}</h3>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Admin;
