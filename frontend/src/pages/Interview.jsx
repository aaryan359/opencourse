import React, { useState } from 'react';

// Sample data for storing experiences
const initialExperiences = [];

const Interview = () => {

    const [experiences, setExperiences] = useState(initialExperiences);

    const [formData, setFormData] = useState({
        companyName: '',
        role: '',
        interviewType: '',
        questions: '',
        answers: '',
        additionalNotes: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setExperiences([...experiences, formData]);
        setFormData({ // Reset form
            companyName: '',
            role: '',
            interviewType: '',
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
                    <label className="block mb-1 font-semibold" htmlFor="role">Role</label>
                    <input
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
                    <label className="block mb-1 font-semibold" htmlFor="interviewType">Interview Type</label>
                    <select
                        name="interviewType"
                        id="interviewType"
                        value={formData.interviewType}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    >
                        <option value="">Select...</option>
                        <option value="fresher">Fresher</option>
                        <option value="experienced">Experienced</option>
                        <option value="non-tech">Non-Tech/Management</option>
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

                <div className="mb-4">
                    <label className="block mb-1 font-semibold" htmlFor="additionalNotes">Additional Notes</label>
                    <textarea
                        name="additionalNotes"
                        id="additionalNotes"
                        value={formData.additionalNotes}
                        onChange={handleChange}
                        className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="4"
                    />
                </div>


                <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded w-full hover:bg-blue-700 transition duration-200">Submit Experience</button>


            </form>


            <h2 className="text-2xl font-semibold mb-4 text-center">Submitted Experiences</h2>

            
            <div>
                {experiences.map((exp, index) => (
                    <div key={index} className="bg-gray-100 p-4 mb-4 rounded shadow">
                        <h3 className="font-bold text-lg">{exp.companyName} - {exp.role} ({exp.interviewType})</h3>
                        <p className="mt-2"><strong>Questions:</strong> {exp.questions}</p>
                        <p className="mt-2"><strong>Answers:</strong> {exp.answers}</p>
                        <p className="mt-2"><strong>Notes:</strong> {exp.additionalNotes}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Interview;
