import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FiUpload, FiVideo, FiX, FiPlus } from "react-icons/fi";
import { uploadVideoToSupabase, validateVideoFile } from "../lib/videoUpload";

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
  const [uploadMode, setUploadMode] = useState("url");
  const [videoFile, setVideoFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);

  const { token } = useSelector((state) => state.auth);

  const predefinedFields = [
    "frontend",
    "backend",
    "python",
    "c++",
    "Blockchain",
    "Data Science",
    "AI/ML",
    "Mobile Development",
    "Cloud Computing",
    "Cybersecurity",
    "DevOps",
    "Internet of Things (IoT)",
    "Game Development",
    "Software Engineering",
    "UI/UX Design",
    "Quantum Computing",
    "Networking",
    "Edge Computing",
    "Generative AI",
    "Deep Learning",
    "Reinforcement Learning",
    "Machine Learning",
    "Supervised Learning",
    "Unsupervised Learning",
    "Natural Language Processing (NLP)",
  ];

  const getYoutubeVideoId = (url) => {
    if (!url) return null;
    const match = url.match(
      /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^&\n?]+)/
    );
    return match ? match[1] : null;
  };

  const isYouTubeUrl = (url) => {
    return url && (url.includes('youtube.com') || url.includes('youtu.be'));
  };

  useEffect(() => {
    fetchFields();
    fetchvideos();
  }, []);

  const fetchFields = async () => {
    try {
      const response = await axios.get("https://opencoursebackend-j3sa.onrender.com/user/getfields", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;

      setFields(data);
      const topicsMap = {};

      data.forEach(field => {
        topicsMap[field.name] = field.subtopic.map(sub => ({
          name: sub.name,
          id: sub._id
        }));
      });

      setTopics(topicsMap);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchvideos = async () => {
    try {
      const response = await axios.get("https://opencoursebackend-j3sa.onrender.com/user/getvideos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const Videos = response.data.videos;

      const videoList = Videos.map(video => ({
        title: video.title,
        url: video.url,
        description: video.description,
        createdAt: video.createdAt,
      }));

      setMyVideos(videoList);
    } catch (error) {
      console.log(error);
    }
  };

  const handleFieldClick = (field) => {
    setSelectedField(field);
  };

  const handleAddField = async () => {
    if (fields.some(f => f.name === newField)) {
      toast.warn('Field already exists', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (newField) {
      try {
        const response = await axios.post(
          "https://opencoursebackend-j3sa.onrender.com/user/fields",
          { name: newField },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        const data = response.data;
        toast.success('Field added successfully', {
          position: "top-right",
          autoClose: 3000,
        });

        setFields([...fields, data]);
        setTopics({ ...topics, [newField]: [] });
        setNewField("");
      } catch (error) {
        console.error("Error adding field", error);
        toast.error('Failed to add field', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    }
  };

  const handleAddTopic = async () => {
    if (!selectedField) {
      toast.warn('Select a field first', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!newTopic || newTopic.trim() === "") {
      toast.warn('Topic name cannot be empty', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (!topics[selectedField.name]?.some(topic => topic.name === newTopic)) {
      try {
        const response = await axios.post(`https://opencoursebackend-j3sa.onrender.com/user/fields/${selectedField._id}/subtopics`, {
          subtopicName: newTopic.trim()
        });

        const data = response.data;
        toast.success('Topic added successfully', {
          position: "top-right",
          autoClose: 3000,
        });

        setTopics(prevTopics => ({
          ...prevTopics,
          [selectedField.name]: [
            ...(prevTopics[selectedField.name] || []),
            { name: newTopic.trim(), id: data.subtopic._id }
          ]
        }));

        setNewTopic("");
      } catch (error) {
        console.error("Error adding topic", error);
        toast.error('Failed to add topic', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } else {
      toast.warn('Topic already exists', {
        position: "top-right",
        autoClose: 3000,
      });
    }
  };

  const handleUploadVideo = (topic) => {
    setSelectedTopic(topic);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setVideoDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const validation = validateVideoFile(file);
      if (!validation.valid) {
        toast.error(validation.error, {
          position: "top-right",
          autoClose: 5000,
        });
        e.target.value = null;
        return;
      }
      setVideoFile(file);
    }
  };

  const handleSubmitVideo = async (e) => {
    e.preventDefault();
    const { url, title, description } = videoDetails;

    if (!title || !description || !selectedTopic) {
      toast.warn('Please fill in all details and select a subtopic', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (uploadMode === "url" && !url) {
      toast.warn('Please provide a video URL', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    if (uploadMode === "file" && !videoFile) {
      toast.warn('Please select a video file', {
        position: "top-right",
        autoClose: 3000,
      });
      return;
    }

    setIsUploading(true);
    let finalVideoUrl = url;

    try {
      if (uploadMode === "file" && videoFile) {
        const uploadToast = toast.loading('Uploading video...');

        const uploadResult = await uploadVideoToSupabase(videoFile, 'course-videos');

        if (!uploadResult.success) {
          toast.update(uploadToast, {
            render: `Upload failed: ${uploadResult.error}`,
            type: 'error',
            isLoading: false,
            autoClose: 5000,
          });
          setIsUploading(false);
          return;
        }

        finalVideoUrl = uploadResult.url;

        toast.update(uploadToast, {
          render: 'Video uploaded successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 2000,
        });
      }

      const response = await axios.post(
        `https://opencoursebackend-j3sa.onrender.com/user/subtopics/${selectedTopic.id}/videos`,
        { title, url: finalVideoUrl, description },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200) {
        toast.success('Video added to course successfully', {
          position: "top-right",
          autoClose: 3000,
        });

        setMyVideos([...myVideos, { title, url: finalVideoUrl, description }]);
        setVideoDetails({ url: "", title: "", description: "" });
        setVideoFile(null);
        setSelectedTopic(null);
        setUploadProgress(0);
      }
    } catch (error) {
      if (error.response?.status === 403) {
        toast.error("This subtopic already has videos from 5 different users", {
          position: "top-right",
          autoClose: 5000,
        });
      } else {
        console.error("Error uploading video", error.response ? error.response.data : error);
        toast.error('Failed to upload video', {
          position: "top-right",
          autoClose: 3000,
        });
      }
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6">
      <div className="max-w-7xl mx-auto space-y-8">

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 shadow-2xl rounded-2xl p-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl font-bold text-white flex items-center gap-3">
              <FiVideo className="text-blue-400" />
              My Videos
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {myVideos.map((video, index) => (
              <div key={index} className="group relative bg-slate-900/70 border border-slate-700 rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                <div className="relative h-48 bg-slate-800">
                  {isYouTubeUrl(video.url) ? (
                    <iframe
                      className="absolute inset-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${getYoutubeVideoId(video.url)}`}
                      frameBorder="0"
                      allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      title={video.title}
                    />
                  ) : (
                    <video
                      className="absolute inset-0 w-full h-full object-cover"
                      controls
                      src={video.url}
                    >
                      Your browser does not support the video tag.
                    </video>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white truncate">{video.title}</h3>
                  <p className="text-sm text-slate-400 mt-2 line-clamp-2">{video.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 shadow-2xl rounded-2xl p-8">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-3xl font-bold text-white">Manage Learning Fields</h2>
            <div className="flex items-center gap-3">
              <select
                value={newField}
                onChange={(e) => setNewField(e.target.value)}
                className="bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>Select a field</option>
                {predefinedFields.map((field) => (
                  <option key={field} value={field}>{field}</option>
                ))}
              </select>
              <button
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2 rounded-lg shadow-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 flex items-center gap-2"
                onClick={handleAddField}
              >
                <FiPlus /> Add Field
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {fields.map((field) => (
              <div
                key={field._id}
                className={`p-6 rounded-xl shadow-lg cursor-pointer transition-all duration-300 hover:scale-105 ${
                  selectedField?._id === field._id
                    ? 'bg-gradient-to-br from-blue-600 to-blue-700 text-white'
                    : 'bg-slate-900/70 border border-slate-700 text-slate-200 hover:border-blue-500'
                }`}
                onClick={() => handleFieldClick(field)}
              >
                <h3 className="text-xl font-bold text-center">{field.name}</h3>
              </div>
            ))}
          </div>
        </div>

        {selectedField && (
          <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 shadow-2xl rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-3xl font-bold text-white">{selectedField.name} Topics</h2>
            </div>

            <div className="flex gap-3 mb-6">
              <input
                type="text"
                value={newTopic}
                onChange={(e) => setNewTopic(e.target.value)}
                placeholder="Enter new topic"
                className="flex-1 bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                className="bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-2 rounded-lg shadow-lg hover:from-green-700 hover:to-green-800 transition-all duration-300 flex items-center gap-2"
                onClick={handleAddTopic}
              >
                <FiPlus /> Add Topic
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {topics[selectedField.name]?.map((topic, index) => (
                <div
                  key={index}
                  className="p-6 bg-slate-900/70 border border-slate-700 text-slate-200 rounded-xl shadow-lg cursor-pointer hover:border-green-500 hover:scale-105 transition-all duration-300"
                  onClick={() => handleUploadVideo(topic)}
                >
                  <h3 className="text-xl font-bold text-center">{topic.name}</h3>
                </div>
              ))}
            </div>
          </div>
        )}

        {selectedTopic && (
          <form onSubmit={handleSubmitVideo} className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 shadow-2xl rounded-2xl p-8">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-white flex items-center gap-3">
                <FiUpload className="text-blue-400" />
                Upload Video to {selectedTopic.name}
              </h3>
              <button
                type="button"
                onClick={() => setSelectedTopic(null)}
                className="text-slate-400 hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="flex gap-4 mb-4">
                <button
                  type="button"
                  onClick={() => setUploadMode("url")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    uploadMode === "url"
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  YouTube URL
                </button>
                <button
                  type="button"
                  onClick={() => setUploadMode("file")}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    uploadMode === "file"
                      ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
                      : 'bg-slate-700 text-slate-300 hover:bg-slate-600'
                  }`}
                >
                  Upload File
                </button>
              </div>

              <div>
                <label className="block text-slate-300 font-semibold mb-2">Video Title</label>
                <input
                  type="text"
                  name="title"
                  value={videoDetails.title}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              {uploadMode === "url" ? (
                <div>
                  <label className="block text-slate-300 font-semibold mb-2">YouTube URL</label>
                  <input
                    type="url"
                    name="url"
                    value={videoDetails.url}
                    onChange={handleInputChange}
                    className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required={uploadMode === "url"}
                  />
                </div>
              ) : (
                <div>
                  <label className="block text-slate-300 font-semibold mb-2">Video File</label>
                  <div className="relative">
                    <input
                      type="file"
                      accept="video/*"
                      onChange={handleFileChange}
                      className="hidden"
                      id="video-upload"
                    />
                    <label
                      htmlFor="video-upload"
                      className="flex items-center justify-center w-full bg-slate-900 border-2 border-dashed border-slate-600 text-slate-300 rounded-lg px-4 py-8 cursor-pointer hover:border-blue-500 transition-colors"
                    >
                      <div className="text-center">
                        <FiUpload className="mx-auto text-4xl mb-2" />
                        <p className="font-semibold">
                          {videoFile ? videoFile.name : 'Click to upload video'}
                        </p>
                        <p className="text-sm text-slate-500 mt-1">MP4, WebM, OGG (max 500MB)</p>
                      </div>
                    </label>
                  </div>
                </div>
              )}

              <div>
                <label className="block text-slate-300 font-semibold mb-2">Video Description</label>
                <textarea
                  name="description"
                  value={videoDetails.description}
                  onChange={handleInputChange}
                  className="w-full bg-slate-900 border border-slate-600 text-white rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="4"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={isUploading}
                className={`w-full py-4 rounded-lg font-semibold text-white shadow-lg transition-all duration-300 ${
                  isUploading
                    ? 'bg-slate-600 cursor-not-allowed'
                    : 'bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800'
                }`}
              >
                {isUploading ? 'Uploading...' : 'Upload Video'}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default Admin;
