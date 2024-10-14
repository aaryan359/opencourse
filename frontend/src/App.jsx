import { BrowserRouter as Router, Link } from 'react-router-dom';
import Roadmap from './Components/Roadmap.jsx';
import './App.css';
import './index.css';

function App() {
  return (
    <>
      <div className="min-h-screen bg-blue-100  flex flex-col justify-between">
        {/* Hero Section */}
        <div className="bg-blue-200 bg-opacity-50  text-black py-16" >
          <div className="container mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">
              Learn and Contribute Together
            </h1>
            <p className="text-lg font-light">
              Describe what you want from a course, and if you have knowledge,
              contribute with your own topics.
            </p>
          </div>
        </div>

        {/* Contribute and Courses Section */}
        <div className="container mx-auto  py-12">




          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">


            {/* Contribute Section  start from here */}
            <div className="text-center bg-blue-200 rounded-2xl p-4">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">Contribute</h2>

              {/* link for tech contribution */}
              <div className="flex justify-center space-x-8">


                <Link
                     to="/admin"
                      className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-white focus:outline-none active:bg-blue-700"
                >
                  Tech
                </Link>

                {/* link for non tech contribution */}
                <Link
                       to="/nontech"
                       className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-white focus:outline-none active:bg-blue-700" >
                  Non Tech
                </Link>

              </div>
            </div>

            {/* Courses Section */}

            <div className="text-center bg-blue-200 rounded-2xl p-4">
              <h2 className="text-3xl font-semibold mb-6 text-gray-800">See Courses</h2>


              {/* link of the tech courses  that is uploaded by users */}
              <div className="flex justify-center space-x-8">
                <Link
                  to="/userpanel"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-white focus:outline-none active:bg-blue-700" >
                  Tech
                </Link>

     
               {/* link for the non tech course */}
                <Link
                  to="#"
                  className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-white focus:outline-none active:bg-blue-700" >
                  Non Tech
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Interview Prep Section */}
        <div className="bg-blue-100  py-12">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6 text-gray-800">
              Interview Prep by Interviewr
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Link
                to="/interview"
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-white focus:outline-none active:bg-blue-700"  >
                Contribute
              </Link>
              <Link
                to="/interviewprep"
                className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:no-underline hover:text-white focus:outline-none active:bg-blue-700" >
                Interview Questions
              </Link>
            </div>
          </div>
        </div>

        {/* Roadmap Section */}
        <div className="container mx-auto py-12">
          <Roadmap />
        </div>
      </div>
    </>
  );
}

export default App;
