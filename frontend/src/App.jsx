import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes,Link } from 'react-router-dom';
import SignUp from './Authentication/SignUp.jsx';
import Login from './Authentication/Login.jsx';


import './App.css'

import './index.css'

function App() {
  

  return (
    <>

    <div className="min-h-screen bg-gray-100">
 
        {/* Description Section */}
        <div className="text-center py-6">
          <p className="text-gray-700 text-3xl font-bold">

            A platform where you can contribute and learn together.
            <br />
            Describe what you want from a course, and if you have knowledge, contribute with your own topics.
          </p>

        </div>
 

       <div className='flex '>

       
           {/* Contribute Section */}
           <div className="container mx-auto py-8 ">


          <h2 className="text-2xl font-semibold text-center mb-4">Contribute</h2>


          <div className="flex justify-center space-x-8 ">

            <div className="bg-blue-500 text-white p-4 rounded-lg shadow-md  cursor-pointer">

              <Link to="/admin" className="no-underline text-white  hover:no-underline text-lg font-medium">Tech</Link>
            </div>

            <div className="bg-green-500 text-white p-4 rounded-lg shadow-md cursor-pointer">
              <Link to="/nontech" className="no-underline text-white  hover:no-underline  text-lg font-medium">Non Tech</Link>
            </div>

          </div>
           </div>

           {/* Courses Section */}
          <div className="container mx-auto py-8">
          <h2 className="text-2xl font-semibold text-center mb-4">See Courses</h2>
          <div className="flex justify-center space-x-8">
            <div className="bg-purple-500 text-white p-4 rounded-lg shadow-md">

              <Link to='/userpanel' className="no-underline text-white  hover:no-underline text-lg font-medium">Tech</Link>

            </div>
            <div className="bg-orange-500 text-white p-4 rounded-lg shadow-md">
              <Link to="/#" className="no-underline text-white  hover:no-underline text-lg font-medium">Non Tech</Link>
            </div>
          </div>
          </div>

        </div>


        {/* Interview Prep Section */}
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Interview Prep by Interviewr</h2>
          <div className="grid grid-cols-2 gap-4">

            <div className="bg-blue-600  text-white p-4 rounded-lg shadow-md text-center">

              <Link to='/interview' className="no-underline text-white  hover:no-underline text-lg font-medium">Contribute</Link>

            </div>
            <div className="bg-red-600  text-white p-4 rounded-lg shadow-md text-center">
              <Link to='/interviewprep' className="no-underline text-white  hover:no-underline text-lg font-medium">Interview Questions</Link>
            </div>
          </div>
        </div>




        {/* Roadmap Section */}
        <div className="container mx-auto py-8">
          <h2 className="text-2xl font-semibold text-center mb-4">Roadmap</h2>
          <div className="bg-gray-300 p-6 rounded-lg shadow-md text-center">




            <p>Map your learning journey by contributing or exploring roadmaps created by others.</p>


            
          </div>
        </div>



      </div>
      
    
    </>  
  )
}

export default App
