
import { CgSandClock } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FaEye, FaPencilAlt } from 'react-icons/fa';
import { useState } from "react";
import parse from 'html-react-parser';



const QuestionTemplate = ({exp}) => {

 

  const[showanswer,setshowanswer] = useState(true);

      return(


        <div  className=" w-[90%] bg-black  flex flex-row  p-2 mb-4 rounded-lg shadow">
        
                    
                    <div className=" w-[100%]  ml-5 pl-5 flex flex-col   mt-5" >

                            {/* QUESTION AND ANSWER P TAG */}
                        <p className="  flex flex-row  justify-start items-center text-white   text-xl  font-bold "> <strong className=" text-xl text-blue-600 font-bold"> Question: </strong> {exp.questions}</p>
                         <hr />
                         { showanswer && 
                           
                           <div className="flex flex-row justify-start items-center text-white text-lg">
                           {parse(exp.answers)} 

                         </div>
                              
                         }



    
                          {/* ASKED TO COMPANY NAME ,SKILL TAGES */}

                          <div className="flex flex-row justify-start items-center space-x-2 mt-3 ">
                           


                             {/* Company */}
                            <span className="text-xs font-medium text-white">company: #{exp.companyName}</span>

                             {/* Skill */}
                            <span className="text-xs font-medium text-blue-500">skill: #{exp.skill}</span>

                             {/* question type */}
                            <span className="text-xs font-medium text-white">Question Type: #{exp.questiontype}</span>

                             {/* Job role */}
                            <span className="text-xs font-medium text-blue-500">Job role: #{exp.role}</span>

                        
                          </div>



                    </div >


                     
        </div>


      )
};

export default QuestionTemplate;