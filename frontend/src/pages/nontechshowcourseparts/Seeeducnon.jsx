import React from 'react'
import { FiBookOpen } from "react-icons/fi";
import { PiStudentBold } from "react-icons/pi";
import { FaArrowRight } from "react-icons/fa";

import { Link } from 'react-router-dom';


const SeeEducationCardnon = ({field} ) => {
                  
 
  return (
   
   
                            <div className="p-5 m-2 rounded-md w-56 bg-gray-800 flex flex-col   justify-between  shadow-lg cursor-pointer ">
                                          <img
                                            className="rounded-lg hover:scale-105 duration-300"
                                            src="../../../public/contribute_img2.jpeg"
                                            alt="Web Development"
                                          />
                                          <h3 className="text-xl truncated-text font-bold text-white p-1">
                                          {field.branchname}
                                          </h3>
                                         

                                          
                            
                                          <Link to={`/explorenontech?branch=${field.branchname}`} state={{ field: field }} className="flex  hover:no-underline   no-underline flex-row justify-start items-center text-white bg-pink-600 p-3 m-1 rounded-lg hover:scale-105 cursor-pointer duration-200">
                                            <span className=" font-semibold ">
                                              Explore Course
                                            </span>
                            
                                            <span className=" font-semibold ">
                                              <FaArrowRight />
                                            </span>
                                          </Link>
                              
                                     </div>
   
   
  );
};

export default SeeEducationCardnon;