import  { useEffect, useState } from 'react';
import axios from 'axios';
import QuestionTemplate from './Questiontemplate';

const StartPrep = () => {

    const [companyNames, setCompanyNames] = useState([]);
  const [roles, setRoles] = useState([]);
  const [skills, setSkills] = useState([]);
  const [domains, setDomains] = useState([]);
  const [experienceLevels, setExperienceLevels] = useState([]);
  const [difficulties, setDifficulties] = useState([]);
  const [questionTypes, setQuestionTypes] = useState([]);


  const [questions,setquestions] = useState([]);

  const [filteredQuestions, setFilteredQuestions] = useState([]); // New state for filtered questions


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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value.toLowerCase()});
    };

    
        
   
    

    const fetchQuestions = async () => {
        try {
          const response = await axios.get('http://localhost:5001/Interview/getQuestions');
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
        

      }, []);

      const createOptions = (array) => {
        return array.map((item, index) => (
          <option key={index} value={item}>
            {item.charAt(0).toUpperCase() + item.slice(1)}
          </option>
        ));
      };


      const handleShowQuestions = () => {
        // Filter questions based on formData
        const filtered = questions.filter(question => {
            return (
                (formData.companyName ? question.companyName.toLowerCase() === formData.companyName : true) &&
                (formData.role ? question.role.toLowerCase() === formData.role : true) &&
                (formData.skill ? question.skill.toLowerCase() === formData.skill : true) &&
                (formData.Domain ? question.Domain.toLowerCase() === formData.Domain : true) &&
                (formData.ExperienceLevel ? question.ExperienceLevel.toLowerCase() === formData.ExperienceLevel : true) &&
                (formData.difficulty ? question.difficulty.toLowerCase() === formData.difficulty : true) &&
                (formData.questiontype ? question.questiontype.toLowerCase() === formData.questiontype : true)
            );
        });
        setFilteredQuestions(filtered); // Update the state with filtered questions
    };















    return(

      <div  className=' bg-bg-dark ' >

 
         <div className=' flex flex-col   p-5 '>
                     <h1 className="text-3xl bg-bg-dark text-white font-bold mb-6 text-center">Welcome to Start Prep Section</h1>
                    
                  
                  <div   className=" gap-5 flex flex-wrap justify-start  border-2  bg-slate-900 p-4 rounded shadow-md mb-6  mx-auto" >

                      {/* Button to Show All Questions */}

                      
   
                    
                  <div className="  mb-4">
                  <label className="block mb-1 text-white font-medium" htmlFor="skill">By Technology/Skills</label>
                  <select
                      name="skill"
                      id="skill"
                      value={formData.skill}
                      onChange={handleChange}
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      style={{ maxHeight: '200px', overflowY: 'auto' }}  // Limit height and enable scroll
                      required
                  >
                      
                      <option value="">Select...</option>
                      {createOptions(skills)}
                  </select>
                  </div>

                  <div className="mb-4">
                  <label className="block text-white  mb-1 font-medium" htmlFor="Domain">By Industry/Domain</label>
                  <select
                      name="Domain"
                      id="Domain"
                      value={formData.Domain}
                      onChange={handleChange}
                      style={{ maxHeight: '200px', overflowY: 'auto' }}  // Limit height and enable scroll
                      className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      required
                  >
                      
                      <option value="">Select...</option>
                      {createOptions(domains)}
                  </select>
                  </div>

                  <div className="mb-4">
                  <label className="block mb-1 text-white font-medium" htmlFor="companyName">By Company</label>
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
                  <label className="block mb-1 text-white font-medium" htmlFor="role">By Job Role</label>
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

                  <label className="block mb-1 text-white font-medium" htmlFor="questiontype">By Question Type</label>
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
                  <label className="block mb-1 text-white font-medium" htmlFor="difficulty">By Difficulty Level</label>
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
                  <label className="block mb-1 text-white font-medium" htmlFor="interviewType">By Experience Level</label>
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

                     
                   <div className=" flex justify-center items-center ">
                 <div  

                  onClick={handleShowQuestions}
                 className="  h-10 cursor-pointer  rounded bg-orange-500 hover:bg-orange-600  text-white p-2 m-0  flex justify-center items-center " > Show Questions</div>

                </div>
                 </div>


                 <h2 className="text-2xl font-medium text-white mb-4 text-center">Filtered questions</h2>

            
            <div className=' flex flex-col  justify-start items-center'>
            {filteredQuestions.map((exp, index) => (

                <QuestionTemplate key={index}  exp = {exp} />
            // <div key={index} className="bg-gray-100 p-4 mb-4 rounded shadow">
            // <h3 className="font-bold text-lg">
            //             {exp.companyName} - {exp.role} ({exp.questiontype})
            //    </h3>
            //              <p className="mt-2"><strong>Skill:</strong> {exp.skill}</p>
            //              <p className="mt-2"><strong>Domain:</strong> {exp.Domain}</p>
            //              <p className="mt-2"><strong>Experience Level:</strong> {exp.ExperienceLevel}</p>
            //              <p className="mt-2"><strong>Difficulty:</strong> {exp.difficulty}</p>
            //              <p className="mt-2"><strong>Questions:</strong> {exp.questions}</p>
            //               <p className="mt-2"><strong>Answers:</strong> {exp.answers}</p>
            // </div>
          ))}

            </div>
                  

        </div>

        </div>
    )
      
};

export default StartPrep;
