import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import axios from "axios";


const ExplorenontechCourse = () => {
  const { state } = useLocation(); // Access state passed via React Router's Link
  const { field } = state || {}; // Destructure to get the field object from state
   console.log( "field:",field)
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [sidebarVisible, setSidebarVisible] = useState(false); // Track sidebar visibility

  // Function to update screen width
  const updateScreenWidth = () => {
    setScreenWidth(window.innerWidth);
    // if(screenWidth>768){
    //          setSidebarVisible(false);
    // }
  };
 
      const [SubTopicnameid, setSelectedSubtopicid] = useState(field.subtopic[0]._id);
       const[loading,setloading] = useState(true);
       const [courses, setCourses] = useState([]);
   const handlesubtopicclick =  async(NonTechSubTopicnameid)=>{
           
    setloading(true);
    try {
        const response = await axios.post('http://localhost:5001/nontech/getnontechsubtopic',{NonTechSubTopicnameid});
  
        if (response.data) {
          setCourses(response.data.data); // Store the courses in state
          console.log(response.data.data);
          setloading(false);
        }
      } catch (error) {
        console.error('Error fetching courses:', error);
        setError('Failed to fetch courses.');
        toast.error('Failed to fetch courses');
      } 
    
            
       
                   
   }

    useEffect( ()=>{
                   
          console.log("id:",SubTopicnameid);
               handlesubtopicclick(field.subtopic[0]._id);
    },[] )


  // useEffect to track window resizing
  useEffect(() => {
    window.addEventListener("resize", updateScreenWidth);

    // Cleanup the event listener
    return () => window.removeEventListener("resize", updateScreenWidth);
  }, []);

  // Toggle sidebar visibility for smaller screens
  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };



  return (
    <div className="bg-bg-dark min-h-screen flex flex-col">
      {/* Header Section */}
      <div className="mt-10  flex flex-row justify-center gap-4 items-start">
        {screenWidth <= 768 && (
          <div
            className="cursor-pointer text-white"
            onClick={toggleSidebar} // Handle click to toggle sidebar visibility
          >
            ☰
          </div>
        )}
        <p className="w-[85%] text-center text-[14px] md:text-[24px] text-white font-medium  overflow-hidden relative overflow-x-auto">
          <span>{field.branchname}</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="flex flex-row flex-nowrap relative min-h-screen">


        {/* Sidebar */}
        {sidebarVisible || screenWidth > 768 ? (
          <div
          className={`${
            screenWidth > 768
              ? "w-[23%] h-screen sticky top-0"
              : `w-[80%] h-full ${sidebarVisible ? "translate-x-0" : "-translate-x-full"} absolute left-0 top-0 z-10 bg-bg-dark`
          } overflow-y-auto border-r-4 border-cyan-900 transition-transform transform`}
          >
                 {/* {  show subtopic here} */}
                        <p className=" text-2xl font-bold m-4 text-white">Select Subtopic</p>
                         <ul className="gap-3 space-y-4 list-disc pl-6">
                              
                         {field.subtopic.map((subtopic, index) => {
                            return <li
                            className={`cursor-pointer  font-medium  ${SubTopicnameid === subtopic._id ? 'text-cyan-600' : 'text-white'}`}
                            onClick={() => {
                              setSelectedSubtopicid(subtopic._id);
                              handlesubtopicclick(subtopic._id);
                            }}
                            key={index}
                          >
                            {subtopic.subtopicname}
                          </li>
                          })}


                         </ul>




          </div>
        ) : null}



        {/* Main Content */}
        <div className=" w-[95%] md:w-[77%]  box-border">
          <div className="">
            <div className=" flex flex-col gap-4">
                               {/* show  video here */}
               
                               {loading ? (
                 <SkeletonTheme baseColor="#25273d" highlightColor="#444">
                 <div className="flex justify-center flex-wrap gap-4"> {/* Container for Skeletons */}
                   {[...Array(4)].map((_, index) => (
                     <div 
                       key={index} /* Add a unique key for each item */
                       className=" w-[95%] md:w-[85%] h-auto p-3  "
                     >
                       <Skeleton height={5} className="rounded-md" />
                        <Skeleton  height={5}  style={{  marginTop: "8px" }}       className="rounded-md"  />
                        <Skeleton  height={5}  style={{  marginTop: "8px" }}       className="rounded-md"  />
                        <Skeleton  height={5}  style={{  marginTop: "8px" }}       className="rounded-md"  />
                       <Skeleton  height={5}  style={{ marginTop: "8px" }}       className="rounded-md"  />
                     </div>
                   ))}
                 </div>
               </SkeletonTheme>
               
           
               ):(
   
                 
                  
                  courses.map((user,index)=>(

                    <div key={index} className=" flex flex-col gap-4" >
                     
                    <h3 className="  text-white pl-4  border-b-2 border-cyan-900 ">Contributed by : {user.user}</h3>
                      
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {user.videos.map((video) => (
                <div key={video._id} className="border-2 border-purple-600 shadow-xl rounded-lg px-2 pt-3">
                  <h3 className="text-xl font-semibold mb-1 ml-1 text-gray-50">{video.title}</h3>
                  <iframe
                    width="100%"
                    height="215"
                    loading='lazy'
                    src={`https://www.youtube.com/embed/${getYoutubeVideoId(video.url)}`}
                    title={video.title}
                    frameBorder="0"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>

                </div>

              ))}
                    </div>


                    </div>

                  ))  
                )
               
               
               }
                    


            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

//  function to extract video url 
const getYoutubeVideoId = (url) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : null;
  };

export default ExplorenontechCourse;
