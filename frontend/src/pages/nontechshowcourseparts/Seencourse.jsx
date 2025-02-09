import { useEffect, useState } from "react";
import { IoIosArrowForward } from "react-icons/io";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import SeeEducationCardnon from "./Seeeducnon";
import axios from "axios";
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'

import { ShimmerSimpleGallery } from "react-shimmer-effects";


const Seencourse = ()=>{
      //  all course usetsate
       const [courses, setCourses] = useState([]);
       const[loading,setloading] = useState(true);

       
    // Function to fetch all courses
 const fetchCourses = async () => {
     
        try {
          const response = await axios.get('https://opencoursebackend.onrender.com/nontech/getnontechcourse');
    
          if (response.data) {
            setCourses(response.data.nontechcourses); // Store the courses in state
            setloading(false);
          }
        } catch (error) {
          console.error('Error fetching courses:', error);
          setError('Failed to fetch courses.');
          toast.error('Failed to fetch courses');
        } 
      };

      useEffect(() => {
            fetchCourses();
          }, []);

return(
      
  <div className="bg-bg-dark">

 
      <div className=" flex justify-center  " >

             <div className=" mt-10 p-2 text-white font-medium border-b-2 border-cyan-950 w-[85%] text-left"> Non Tech &gt; </div>




 {/*   explore in one of the course} */}

                
     <div className="flex justify-start w-[80%] flex-wrap gap-6">

                {/* Map through courses and render EducationCardnon */}
                {loading ? (
                 <SkeletonTheme baseColor="#25273d" highlightColor="#444">
                 <div className="flex justify-start flex-wrap gap-4"> {/* Container for Skeletons */}
                   {[...Array(6)].map((_, index) => (
                     <div 
                       key={index} /* Add a unique key for each item */
                       className="w-[250px] h-auto p-3  "
                     >
                       <Skeleton height={150} className="rounded-md" />
                        <Skeleton  height={5}  style={{ width: 50, marginTop: "8px" }}       className="rounded-md"  />
                        <Skeleton  height={5}  style={{  marginTop: "8px" }}       className="rounded-md"  />
                        <Skeleton  height={5}  style={{ width: 50, marginTop: "8px" }}       className="rounded-md"  />
                       <Skeleton  height={5}  style={{ marginTop: "8px" }}       className="rounded-md"  />
                     </div>
                   ))}
                 </div>
               </SkeletonTheme>
               
           ) : (
                       courses.map((course) => (
                        <SeeEducationCardnon field={course} key={course._id} />
                ))
               )}
        </div>






      </div>
     </div>

)
    
}

export default Seencourse;