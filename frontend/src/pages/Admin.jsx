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



  



  const predefinedFields = [
    "WebDev",
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
    "AI for Human Augmentation"
  ];
  

  const getYoutubeVideoId = (url) => {
    if (!url) {
      console.error("Invalid URL provided:", url);
      return null;
    }
  
    // Match standard YouTube URLs and shortened youtu.be URLs
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n?]+)/ 
    );
  
    return match ? match[1] : null;
  };
  


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

      console.log("complete data is",data);


      // Fetch user videos and set them
      const videoList = data.flatMap(field =>
        field.subtopic.flatMap(sub => sub.videos.map(video => ({
          title: video.title,
          field: field.name,
          url:video.url
        })))
      );
      console.log("video map is",videoList);
      setMyVideos(videoList);

    } catch (error) {
      console.error("Failed to fetch fields", error);
    }
  };





  // Handle field click by setting full field object (including _id)
  const handleFieldClick = (field) => {
    setSelectedField(field); // Set the full field object
  };


  //add new filed 
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
  
    if (!newTopic || newTopic.trim() === "") {
      alert("Topic name cannot be empty.");
      return;
    }
  
    if (!topics[selectedField.name]?.some(topic => topic.name === newTopic)) {


          // Only log selectedField._id
      //console.log("Field ID is:", selectedField._id);
      
      try {
        const response = await axios.post(`http://localhost:5001/user/fields/${selectedField._id}/subtopics`, {
          subtopicName: newTopic.trim()
        });
  
        const data = response.data;
        console.log("Data of new subtopic:", data);
  
        // Update the topics state with the new subtopic
        setTopics(prevTopics => ({
          ...prevTopics,
          [selectedField.name]: [
            ...(prevTopics[selectedField.name] || []),
            { name: newTopic.trim(), id: data.subtopic._id }
          ]
        }));
  
        setNewTopic(""); // Reset the input field
  
      } catch (error) {
        console.error("Error adding topic", error);
  
        if (error.response) {
          alert(`Failed to add topic: ${error.response.data.error}`);
        } else {
          alert("Failed to add topic due to network error");
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
  
    if (title && url && description && selectedTopic) {
      try {
        const response = await axios.post(
          `http://localhost:5001/user/subtopics/${selectedTopic.id}/videos`, // Use selectedTopic.id here
          { title, url, description }
        );
  
        if (response.status === 200) {
          alert("Video uploaded successfully");
          setMyVideos([...myVideos, { title, subtopic: selectedTopic.name }]);
          setVideoDetails({ url: "", title: "", description: "" });
  
          // Reset selectedTopic only after success
          setSelectedTopic(null);
        }
      } catch (error) {
        if (error.response?.status === 403) {
          alert("This subtopic already has videos from 5 different users.");
        } else {
          console.error("Error uploading video", error.response ? error.response.data : error);
          alert("Failed to upload video");
        }
      }
    } else {
      alert("Please fill in all details and select a subtopic.");
    }
  };
  

  console.log("my videos is",myVideos)

  
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

                {/* Embed YouTube video */}
                <div className=" relative h-0 overflow-hidden" style={{ paddingBottom: '56.25%' }}>
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(video.url)}`}
                    frameBorder="0"
                    allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    title={video.title}
                  />
                </div>
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
