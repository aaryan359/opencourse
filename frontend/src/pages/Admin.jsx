import React, { useState, useEffect } from "react";
import axios from "axios";

function Admin() {
  const [fields, setFields] = useState([]);
  const [selectedField, setSelectedField] = useState(null);
  const [topics, setTopics] = useState({});
  const [myVideos, setMyVideos] = useState([]);
  const [newField, setNewField] = useState("");
  const [newTopic, setNewTopic] = useState("");
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [videoDetails, setVideoDetails] = useState({
    url: "",
    title: "",
    description: ""
  });

  const predefinedFields = ["WebDev", "Blockchain", "Data Science", "AI/ML", "Mobile Development"];

  // Fetch all fields with topics and videos
  useEffect(() => {
    fetchFields();
  }, []);


  

  const fetchFields = async () => {
    try {
      const response = await axios.get("http://localhost:5001/user/getfields");
      const data = response.data;

      setFields(data); // Store full field objects
      const topicsMap = {};
      data.forEach(field => {
        topicsMap[field.name] = field.subtopic.map(sub => ({
          name: sub.name,
          id: sub._id // Store subtopicId
        }));
      });
      setTopics(topicsMap);

      // Fetch user videos and set them
      const videoList = data.flatMap(field =>
        field.subtopic.flatMap(sub => sub.videos.map(video => ({
          title: video.title,
          field: field.name
        })))
      );
      setMyVideos(videoList);
    } catch (error) {
      console.error("Failed to fetch fields", error);
    }
  };

  // Handle field click by setting full field object (including _id)

  const handleFieldClick = (field) => {
    setSelectedField(field); // Set the full field object
  };

  const handleAddField = async () => {
    if (fields.some(f => f.name === newField)) {
      alert(`${newField} has already been added.`);
      return;
    }

    if (newField) {
      try {
        const response = await axios.post("http://localhost:5001/user/fields", {
          name: newField
        });

        const data = response.data;
        setFields([...fields, data]); // Add full field object
        setTopics({ ...topics, [newField]: [] });
        setNewField(""); // Reset the input
      } catch (error) {
        console.error("Error adding field", error);
        alert("Failed to add field");
      }
    }
  };

  const handleAddTopic = async () => {
    if (!selectedField) {
      alert("Select a field first");
      return;
    }

    if (!topics[selectedField.name]?.some(topic => topic.name === newTopic)) {
      if (newTopic) {
        try {
          const response = await axios.post(`http://localhost:5001/user/fields/${selectedField._id}/subtopics`, {
            subtopicName: newTopic
          });

          const data = response.data;
          setTopics({
            ...topics,
            [selectedField.name]: [...(topics[selectedField.name] || []), { name: newTopic, id: data._id }]
          });
          setNewTopic(""); // Reset the input field
        } catch (error) {
          console.error("Error adding topic", error);
          alert("Failed to add topic");
        }
      }
    } else {
      alert(`${newTopic} already exists in ${selectedField.name}.`);
    }
  };

  const handleUploadVideo = (topic) => {
    setSelectedTopic(topic); // Open form for the selected topic
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    const { url, title, description } = videoDetails;

    if (title && url && description) {
      try {
        const response = await axios.post(`http://localhost:5001/user/fields/${selectedField._id}/subtopics/${selectedTopic._id}/videos`, {
          title,
          url,
          description
        });

        if (response.status === 200) {
          setMyVideos([...myVideos, { title, field: selectedField.name }]);
          alert("Video uploaded successfully");
          setVideoDetails({ url: "", title: "", description: "" });
          setSelectedTopic(null); // Close the form after submission
        } else {
          alert("Failed to upload video");
        }
      } catch (error) {
        console.error("Error uploading video", error);
        alert("Failed to upload video");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-blue-200 p-6">
      <h1 className="text-4xl font-extrabold text-blue-800 mb-8 text-center">
        Admin Dashboard
      </h1>

      {/* My Videos Section */}
      <div className="max-w-7xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <div className="mb-8">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">My Videos</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

            {myVideos.map((video, index) => (
              <div key={index} className="p-4 bg-purple-100 text-purple-900 rounded-lg shadow-lg">
                <h3 className="text-xl font-bold text-center">{video.title}</h3>

                <p className="text-center text-sm">{video.field}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Add New Field Section */}
        <div className="mb-8">
          <div className="flex justify-between items-center">
            <h2 className="text-2xl font-semibold text-blue-700">Manage Learning Fields</h2>
            <div className="flex items-center">
              <select
                value={newField}
                onChange={(e) => setNewField(e.target.value)}
                className="border border-gray-300 rounded-lg p-2 mr-2"
              >
                <option value="" disabled>Select a field</option>
                {predefinedFields.map((field) => (
                  <option key={field} value={field}>{field}</option>
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
                key={field._id}
                className="p-4 bg-blue-100 text-blue-900 rounded-lg shadow-lg cursor-pointer hover:bg-blue-300 hover:scale-105 transform transition duration-300"
                onClick={() => handleFieldClick(field)} // Pass full field object
              >
                <h3 className="text-xl font-bold text-center">{field.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Display selected field topics */}
        {selectedField && (
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-semibold text-blue-700">{selectedField.name} Topics</h2>
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

            {/* Topics Grid with Video Upload */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topics[selectedField.name]?.map((topic, index) => (
                <div
                  key={index}
                  className="p-4 bg-green-100 text-green-900 rounded-lg shadow-lg cursor-pointer hover:bg-green-300 hover:scale-105 transform transition duration-300"
                  onClick={() => handleUploadVideo(topic)}
                >
                  <h3 className="text-xl font-bold text-center">{topic.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Video Upload Form */}
        {selectedTopic && (
          <form onSubmit={handleSubmitVideo} className="mt-6 bg-white shadow-lg rounded-lg p-6">
            <h3 className="text-xl font-bold mb-4">Upload Video to {selectedTopic.name}</h3>

            <div className="mb-4">

              <label className="block text-gray-700 mb-2">Video Title</label>
              <input
                type="text"
                name="title"
                value={videoDetails.title}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />
            </div>


            <div className="mb-4">

               <label className="block text-gray-700 mb-2">YouTube URL</label>

              <input
                type="url"
                name="url"
                value={videoDetails.url}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
                required
              />

            </div>


            <div className="mb-4">


              <label className="block text-gray-700 mb-2">Video Description</label>


              <textarea
                name="description"
                value={videoDetails.description}
                onChange={handleInputChange}
                className="border border-gray-300 rounded-lg p-2 w-full"
                rows="4"
                required
              />
            </div>


            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-colors"
            >
              Upload Video
            </button>

            
          </form>
        )}
      </div>
    </div>
  );
}

export default Admin;
