
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
        <div  className=" w-[95%]  flex flex-row bg-yellow-50 p-4 mb-4 rounded-lg shadow">
        
                    
                    <div className=" w-[100%]  sm:w-[75%] flex flex-col  mt-5" >

                            {/* QUESTION AND ANSWER P TAG */}
                        <p className="  flex flex-row  justify-start items-center text-stone-900  text-2xl  font-bold "> <strong className=" font-extrabold"> Question: </strong> {exp.questions}</p>
                         { showanswer && 
                           
                           <p  className="flex flex-row  justify-start items-center text-stone-900 text-lg " ><strong>Answers:</strong> {exp.answers}</p>
                              
                         }

                           {/* SEE ANSWER AND PRACTICE  ANSWER BUTTON */}
                             <div className=" mt-3 flex flex-row  justify-center items-center gap-10">

                             <div   onClick={() => setshowanswer(prev => !prev)}
                            style={{ textDecoration: 'none' }} // Ensure no underline
                               className= " flex items-center cursor-pointer   bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105  hover:text-white focus:outline-none active:bg-orange-700" >
                              <FaEye className=" text-2xl"  />{ showanswer ? 'CLOSE ANSWER':'SEE ANSWER'}
                           </div>

                           <Link        
                                    to={{
                                      pathname:'/practiceinterviewanswer',
                                      state: { exp2: { questions: "What is the capital of France?", answers: "Paris" } }
                                    }}
                                
                            style={{ textDecoration: 'none' }} // Ensure no underline
                               className= "  flex items-center  bg-orange-500 hover:bg-orange-600 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105  hover:text-white focus:outline-none active:bg-orange-700" >
                            <CgSandClock className=" text-2xl"  /> PRACTICE ANSWER
                           </Link>
                                          
                             </div>

                          {/* ASKED TO COMPANY NAME ,SKILL TAGES */}

                          <div className="flex flex-row justify-around items-center space-x-4 py-4">
                           


                             {/* Company */}
                            <span className="text-lg font-semibold text-gray-700">company: #{exp.companyName}</span>

                             {/* Skill */}
                            <span className="text-lg font-semibold text-blue-500">skill: #{exp.skill}</span>

                             {/* question type */}
                            <span className="text-lg font-semibold text-gray-700">Question Type: #{exp.questiontype}</span>

                             {/* Job role */}
                            <span className="text-lg font-semibold text-blue-500">Job role: #{exp.role}</span>

                        
                          </div>



                    </div >

                    <div className="flex flex-col  justify-center items-center">
                        
                     {/*Domain*/}
                    <span className="font-semibold text-gray-700">Domain: #{exp.Domain}</span>

                     {/* Skill */}
                   <span className=" font-semibold text-blue-500">Experience Level: #{exp.ExperienceLevel}</span>

                     {/* question type */}
                   <span className=" font-semibold text-gray-700">Difficulty level: #{exp.difficulty}</span>

                    </div>

                     
        </div>
      )
};

export default QuestionTemplate;