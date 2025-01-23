import React from 'react';
import { useLocation } from 'react-router-dom';
import {useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useSelector } from 'react-redux';



const SubTopicPage = () => {

  
  const{token} =  useSelector(  (state)=>state.auth );
  const location = useLocation();
  const { subtopics } = location.state || { subtopics: [] }; 
  const [videoURL, setVideoURL] = useState('');
  const [TitleofVideo, setTitleofVideo] = useState('');
  const [NonTechSubTopicname, setSelectedSubtopic] = useState('');
  const [qaPairs, setQAPairs] = useState([{ question: '', answer: '' }]);
  const [videos, setVideos] = useState([]);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState('');

  const { fieldname, topicname } = useParams();

  const [NontechFieldname, setNontechFieldname] = useState('');
  const [NontechBranchname, setNontechBranchname] = useState('');



  const handleAddQA = () => setQAPairs([...qaPairs, { question: '', answer: '' }]);

  const handleQAChange = (index, field, value) => {
    const newQAPairs = [...qaPairs];
    newQAPairs[index][field] = value;
    setQAPairs(newQAPairs);
  };

   
  const  url = videoURL ;
  const  qaPair = qaPairs;

  const handleSubtopicClick = (subtopic) => {
    setSelectedSubtopic(subtopic); // Update the selected subtopic
  };


  const handleUpload = async () => {
    if (!videoURL || !qaPairs[0].question || !qaPairs[0].answer) {
      setError('Please provide a valid video URL and at least one question-answer pair.');
      return;
    }
    if(NonTechSubTopicname===''){

                toast.error(" Please select  one Subtopic");
                return;
            
    }
  
    // Create the data object to send to the API
    
    const loadingToastId = toast.loading('Uploading, please wait...'); // Show loading toast
    try {
      const response = await axios.post('http://localhost:5001/nontech/addnontechVideo', {NontechFieldname,NontechBranchname,NonTechSubTopicname,TitleofVideo,url,qaPair},{
        headers: {
          Authorization: `Bearer ${token}`, // Include the token in Authorization header
        },
      });
  
      if (response.status === 200) {

        toast.update(loadingToastId, {
          render: 'Video and Q&A uploaded successfully!',
          type: 'success',
          isLoading: false,
          autoClose: 3000, // Close after 3 seconds
        });




        setSuccessMessage('Video and Q&A uploaded successfully!');
        setVideoURL('');
        setQAPairs([{ question: '', answer: '' }]);
        setTitleofVideo('');
        setError(''); // Clear any previous error messages
      } else {
        setError('Failed to upload. Please try again.');
      }
    } catch (error) {
      console.error('Upload error:', error);
      setError('An error occurred while uploading. Please try again later.');
      toast.update(loadingToastId, {
        render: 'An error occurred while uploading. Please try again later.',
        type: 'error',
        isLoading: false,
        autoClose: 3000,
      });
    }
  }

  useEffect(() => {
    setNontechFieldname(fieldname);
    setNontechBranchname(topicname);
  }, [fieldname, topicname]);


  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-lg rounded-md">
      <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">Subtopics </h1>

      {subtopics.length > 0 ? (
        <ul className="flex flex-wrap justify-center gap-4">
          {subtopics.map((subtopic, index) => (
            <li key={index}
            onClick={() => handleSubtopicClick(subtopic)}
            className={`py-3 px-6 rounded-full shadow-lg cursor-pointer 
              transition-transform duration-300 transform hover:scale-105
              ${
                NonTechSubTopicname === subtopic
                  ? 'bg-green-600 text-white' // Selected state styles
                  : 'bg-red-600 text-white hover:bg-red-400' // Default state styles
              }`}
              

                

              >{subtopic}</li>
          ))}
        </ul>
      ) : (
        <p className="text-center">No subtopics available for this topic.</p>
      )}

          <div className="mt-8 space-y-6 bg-gray-100 p-6 rounded-lg">  
                    
            
                    <div>
                        <label className="block text-xl font-medium mb-2">Upload Video Title  </label>
                        <input
                          type="text"
                          value={TitleofVideo}
                          onChange={(e) => setTitleofVideo(e.target.value)}
                          placeholder="Enter video Title"
                          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-xl font-medium mb-2">Upload Video URL for </label>
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


       
    </div>
  );
  };

 
 

 


export default SubTopicPage;
