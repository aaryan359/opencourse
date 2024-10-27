import React, { useState } from 'react';

// Sample data for storing experiences
const initialExperiences = [];

const Interview = () => {

    const [experiences, setExperiences] = useState(initialExperiences);

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
        
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value});
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setExperiences([...experiences, formData]);
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
            additionalNotes: '',
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
                        <option value="Fresher">Fresher</option>
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
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>

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
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>

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
