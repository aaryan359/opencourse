import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate ,Link } from 'react-router-dom';

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: '',

    email: '',

    password: '',

    expertise: '', 

    // Can be years of experience or description
    experience: '', 

 // Optional: URL or upload for their work samples
    portfolio: '', 
  });



  const navigate = useNavigate();


  //taking form data 
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };


// on submit function
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5001/auth/signup', formData);

        // sent no alert redirect to home page or take or non tech field
        
      if (response.status >= 200 && response.status < 300) {

        navigate('/');

      } else {
        alert('Signup failed');
      }
      
    } catch (err) {
      console.error(err);
      alert('Error registering user');
    }
  };







  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-blue-200 to-indigo-200">


      <form 
        onSubmit={handleSubmit} 
        className="bg-white shadow-lg rounded-lg p-8 max-w-md w-full"
      >
        <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">Create an Account</h2>

        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          placeholder="Username"
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />


        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />


        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          placeholder="Password"
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />


        <input
          type="text"
          name="expertise"
          value={formData.expertise}
          onChange={handleChange}
          placeholder="Expertise"
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />


        <input
          type="text"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          placeholder="Experience"
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />


        <input
          type="text"
          name="portfolio"
          value={formData.portfolio}
          onChange={handleChange}
          placeholder="Portfolio (optional)"
          className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />


        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded hover:bg-blue-700 transition duration-200">
          Sign Up
        </button>
        


        <p className="mt-4 text-center text-gray-600">
          Already have an account? <Link to="/login" className="text-blue-600 hover:underline">Log In</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
