
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const InterviewPrep = () => {

  const cardDetails = [
    {
      title: 'Start PREP',
      points: [
        'Start practice  interview questions',
        'Identify core skills',
        'Practice interview problems',
        'Focus on communication',
        'Track your progress'
      ],
     
    },
    {
      title: 'Set Daily Goals',
      points: [
        'Users can set daily practice goals (e.g., Practice 2 questions daily)',
        'Users can customize the number of questions and topics for practice',
        'Notifications sent via: * Email, WhatsApp Text,In-app Notifications',
        'Smart reminders for missed days with encouraging messages',
        'Progress Tracker: Displays streaks and completion status',

      ],
     
    },
    {
      title: 'Interview Contest',
      points: [
        'Participate in contests',
        'Learn from peers',
        'Get feedback',
        'Improve problem-solving',
        'Win exciting prizes'
      ],
     
    }
  ];
    
  return (
      <div className=' bg-bg-dark'>

   
     <div className=' flex flex-col justify-center items-center gap-10' >
                  <div className=" flex flex-wrap justify-center pt-10 gap-5 "  >

                  <Link
                to="/interviewprep/Startprep"
                style={{ textDecoration: 'none' }} // Ensure no underline
                className="  bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105  hover:text-white focus:outline-none active:bg-yellow-700" >
                Start PREP
                </Link>


                <Link
                to="/practiceinterviewanswer"
                style={{ textDecoration: 'none' }} // Ensure no underline
                className="  bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105  hover:text-white focus:outline-none active:bg-yellow-700" >
                SET DAILY GOALS
              </Link>

              <Link
                to="/practiceinterviewanswer"
                style={{ textDecoration: 'none' }} // Ensure no underline
                className= "   bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-8 rounded-lg shadow-lg transition-transform transform hover:scale-105  hover:text-white focus:outline-none active:bg-yellow-700" >
                INTERVIEW CONTEST
              </Link>

                       
                  </div>



          <div className="flex flex-wrap justify-center pt-10 w-full gap-8">
            {cardDetails.map((card, index) => (
          <div
          key={index}
          className="w-[360px]  border-2 border-cyan-400 bg-transparent  p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow"
        >
          <h2 className="text-xl font-semibold mb-4  text-white">{card.title}</h2>
          <ul className="list-disc list-inside text-gray-600 mb-6">
            {card.points.map((point, idx) => (
              <li key={idx} className="mb-1">
                {point}
              </li>
            ))}
          </ul>
          
        </div>
      ))}


             </div>

     </div>

     </div>
  )};

     
     


export default InterviewPrep;
