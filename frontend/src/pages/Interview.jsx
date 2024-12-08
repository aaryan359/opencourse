import React, { useState } from "react";
import axios from "axios";

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
  const [formData, setFormData] = useState({
    companyName: "",
    role: "",
    interviewType: "",
    field: "",
    questions: [{ question: "", answer: "" }],
  
    additionalNotes: "",
  });

  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleQuestionChange = (index, e) => {
    const { name, value } = e.target;
    const updatedQuestions = [...formData.questions];
    updatedQuestions[index][name] = value;
    setFormData({ ...formData, questions: updatedQuestions });
  };

  const addQuestion = () => {
    setFormData({
      ...formData,
      questions: [...formData.questions, { question: "", answer: "" }],
    });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.post(
        "http://localhost:5001/interview/upload",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(response, " response is this");
      setExperiences([...experiences, response.data.interview]);

      setFormData({
        companyName: "",
        role: "",
        interviewType: "",
        field: "",
        questions: [{ question: "", answer: "" }],
        
        additionalNotes: "",
      });
    } catch (error) {
      setError("Failed to submit experience. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-2xl">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Submit Interview Experience
      </h1>

      {error && <p className="text-red-600 text-center mb-4">{error}</p>}

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-6"
      >
        <div className="mb-4">
          <label
            htmlFor="companyName"
            className="block text-gray-700 font-bold mb-2"
          >
            Company Name
          </label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 font-bold mb-2">
            Role
          </label>
          <input
            type="text"
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="interviewType"
            className="block text-gray-700 font-bold mb-2"
          >
            Interview Type
          </label>
          <select
            name="interviewType"
            value={formData.interviewType}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="">Select...</option>
            <option value="fresher">Fresher</option>
            <option value="experienced">Experienced</option>
            <option value="non-tech">Non-Tech/Management</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="field" className="block text-gray-700 font-bold mb-2">
            Field
          </label>

          <select
            name="field"
            value={formData.field}
            onChange={handleChange}
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          >
            <option value="" disabled>
              Select a field
            </option>
            {predefinedFields.map((field) => (
              <option key={field} value={field}>
                {field}
              </option>
            ))}
          </select>
        </div>

        
        {formData.questions.map((qa, index) => (
          <div key={index} className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Interview Question {index + 1}
            </label>
            <textarea
              name="question"
              value={qa.question}
              onChange={(e) => handleQuestionChange(index, e)}
              rows="2"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
              placeholder="Enter the question"
              required
            />
            <label className="block text-gray-700 font-bold mb-2">
              Your Answer {index + 1}
            </label>
            <textarea
              name="answer"
              value={qa.answer}
              onChange={(e) => handleQuestionChange(index, e)}
              rows="2"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400 mb-2"
              placeholder="Enter your answer"
              required
            />
          </div>
        ))}
        
        <button
          type="button"
          onClick={addQuestion}
          className="bg-green-500 text-white font-bold py-2 px-4 rounded w-full mb-4 hover:bg-green-600 transition ease-in-out duration-150"
        >
          Add Another Question
        </button>

        
        <div className="mb-4">
          <label
            htmlFor="additionalNotes"
            className="block text-gray-700 font-bold mb-2"
          >
            Additional Notes
          </label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            rows="4"
            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded w-full hover:bg-blue-600 transition ease-in-out duration-150"
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Experience"}
        </button>
      </form>

      {experiences.length > 0 && (
        <div>
          <h2 className="text-2xl font-semibold text-center text-gray-800 mb-4">
            Submitted Experiences
          </h2>
          <div className="space-y-4">
            {experiences.map((exp, index) => (
              <div key={index} className="bg-gray-100 p-4 rounded shadow-md">
                <h3 className="font-bold text-lg">
                  {exp.companyName} - {exp.role} ({exp.field})
                </h3>
                <p>
                  <strong>Interview Type:</strong> {exp.interviewType}
                </p>
                <p className="mt-2">
                  <strong>Questions:</strong> {exp.questions}
                </p>
                <p className="mt-2">
                  <strong>Answers:</strong> {exp.answers}
                </p>
                <p className="mt-2">
                  <strong>Additional Notes:</strong> {exp.additionalNotes}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Interview;