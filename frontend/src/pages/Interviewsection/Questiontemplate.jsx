
import { CgSandClock } from "react-icons/cg";
import { Link } from "react-router-dom";
import { FaEye, FaPencilAlt } from 'react-icons/fa';
import { useState } from "react";



const QuestionTemplate = ({exp}) => {

    const[showanswer,setshowanswer] = useState(false);
    const exp1 = {
      answers: "Functional programming is based on mathematical functions and avoids changing-state and mutable data.",
      questions: "What are the key differences between functional and object-oriented programming?",
    };

      return(
        <div  className=" w-[95%]  flex flex-row bg-slate-800 p-2 mb-4 rounded-lg shadow">
        
                    
                    <div className=" w-[100%]  sm:w-[75%] flex flex-col  mt-5" >

                            {/* QUESTION AND ANSWER P TAG */}
                        <p className="  flex flex-row  justify-start items-center text-white   text-xl  font-bold "> <strong className=" text-xl  font-normal"> Question: </strong> {exp.questions}</p>
                         { showanswer && 
                           
                           <p  className="flex flex-row  justify-start items-center text-white text-xl " ><strong>Answers:</strong> {exp.answers}</p>
                              
                         }

                           {/* SEE ANSWER AND PRACTICE  ANSWER BUTTON */}
                             <div className=" mt-3 flex flex-row  justify-center items-center gap-10">

                             <div   onClick={() => setshowanswer(prev => !prev)}
                            style={{ textDecoration: 'none' }} // Ensure no underline
                               className= " flex items-center cursor-pointer   bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105  hover:text-white focus:outline-none active:bg-orange-700" >
                              <FaEye className=" text-xl"  />{ showanswer ? 'CLOSE ANSWER':'SEE ANSWER'}
                           </div>

                           <Link        
                                    to={{
                                      pathname:'/practiceinterviewanswer',
                                      state: { exp2: { questions: "What is the capital of France?", answers: "Paris" } }
                                    }}
                                
                            style={{ textDecoration: 'none' }} // Ensure no underline
                               className= "  flex items-center  bg-orange-500 hover:bg-orange-600 text-white py-3 px-4 rounded-lg shadow-lg transition-transform transform hover:scale-105  hover:text-white focus:outline-none active:bg-orange-700" >
                            <CgSandClock className=" text-xl"  /> PRACTICE ANSWER
                           </Link>
                                          
                             </div>

                          {/* ASKED TO COMPANY NAME ,SKILL TAGES */}

                          <div className="flex flex-row justify-around items-center space-x-2 py-2">
                           


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

                    <div className="flex flex-col  justify-center items-center">
                        
                     {/*Domain*/}
                    <span className="font-medium text-white">Domain: #{exp.Domain}</span>

                     {/* Skill */}
                   <span className=" font-medium text-blue-500">Experience Level: #{exp.ExperienceLevel}</span>

                     {/* question type */}
                   <span className=" font-medium text-white">Difficulty level: #{exp.difficulty}</span>

                    </div>

                     
        </div>
      )
};

export default QuestionTemplate;