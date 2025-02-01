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

  const [filteredQuestions, setFilteredQuestions] = useState([]); 


   
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
        setFilteredQuestions(filtered); 
    };




    return(
    


    <div className="bg-black max-h-screen p-5">

        <div className="grid grid-cols-7">


          <div className="col-span-1   w-[200px] p-4  shadow-md h-[calc(100vh-125px)] overflow-y-auto border-r-2">
            {/* Filters */}
            <div className="mb-4">
              <label className="block mb-1 text-white font-medium" htmlFor="skill">By Technology/Skills</label>
              <select
                name="skill"
                id="skill"
                value={formData.skill}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                {createOptions(skills)}
              </select>
            </div>
      
            <div className="mb-4">
              <label className="block mb-1 text-white font-medium" htmlFor="Domain">By Industry/Domain</label>
              <select
                name="Domain"
                id="Domain"
                value={formData.Domain}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
              >
                <option value="">Select...</option>
                {createOptions(difficulties)}
              </select>
            </div>
      
            <div className="mb-4">
              <label className="block mb-1 text-white font-medium" htmlFor="ExperienceLevel">By Experience Level</label>
              <select
                name="ExperienceLevel"
                id="ExperienceLevel"
                value={formData.ExperienceLevel}
                onChange={handleChange}
                className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="">Select...</option>
                {createOptions(experienceLevels)}
              </select>
            </div>
      
            <div className="flex justify-center items-center">
              <button
                onClick={handleShowQuestions}
                className="h-10 cursor-pointer rounded bg-orange-500 hover:bg-orange-600 text-white p-2"
              >
                Show Questions
              </button>
            </div>
           
          </div>
      
         
     
        
            
          <div className="col-span-2  rounded-md max-w-screen w-[1280px]   h-[calc(100vh-90px)] overflow-y-auto">
          
            {filteredQuestions.length > 0 ? (
              filteredQuestions.map((exp, index) => <QuestionTemplate key={index} exp={exp} />)
            ) : (
              <p className="text-white text-center">No questions found. Please refine your filters.</p>
            )}
          </div>
        </div>
      </div>
      
    )
      
};

export default StartPrep;
