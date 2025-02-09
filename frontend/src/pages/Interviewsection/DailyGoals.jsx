
import { useState ,useEffect} from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import QuestionTemplate from "./Questiontemplate";
import { FaChevronDown, FaChevronUp } from 'react-icons/fa'; // Install react-icons if not already

const DailyGoals = () => {
     
      const[DailyQuestions,setDailyQuestions] = useState(JSON.parse(localStorage.getItem('DailyQuestions')) || []);
      const [previousquestion,setpreviousquestion]= useState([]);
      const [showPreviousQuestions, setShowPreviousQuestions] = useState(false);

      const getpreviousquestion = async()=>{
                 
                 try{

                  const response =  await axios.post('https://opencoursebackend.onrender.com/Interview/getpreviousquestion',{userId});
                           setpreviousquestion(response.data.previousQuestions);
                                      
                 }catch(error){
                    
                  console.log("error while checking goal active or not ",error);
                 }
      }

       
             
        const{sighnupData} =   useSelector(  (state) => state.auth)
        const userId = sighnupData ? sighnupData._id:null;

        const [questionsPerDay, setQuestionsPerDay] = useState('');
          
      const [isVisible, setIsVisible] = useState(false);

      const toggleVisibility = () => {
        setIsVisible((prev) => !prev);
      };

      const [isMobile, setIsMobile] = useState(window.innerWidth < 640); // Determine if the screen width is less than 640px


      const [goalActive, setGoalActive] = useState(false); // Initial state for goal activity
          const[lastfetchedtime,setlastfetchedtime] = useState(null);


       const isgoalactive = async()=>{
                            
                     try{
                              const response =  await axios.post('https://opencoursebackend.onrender.com/Interview/isgoalactive',{userId});
                                   console.log("goal active:",response);
                                if( response.data.existingGoal){
                                               
                                    setGoalActive(response.data.existingGoal.active);
                                    setQuestionsPerDay(response.data.existingGoal.questionsPerDay);
                                    setlastfetchedtime(response.data.existingGoal.lastFetchedTime);
                               
                                  

                        if(response.data.existingGoal.active){

                              const response2 =  await axios.post('https://opencoursebackend.onrender.com/Interview/getdailyquestion',{userId});
                              if( response2){
                                    console.log(" response 2 is : ",response2);

                                    if(response2.data.message ==="Less than 24 hours since last fetch."){
                                           
                                    }else{
                                           
                                          localStorage.setItem('DailyQuestions', JSON.stringify(response2.data.questions));

                                        
                                    }
                                   
                                    
                              }
                              
                        }

                  }
                              
                                     
                     }catch(error){
                              
                        console.log("error while checking goal active or not ",error);
                     }
       }

      const toggleGoal = async () => {

                if( goalActive){
                                 
                  //   stop daily goal
                         

                  try{
                        
                        const response =  await axios.post('https://opencoursebackend.onrender.com/Interview/stopdailygoals', {userId});

                        localStorage.setItem('DailyQuestions', JSON.stringify([]));
                        setDailyQuestions(JSON.parse(localStorage.getItem('DailyQuestions')));
                        
                        if(response){
                               
                              toast.success('Daily Goal stop successfully!', {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    draggable: true,
                                    progress: undefined,
                                });

                                setGoalActive(!goalActive); // Toggle the state
                        }


                  }catch(error){
                         
                          console.log("error while stoping goal",error);
                          toast.error('Error while stoping Daily Goals!', {
                              position: "top-right",
                              autoClose: 3000,
                              hideProgressBar: false,
                              closeOnClick: true,
                              draggable: true,
                              progress: undefined,
                          });

                  }
                           
                  
                   
                }
                else{

                         // start daily goal
                         try{
                              const userId = sighnupData ? sighnupData._id : null
                              console.log( " signup  data is: ",sighnupData._id)
                              if(!questionsPerDay){
                                    toast.error(' Please enter the number of question ', {
                                          position: "top-right",
                                          autoClose: 3000,
                                          hideProgressBar: false,
                                          closeOnClick: true,
                                          draggable: true,
                                          progress: undefined,
                                      });
                              }

                              const response =  await axios.post('https://opencoursebackend.onrender.com/Interview/setdailygoal',{userId,questionsPerDay,formData});
                              
                              if(response){
                                     
                                    
                                  
                                    const response2 =  await axios.post('https://opencoursebackend.onrender.com/Interview/getdailyquestion',{userId});
                                    if( response2){
                                          console.log(" response 2 is : ",response2);

                                          localStorage.setItem('DailyQuestions', JSON.stringify(response2.data.questions));
                                          setDailyQuestions(JSON.parse(localStorage.getItem('DailyQuestions')));


                                          toast.success('Daily Goal set successfully!', {
                                                position: "top-right",
                                                autoClose: 3000,
                                                hideProgressBar: false,
                                                closeOnClick: true,
                                                draggable: true,
                                                progress: undefined,
                                            });
                                          setGoalActive(!goalActive); // Toggle the state
                                    }

                                   
                              }
      
      
                        }catch(error){
                               
                                console.log("error while stoping goal",error);
                                toast.error('Error while starting Daily Goals!', {
                                    position: "top-right",
                                    autoClose: 3000,
                                    hideProgressBar: false,
                                    closeOnClick: true,
                                    draggable: true,
                                    progress: undefined,
                                });
      
                        }



                }


           
          };

      const points = [
            'Users can set daily practice goals (e.g., Practice 2 questions daily)',
            'Users can customize the number of questions and filtered topics on which they want to practice',
            'Notifications sent via: Email, WhatsApp Text, In-app Notifications',
            'Smart reminders for missed days with encouraging messages',
            'Important point: whenever you click on start daily goal button  reselect your filtes again.',
      ];

    

  const handleInputChange = (e) => {
    setQuestionsPerDay(e.target.value);
  };


      const [companyNames, setCompanyNames] = useState([]);
      const [roles, setRoles] = useState([]);
      const [skills, setSkills] = useState([]);
      const [domains, setDomains] = useState([]);
      const [experienceLevels, setExperienceLevels] = useState([]);
      const [difficulties, setDifficulties] = useState([]);
      const [questionTypes, setQuestionTypes] = useState([]);

      const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
      const [formData, setFormData] = useState({
            companyName: '',
            role: '',
            skill:'',
            Domain:'',
            ExperienceLevel: '',
            difficulty:'',
            questiontype:'',
            
            
        });


        const [questions,setquestions] = useState([]);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value.toLowerCase()});
        };





        const fetchQuestions = async () => {
            try {
              const response = await axios.get('https://opencoursebackend.onrender.com/Interview/getQuestions');
              setquestions(response.data);
              setCompanyNames([...new Set(response.data.map(item => item.companyName.toLowerCase()))]);
          setRoles([...new Set(response.data.map(item => item.role.toLowerCase()))]);
          setSkills([...new Set(response.data.map(item => item.skill.toLowerCase()))]);
          setDomains([...new Set(response.data.map(item => item.Domain.toLowerCase()))]);
          setExperienceLevels([...new Set(response.data.map(item => item.ExperienceLevel.toLowerCase()))]);
          setDifficulties([...new Set(response.data.map(item => item.difficulty.toLowerCase()))]);
          setQuestionTypes([...new Set(response.data.map(item => item.questiontype.toLowerCase()))]);
                
              setLoading(false); // Turn off loading indicator
            } catch (err) {
              console.error('Error fetching questions:', err);
              setError('Failed to fetch questions. Please try again later.');
              setLoading(false);
            }
          };
        
          // Fetch questions on component mount
          useEffect(() => {
            fetchQuestions();
            isgoalactive();
            getpreviousquestion();
            
    
          }, []);
    
          const createOptions = (array) => {
            return array.map((item, index) => (
              <option key={index} value={item}>
                {item.charAt(0).toUpperCase() + item.slice(1)}
              </option>
            ));
          };


 // Update isMobile state on resize
 useEffect(() => {
      const handleResize = () => {
        setIsMobile(window.innerWidth < 640);
        if (window.innerWidth >= 640) {
          setIsVisible(true); // Show points when screen width is greater than or equal to 640
        } else {
          setIsVisible(false); // Hide points when screen width is less than 640
        }
      };
  
      window.addEventListener('resize', handleResize);
      
      // Cleanup listener on component unmount
      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, []);





      return(
            <div className=' flex flex-col   p-5 '>
            <h1 className="text-3xl font-bold mb-6 text-center">Welcome to Set Daily Goals Section</h1>
            
       <div className="my-2 p-2 bg-white rounded-lg">
      {/* Flex container for heading and arrow */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">
          Daily Practice Goal Features
        </h1>
        {/* Arrow to toggle points visibility */}
        <div 
          onClick={toggleVisibility} 
          className="text-lg text-blue-500 hover:underline cursor-pointer"
        >
          {isVisible ? '▲' : '▼'} {/* Arrow icon to indicate toggle */}
        </div>
      </div>

      {/* Show points if screen width is >= 640px or if isVisible is true */}
      <ul className={`list-disc list-inside space-y-4 ${isVisible ? 'block' : 'hidden md:block'}`}>
        {points.map((point, index) => (
          <li key={index} className="text-lg text-gray-700">
            {point}
          </li>
        ))}
      </ul>
        </div> 
         
         <div   className=" gap-5 flex flex-wrap justify-start bg-white p-8 rounded shadow-md mb-6  mx-auto" >

             {/* Button to Show All Questions */}

             

           
         <div className="mb-4">
         <label className="block mb-1 font-semibold" htmlFor="skill">By Technology/Skills</label>
         <select
             name="skill"
             id="skill"
             value={formData.skill}
             onChange={handleChange}
             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             required
             style={{ maxHeight: '100px', overflowY: 'auto' }}  // Limit height and enable scroll
         >
             
             <option value="">Select...</option>
             {createOptions(skills)}
         </select>
         </div>

         <div className="mb-4">
         <label className="block mb-1 font-semibold" htmlFor="Domain">By Industry/Domain</label>
         <select
             name="Domain"
             id="Domain"
             value={formData.Domain}
             onChange={handleChange}
             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             required
             style={{ maxHeight: '200px', overflowY: 'auto' }}  // Limit height and enable scroll
         >
             
             <option value="">Select...</option>
             {createOptions(domains)}
         </select>
         </div>

         <div className="mb-4">
                  <label className="block mb-1 font-semibold" htmlFor="companyName">By Company</label>
                  <select
                      name="companyName"
                      id="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ maxHeight: '200px', overflowY: 'auto' }}  // Limit height and enable scroll
                      required
                  >
                      
                      <option value="">Select...</option>
                      {createOptions(companyNames)}
                  </select>
                  </div>

         <div className="mb-4">
         <label className="block mb-1 font-semibold" htmlFor="role">By Job Role</label>
         <select
             name="role"
             id="role"
             value={formData.role}
             onChange={handleChange}
             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             required
             style={{ maxHeight: '200px', overflowY: 'auto' }}  // Limit height and enable scroll
         >
             
             <option value="">Select...</option>
             {createOptions(roles)}
         </select>
         </div>


         <div className="mb-4">

         <label className="block mb-1 font-semibold" htmlFor="questiontype">By Question Type</label>
         <select
             name="questiontype"
             id="questiontype"
             value={formData.questiontype}
             onChange={handleChange}
             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             required
         >
             
             <option value="">Select...</option>
             {createOptions(questionTypes)}
         </select>
         </div>

         <div className="mb-4">
         <label className="block mb-1 font-semibold" htmlFor="difficulty">By Difficulty Level</label>
         <select
             name="difficulty"
             id="difficulty"
             value={formData.difficulty}
             onChange={handleChange}
             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             required
         >
             
             <option value="">Select...</option>
             {createOptions(difficulties)}
         </select>
         </div>

         <div className="mb-4">
         <label className="block mb-1 font-semibold" htmlFor="interviewType">By Experience Level</label>
         <select
             name="ExperienceLevel"
             id="ExperienceLevel"
             value={formData.ExperienceLevel}
             onChange={handleChange}
             className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
             required
         >
             
             <option value="">Select...</option>
             {createOptions(experienceLevels)}
         </select>
         </div>

         <div className="mb-4">
          <label  htmlFor="questionsPerDay" className="block mb-1 font-semibold" > Questions Per Day </label>
          <input
            type="number"
            id="questionsPerDay"
            value={questionsPerDay}
            onChange={handleInputChange}
            placeholder="no of daily questions"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            min="1"
          />
        </div>

             
        <div className=" flex justify-center items-center">
      {/* Conditional rendering of buttons based on goalActive state */}
      {goalActive ? (


        
        <div onClick={toggleGoal}   className="  h-10 cursor-pointer  rounded bg-red-500 hover:bg-red-600  text-white p-2 m-0  flex justify-center items-center " >  Stop Daily Goal
        </div>
        

      ) : (
           
        <div onClick={toggleGoal} className="  h-10 cursor-pointer  rounded bg-green-500 hover:bg-green-600  text-white p-2 m-0  flex justify-center items-center "> Start Daily Goal
        </div>
      

      )}
    </div>

            
        </div>

        <div className=' flex flex-col  justify-start items-center'>
        <p className=" bg-lime-400 rounded-lg p-3 mb-2 text-3xl font-bold">Today Questions :- </p>
        {DailyQuestions.length === 0 ? (

                <p>No questions available</p> // Placeholder text if needed
            ) : (

                 

                DailyQuestions.map((exp, index) => (
                    <QuestionTemplate key={index} exp={exp} />
                ))
            )}

       </div>


        <div className='flex flex-col justify-start items-center'>
            <div
                className="bg-pink-300 p-2 rounded-lg mb-2 text-3xl font-bold cursor-pointer flex items-center"
                onClick={() => setShowPreviousQuestions(!showPreviousQuestions)}
            >
                Show Previous Questions
                {showPreviousQuestions ? (
                    <FaChevronUp className="ml-2" /> // Up arrow when open
                ) : (
                    <FaChevronDown className="ml-2" /> // Down arrow when closed
                )}
            </div>

            {showPreviousQuestions && (
                <div className="previous-questions">
                    {previousquestion.length === 0 ? (
                        <p>No questions available</p>
                    ) : (
                        previousquestion.map((exp, index) => (
                            <QuestionTemplate key={index} exp={exp} />
                        ))
                    )}
                </div>
            )}
        </div>





          
         

</div>
      )
        
};

export default DailyGoals;