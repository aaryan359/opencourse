import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector } from 'react-redux';

// Sample data for storing experiences
const initialExperiences = [];

const Interview = () => {

    const [experiences, setExperiences] = useState(initialExperiences);
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
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Interview Experience Submission</h1>

            <form onSubmit={handleSubmit} className="bg-white p-8 rounded shadow-md mb-6 max-w-lg mx-auto">

                <div className="mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="companyName">Company Name</label>
                    <input
                       
                       placeholder='EX- google/amazon '
                        type="text"
                        name="companyName"
                        id="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="role"> Job Role</label>
                    <input
                       placeholder='EX- frontend developer/Data Analyst'
                        type="text"
                        name="role"
                        id="role"
                        value={formData.role}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="skill"> Technology/Skill</label>
                    <input
                       placeholder='EX- Reactjs/python'
                        type="text"
                        name="skill"
                        id="skill"
                        value={formData.skill}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="Domain"> Industry/Domain</label>
                    <input
                       placeholder='EX- AI-ML/Blockchain Development'
                        type="text"
                        name="Domain"
                        id="Domain"
                        value={formData.Domain}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="interviewType">Experience Level</label>
                    <select
                        name="ExperienceLevel"
                        id="ExperienceLevel"
                        value={formData.ExperienceLevel}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        
                        <option value="">Select...</option>
                        <option value="fresher">Fresher</option>
                        <option value="1-5">1-3 years of Experienced</option>
                        <option value="5+">5+ years of Experience</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="interviewType">Difficulty Level </label>
                    <select
                        name="difficulty"
                        id="difficulty"
                        value={formData.difficulty}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        
                        <option value="">Select...</option>
                        <option value="easy">Easy</option>
                        <option value="medium">Medium</option>
                        <option value="hard">Hard</option>

                    </select>
                </div>

                <div className="mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="interviewType">Question Type </label>
                    <select
                        name="questiontype"
                        id="questiontype"
                        value={formData.questiontype}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        
                        <option value="">Select...</option>
                        <option value="hr">HR</option>
                        <option value="system design">System Design</option>
                        <option value="case study">Case Study</option>
                        <option value="conceptual">Conceptual</option>
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
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                        required
                    />
                </div>

                


                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-200">Submit Experience</button>


            </form>


            <h2 className="text-2xl font-semibold mb-4 text-center">Submitted Experiences</h2>

            
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
    );
};

export default Interview;
