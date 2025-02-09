import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaChevronDown } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import Subform from './Subform';






// Component to add non-technical subtopics with video and QA contributions
const Addsubtopicnontech = () => {

    const { token } = useSelector((state) => state.auth);
    const { state } = useLocation(); // Access state passed via React Router's Link
    const { field } = state || {}; // Destructure to get the field object from state

   
  
    // State variables for managing inputs and UI state
    const [NonTechSubTopicnameid, setSelectedSubtopicid] = useState(''); // ID of the selected subtopic
    const [qaPairs, setQAPairs] = useState([{ question: '', answer: '' }]); // Array for QA pairs
    const [videos, setVideos] = useState([{ title: '', url: '' }]); // Array for videos with title and URL
    const [seefullform, setseefullform] = useState(false); // Toggle visibility of the form
    const [seefullform2, setseefullform2] = useState(false); // Toggle visibility of the form
    const [error, setError] = useState(null); // Store error messages

    const [fieldid, setfieldid] = useState(''); // Store id 
     

     const [NonTechSubTopicname, setSelectedSubtopic] = useState('');
     
  
    // Handle changes in QA pairs
    const handleQAChange = (index, field, value) => {
      const newQAPairs = [...qaPairs];
      newQAPairs[index][field] = value; // Update the specific field (question/answer) in the QA pair
      setQAPairs(newQAPairs); // Update state
    };
  
    // Handle changes in video details
    const handleVideoChange = (index, field, value) => {
      const newVideos = [...videos];
      newVideos[index][field] = value; // Update the specific field (title/URL) in the video
      setVideos(newVideos); // Update state
    };
  
    // Add a new empty QA pair
    const handleAddQA = () => setQAPairs([...qaPairs, { question: '', answer: '' }]);
  
    // Add a new empty video entry
    const handleAddVideo = () => setVideos([...videos, { title: '', url: '' }]);
  
    // Handle form submission
    const handleSubmit = async (e) => {
      e.preventDefault();
  
      // Validate form inputs
      if ( !videos.length || !qaPairs.length) {
        setError('Please provide all the required details.');
        return;
      }
  
      // Prepare the payload for API request
      const payload = {
        fieldid,
        NonTechSubTopicname,
        NonTechSubTopicnameid,
        Videos: videos.map(video => ({ title: video.title, url: video.url })), // Format videos
        qaPair: qaPairs.map(qa => ({ question: qa.question, answer: qa.answer })), // Format QA pairs
      };
               const loadingToast = toast.loading('Uploading videos & QA...');
      try {
        // Send API request to add subtopic contributions
        const response = await axios.post('https://opencoursebackend.onrender.com/nontech/addNonTechSubtopic', payload, {
          headers: {
            Authorization: `Bearer ${token}`, // Include authentication token
          },
        });
  
        // Reset form on successful submission
        if (response.data.success) {
             
                    // Show success toast
                    toast.update(loadingToast, {
                      render: 'uploaded successfully!',
                      type: 'success',
                      isLoading: false,
                      autoClose: 5000,
                    });
            setSelectedSubtopic('');
          setSelectedSubtopicid('');
          setVideos([{ title: '', url: '' }]);
          setQAPairs([{ question: '', answer: '' }]);
        }
      } catch (error) {
        console.error('Error in submitting form:', error);
        toast.update(loadingToast, {
                render: 'Failed to upload video & QA',
                type: 'error',
                isLoading: false,
                autoClose: 5000,
              });
      }
    };

   
      
    useEffect(() => {
        if (field) {
            setfieldid(field._id);

        }
      }, [field]);  // Ensures state is set only when field changes
      
  
    return (

      <div className=' bg-bg-dark' >
      <div className="text-4xl pl-16 pr-16 w-[100%] mt-40">
        <div className="flex flex-col items-center justify-center">
          {/* Section Header */}
          
            
          <p className=' mt-4 mb-3  font-medium text-white'> Course Name : {field.branchname}</p>
           

                 {/* form to add new subtopic */}
                  <form onSubmit={handleSubmit} className="  w-[75%] bg-gray-800 border rounded-lg  shadow-md">
                 
                    <div className=' flex flex-row p-2 pl-3   justify-between items-center  w-full   rounded-lg focus:outline-none focus:ring-2' >
                                         <h2 className=" text-center text-xl text-white font-light  mb-2">Add New Subtopic</h2> 
                                          <CiCirclePlus className=' hover:text-yellow-400 cursor-pointer mr-4 text-2xl text-white' onClick={ ()=>{setseefullform(!seefullform)}} /> 
                          </div>   { seefullform &&
                           <div className="p-4 w-[100%] ">
                 
                         
                      
                 
                         {/* Subtopic Input */}
                         <div className="mb-2">
                           <label className="block text-white text-lg font-medium mb-2">Add Subtopic</label>
                           <input
                             type="text"
                             value={NonTechSubTopicname}
                             onChange={(e) => setSelectedSubtopic(e.target.value)}
                             placeholder="Enter Subtopic Name"
                             className="w-full h-10 p-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500" required
                           />
                         </div>
                 
                         {/* Video Title and URL Input */}
                         <label className="block text-lg text-white font-medium mb-2">Title and URL of Video</label>
                         {videos.map((video, index) => (
                           <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
                             {/* Video Title */}
                             <input
                               type="text"
                               value={video.title}
                               onChange={(e) => handleVideoChange(index, 'title', e.target.value)}
                               placeholder={`Video Title ${index + 1}`}
                               className="flex-1 h-10 p-3 border text-sm rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                               required
                             />
                             {/* Video URL */}
                             <input
                               type="url"
                               value={video.url}
                               onChange={(e) => handleVideoChange(index, 'url', e.target.value)}
                               placeholder={`Video URL ${index + 1}`}
                               className="flex-1 h-10 p-3 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                               required
                             />
                           </div>
                         ))}
                         <button
                           type="button"
                           className="bg-yellow-500 text-sm text-white py-2 px-6 rounded-full shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300"
                           onClick={handleAddVideo}
                         >
                           Add More Videos
                         </button>
                 
                         {/* Questions and Answers */}
                         <div className="mt-6">
                           <label className="block text-white text-xl font-medium mb-4">Upload Questions and Answers</label>
                           {qaPairs.map((qa, index) => (

                             <div key={index} className="flex flex-col md:flex-row gap-4 mb-4">
                               <input
                                 type="text"
                                 value={qa.question}
                                 onChange={(e) => handleQAChange(index, 'question', e.target.value)}
                                 placeholder={`Question ${index + 1}`}
                                 className="flex-1 p-3 h-10 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                 required
                               />
                               <input
                                 type="text"
                                 value={qa.answer}
                                 onChange={(e) => handleQAChange(index, 'answer', e.target.value)}
                                 placeholder="Answer"
                                 className="flex-1 p-3 border text-sm h-10 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                                 required
                               />
                             </div>
                           ))}
                           <button
                             type="button"
                             className="bg-yellow-500 text-sm text-white py-2 px-4 rounded-full shadow-lg hover:bg-yellow-600 transform hover:scale-105 transition-all duration-300"
                             onClick={handleAddQA}
                           >
                             Add More Questions
                           </button>
                         </div>
                 
                         {/* Submit Button */}
                         <div className="text-center mt-6">
                           <button
                             type="submit"
                             className="bg-blue-600 text-white py-3 px-2 rounded-full shadow-lg hover:bg-blue-700 transform hover:scale-105 transition-all duration-300"
                           >
                             Upload Video & QA
                           </button>
                         </div>
                 
                         
                 
                           </div>}
                 
                 
                 </form>


            
          <p className=' mt-4 mb-3 font-medium text-white'>Contribute in pre-existing subtopic with your own video</p>
  
          {/* Iterate over subtopics passed from state */}
          {field?.subtopic?.map(sub => (

                   <Subform
                              key={sub._id} // Ensure to add a unique key
                              sub= {sub}
                              
                   />

          ))}
        </div>
      </div>

      </div>
    );
  };
  
  export default Addsubtopicnontech;