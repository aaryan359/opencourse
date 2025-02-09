import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaChevronDown } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

import EducationCardnon from './Educnon';


const Dummynontech = () => {
  const { token } = useSelector((state) => state.auth);
  const location = useLocation();
  const { subtopics } = location.state || { subtopics: [] };
  
  // State for handling form inputs
  const [videoURL, setVideoURL] = useState('');
  const [TitleofVideo, setTitleofVideo] = useState('');
  const [NonTechSubTopicname, setSelectedSubtopic] = useState('');
  const [qaPairs, setQAPairs] = useState([{ question: '', answer: '' }]);
  const [videos, setVideos] = useState([{ title: '', url: '' }]); // Video title and URL array
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');
  const [NontechFieldname, setNontechFieldname] = useState('');
  const [NontechBranchname, setNontechBranchname] = useState('');
  const [seefullform, setseefullform] = useState(false);
  // Handle question-answer changes
  const handleQAChange = (index, field, value) => {
    const newQAPairs = [...qaPairs];
    newQAPairs[index][field] = value;
    setQAPairs(newQAPairs);
  };
  //  all course usetsate
  const [courses, setCourses] = useState([]);

  // Handle video title and URL changes
  const handleVideoChange = (index, field, value) => {
    const newVideos = [...videos];
    newVideos[index][field] = value;
    setVideos(newVideos);
  };

  // Add more questions
  const handleAddQA = () => setQAPairs([...qaPairs, { question: '', answer: '' }]);

  // Add more videos
  const handleAddVideo = () => setVideos([...videos, { title: '', url: '' }]);



  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Validate inputs
    if (!NontechFieldname || !NontechBranchname || !NonTechSubTopicname || !videos.length || !qaPairs.length) {
      setError('Please provide all the required details.');
      return;
    }
        
    // Prepare data to send to backend
    const videoData = videos.map((video) => ({
      title: video.title,
      url: video.url,
    }));
  
    const qaData = qaPairs.map((qa) => ({
      question: qa.question,
      answer: qa.answer,
    }));
  
    // Prepare payload for backend request
    const payload = {
      NontechFieldname,
      NontechBranchname,
      NonTechSubTopicname,
      Videos: videoData, // Include video data in the payload
      qaPair: qaData,    // Include question-answer pairs in the payload
    };
  
    // Show loading toast
    const loadingToast = toast.loading('Uploading videos & QA...');
  
    try {
      // Make the API request to the backend
      const response = await axios.post('https://opencoursebackend.onrender.com/nontech/addnontechVideo', payload, {
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in Authorization header
        },
      });
  
      if (response.data.success) {
        // Show success toast
        toast.update(loadingToast, {
          render: 'Intialized a course successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 5000,
        });
  
        setSuccessMessage(response.data.message); // Show success message
  
        // Optionally reset form fields
        setNontechFieldname('');
        setNontechBranchname('');
        setSelectedSubtopic('');
        setVideos([{ title: '', url: '' }]); // Reset videos array
        setQAPairs([{ question: '', answer: '' }]); // Reset QA pairs
      }
    } catch (error) {
      console.error('Error in submitting form:', error);
      // Show error toast
      toast.update(loadingToast, {
        render: 'Failed to upload video & QA',
        type: 'error',
        isLoading: false,
        autoClose: 5000,
      });
      setError('Failed to upload video & QA');
    }
  };
  
    // Function to fetch all courses
    const fetchCourses = async () => {
     
      try {
        const response = await axios.get('https://opencoursebackend.onrender.com/nontech/getnontechcourse');
  
        if (response.data) {
          setCourses(response.data.nontechcourses); // Store the courses in state
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses.');
        toast.error('Failed to fetch courses');
      } 
    };
  
    // Fetch the courses on component mount
    useEffect(() => {
      fetchCourses();
    }, []);



  return (

          <div className=' bg-bg-dark'>
    <div className="flex flex-col   justify-center items-center mt-20  ">

          






      {/* Initialize new course */}
      <form onSubmit={handleSubmit} className="  w-[75%] bg-gray-800 border rounded-lg  shadow-md">

       <div className=' flex flex-row p-2 pl-3   justify-between items-center  w-full   rounded-lg focus:outline-none focus:ring-2' >
                     <h2 className=" text-center text-xl text-white font-light  mb-2">Initialize course & Start contributing</h2> 
                      <CiCirclePlus className=' hover:text-yellow-400 mr-4 text-2xl text-white' onClick={ ()=>{setseefullform(!seefullform)}} /> 
      </div> 
          { seefullform &&
          <div className="p-6 w-[100%] ">

        
        {/* Category Name */}
        <div className="mb-4  ">
          <label className="block text-lg text-white font-medium mb-2">Category Name</label>
          <input
            type="text"
            value={NontechFieldname}
            onChange={(e) => setNontechFieldname(e.target.value)}
            placeholder="Enter Category Name"
            className="w-full p-3   border  rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Course Name */}
        <div className="mb-4">
          <label className="block text-white text-lg font-medium mb-2">Course Name</label>
          <input
            type="text"
            value={NontechBranchname}
            onChange={(e) => setNontechBranchname(e.target.value)}
            placeholder="Enter Course Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Subtopic Input */}
        <div className="mb-4">
          <label className="block text-white text-lg font-medium mb-2">Add Subtopic</label>
          <input
            type="text"
            value={NonTechSubTopicname}
            onChange={(e) => setSelectedSubtopic(e.target.value)}
            placeholder="Enter Subtopic Name"
            className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            required
          />
        </div>

        {/* Video Title and URL Input */}
        <label className="block text-lg font-medium text-white mb-2">Title and URL of Video</label>
        {videos.map((video, index) => (
          <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
            {/* Video Title */}
            <input
              type="text"
              value={video.title}
              onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
              placeholder={`Video Title ${index + 1}`}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
            {/* Video URL */}
            <input
              type="url"
              value={video.url}
              onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
              placeholder={`Video URL ${index + 1}`}
              className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
        ))}
        <button
          type="button"
          className="bg-yellow-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300"
          onClick={handleAddVideo}
        >
          Add More Videos
        </button>

        {/* Questions and Answers */}
        <div className="mt-6">
          <label className="block text-xl text-white font-medium mb-4">Upload Questions and Answers</label>
          {qaPairs.map((qa, index) => (
            <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
              <input
                type="text"
                value={qa.question}
                onChange={(e) => handleQAChange(index, 'question', e.target.value)}
                placeholder={`Question ${index + 1}`}
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
              <input
                type="text"
                value={qa.answer}
                onChange={(e) => handleQAChange(index, 'answer', e.target.value)}
                placeholder="Answer"
                className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
          ))}
          <button
            type="button"
            className="bg-yellow-500 text-white py-2 px-6 rounded-full shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300"
            onClick={handleAddQA}
          >
            Add More Questions
          </button>
        </div>

        {/* Submit Button */}
        <div className="text-center mt-6">
          <button
            type="submit"
            className="bg-blue-600 text-white py-3 px-8 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
          >
            Upload Video & QA
          </button>
        </div>

        

          </div>}


      </form>

         {/*   contributed in one of the course} */}

                
         <div className="flex justify-start w-[75%] flex-wrap gap-6">
      {/* Map through courses and render EducationCardnon */}
      {courses.map((course) => (
        <EducationCardnon field={course} key={course._id} />
      ))}
        </div>


    </div>
    </div>
  );
};

export default Dummynontech;