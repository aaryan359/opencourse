
import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';


const predefinedFields = [
  "WebDev",
  "Blockchain",
  "Data Science",
  "AI/ML",
  "Mobile Development",
  "Cloud Computing",
  "Cybersecurity",
  "DevOps",
  "Internet of Things (IoT)",
  "Game Development",
  "Augmented Reality (AR)",
  "Virtual Reality (VR)",
  "Software Engineering",
  "Big Data",
  "UI/UX Design",
  "Embedded Systems",
  "Computer Vision",
  "Quantum Computing",
  "Robotics",
  "Natural Language Processing (NLP)",
  "Networking",
  "Edge Computing",
  "Generative AI",
  "AI Ethics",
  "Explainable AI",
  "Autonomous Systems",
  "AI-Powered Automation",
  "AI in Healthcare",
  "AI in Finance",
  "AI in Education",
  "Deep Learning",
  "Reinforcement Learning",
  "Federated Learning",
  "AI in Cybersecurity",
  "AI-Driven Personalization",
  "Speech Recognition",
  "AI in Manufacturing",
  "AI in Retail",
  "AI in Marketing",
  "AI Governance",
  "Conversational AI",
  "AI-Enhanced Creativity",
  "AI in Drug Discovery",
  "AI in Climate Science",
  "Synthetic Data",
  "AI for Social Good",
  "AI Regulation and Policy",
  "AI in Energy Optimization",
  "Machine Learning",
  "Supervised Learning",
  "Unsupervised Learning",
  "Transfer Learning",
  "Generative Adversarial Networks (GANs)",
  "Self-Supervised Learning",
  "Neural Networks",
  "Transformer Models",
  "Natural Language Generation (NLG)",
  "Prompt Engineering",
  "Multimodal AI",
  "AI in Art and Creativity",
  "AI for Human Augmentation",
];

const Interview = () => {
 

    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const{sighnupData} =  useSelector(  (state)=>state.auth );

    const [formData, setFormData] = useState({
        companyName: '',
        role: '',
        skill:'',
        Domain:'',
        ExperienceLevel: '',
        difficulty:'',
        questiontype:'',
        questions: '',
        answers: '',
        postedBy:sighnupData ? sighnupData._id : null,
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value.toLowerCase()});
    };


    const addQuestions = async () => {
        try {
          const response = await axios.post('http://localhost:5001/Interview/addQuestion',formData);
         
            console.log("questo add",response);
            //sadd sucesss toast
             // Show success toast
        toast.success('Question added successfully!', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
        });

          setLoading(false); // Turn off loading indicator
        } catch (err) {
          console.error('Error fetching questions:', err);

           // Show error toast
        toast.error('Failed to add question. Please try again later.', {
            position: "top-right",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            draggable: true,
            progress: undefined,
        });


          setError('Failed to fetch questions. Please try again later.');
          setLoading(false);
        }
      };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setExperiences([...experiences, formData]);
       await addQuestions();
         //add  api  to add question question in database

        console.log("formdat is:",formData);
      
        setFormData({ // Reset form
            companyName: '',
            role: '',
            skill:'',
            Domain:'',
            ExperienceLevel: '',
            difficulty:'',
            questiontype:'',
            questions: '',
            answers: '',
           
        });
    };

    return (

        <div className=' bg-bg-dark'>

        
        <div className="container w-[75%]  mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 bg-bg-dark text-white text-center">Interview Experience Submission</h1>

            <form onSubmit={handleSubmit} className="border-2 border-cyan-500 text-white bg-slate-900 p-8 w-full rounded shadow-md mb-6  ">

              <div className=' flex flex-col sm:flex-row justify-around '>
                             
              <div className=" sm:w-[40%] mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="companyName">Company Name (optional)</label>
                    <input
                       
                       placeholder='EX- google/amazon '
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        
                    />
                </div>

                <div className="  sm:w-[40%] mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="role"> Job Role  (optional)</label>
                    <input
                       placeholder='EX- frontend developer/Data Analyst'
                        type="text"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                       
                    />
                </div>

              </div>
                
              <div className=' flex flex-col sm:flex-row justify-around '>
                <div className=" sm:w-[40%] mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="skill"> Technology/Skill  (mandatory)</label>
                    <input
                       placeholder='EX- Reactjs/python'
                        type="text"
                        name="skill"
                        id="skill"
                        value={formData.skill}
                        onChange={handleChange}
                        className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                       required
                    />
                </div>

                <div className= " sm:w-[40%] mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="Domain"> Industry/Domain (optional)</label>
                    <input
                       placeholder='EX- AI-ML/Blockchain Development'
                        type="text"
                        name="Domain"
                        id="Domain"
                        value={formData.Domain}
                        onChange={handleChange}
                        className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                       
                    />
                </div>

              </div>

           
              <div className=' flex flex-col sm:flex-row justify-around '>
                <div className=" sm:w-[40%] mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="interviewType">Experience Level  (mandatory)</label>
                    <select
                        name="ExperienceLevel"
                        id="ExperienceLevel"
                        value={formData.ExperienceLevel}
                        onChange={handleChange}
                        className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                       required
                    >
                        
                        <option value="">Select...</option>
                        <option value="fresher">Fresher</option>
                        <option value="1-5">1-3 years of Experienced</option>
                        <option value="5+">5+ years of Experience</option>
                    </select>
                </div>

                <div className=" sm:w-[40%] mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="interviewType">Difficulty Level  (mandatory)</label>
                    <select
                        name="difficulty"
                        id="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        
                        <option value="">Select...</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>

                    </select>
                </div>
            
                </div>



                <div className=" mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="interviewType">Question Type  (mandatory)</label>
                    <select
                        name="questiontype"
                        id="questiontype"
                        value={formData.questiontype}
                        onChange={handleChange}
                        className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        
                        <option value="">Select...</option>
                        <option value="hr">HR</option>
                        <option value="system design">System Design</option>
                        <option value="case study">Case Study</option>
                        <option value="technical">technical</option>
                        <option value="behavioral">Behavioral</option>

                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="questions">Interview Questions</label>
                    <textarea
                        name="questions"
                        id="questions"
                        value={formData.questions}
                        onChange={handleChange}
                        className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="answers">Your Answers</label>
                    <textarea
                        name="answers"
                        id="answers"
                        value={formData.answers}
                        onChange={handleChange}
                        className="w-full text-black border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    />
                </div>

                


                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-200">Submit Experience</button>


            </form>


            <h2 className="text-2xl font-semibold mb-4 text-white text-center">Submitted Experiences</h2>

            
            <div>
            {experiences.map((exp, index) => (
    <div key={index} className="bg-gray-100 p-4 mb-4 rounded shadow">
            <h3 className="font-bold text-lg">
                        {exp.companyName} - {exp.role} ({exp.questiontype})
               </h3>
                         <p className="mt-2"><strong>Skill:</strong> {exp.skill}</p>
                         <p className="mt-2"><strong>Domain:</strong> {exp.Domain}</p>
                         <p className="mt-2"><strong>Experience Level:</strong> {exp.ExperienceLevel}</p>
                         <p className="mt-2"><strong>Difficulty:</strong> {exp.difficulty}</p>
                         <p className="mt-2"><strong>Questions:</strong> {exp.questions}</p>
                          <p className="mt-2"><strong>Answers:</strong> {exp.answers}</p>
            </div>
          ))}

            </div>



        </div>

        </div>
      )}
    
  


export default Interview;
