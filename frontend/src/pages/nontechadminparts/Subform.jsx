import React, { useState,useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FaChevronDown } from "react-icons/fa";
import { CiCirclePlus } from "react-icons/ci";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';



const  Subform = ({sub})=>{

           const { token } = useSelector((state) => state.auth);
           console.log("sub name is:",sub._id);
           const NonTechSubTopicnameid = sub._id;
           // ID of the selected subtopic
    console.log("NonTechSubTopicnameid name is:",NonTechSubTopicnameid);
        const [qaPairs, setQAPairs] = useState([{ question: '', answer: '' }]); // Array for QA pairs
        const [videos, setVideos] = useState([{ title: '', url: '' }]); // Array for videos with title and URL
        const [seefullform2, setseefullform2] = useState(false); // Toggle visibility of the form
       
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
          
          const response = await axios.post('http://localhost:5001/nontech/addNonTechSubtopic', payload, {
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
  

     return(



 <div  className="flex flex-col w-[75%] mb-4 gap-4">
             
  
              {/* Form for adding video and QA contributions */}
              <form
                onSubmit={(e) => {
                 
                  handleSubmit(e); // Handle form submission
                }}
                className="  w-[100%] bg-gray-800 border rounded-lg  shadow-md"
              >
                <div className=' flex flex-row p-2 pl-3   justify-between items-center  w-full   rounded-lg focus:outline-none focus:ring-2' >
                                <h2 className=" text-center text-xl text-white font-light  mb-2">Subtopic Name : {sub.subtopicname}</h2> 
                                <CiCirclePlus className=' hover:text-yellow-400 cursor-pointer mr-4 text-2xl text-white' onClick={ ()=>{setseefullform2(!seefullform2)}} /> 
                   </div>
  
                {/* Conditional rendering of the form */}
                {seefullform2 && (
                  <div className="p-6 w-[100%]">
                    {/* Video Input Section */}
                    <label className="block text-white text-lg font-medium mb-2">Title and URL of Video</label>
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
                  </div>
                )}
              </form>

      </div>






     )
}

export default  Subform ;