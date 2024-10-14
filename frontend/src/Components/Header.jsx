import React from 'react'
import { Link } from 'react-router-dom'

function Header() {
  return (
    

  <header className="bg-blue-600 text-white py-4 flex items-center justify-between px-6">
  <Link to="/" className="text-4xl font-bold no-underline text-gray-800 hover:text-gray-600 hover:no-underline transition-colors duration-300">
  Open Course
  </Link>


    {/* Buttons */}
    <div className="flex space-x-4">
      <Link to='/signup' className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-500 hover:no-underline hover:text-white transition-all">

        Sign Up
        
      </Link>

      <Link to='/login' className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-500 hover:no-underline hover:text-white transition-all">
        Login
      </Link>

    </div>

    <Link to='/#' className='  font-bold no-underline text-xl text-gray-200 py-2 px-4 rounded hover:bg-gray-500 hover:no-underline hover:text-white transition-all'>Community Support</Link>
  </header>


  )
}

export default Header