import { Link, useNavigate } from 'react-router-dom'



import { setToken } from '../reducer/slice/authSlice'
import{logout} from '../reducer/slice/authSlice'
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'
import Cookies from 'js-cookie'

function Header() {

          const dispatch = useDispatch();
          const navigate = useNavigate();
          const[ isexpired,setisexpired ] = useState(true);
  const{token:accesstoken} =  useSelector(  (state)=>state.auth );

  const verifyAccessToken = (token)=>{
              
    try {
      const decoded = jwtDecode(token); // Decode the token
      const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

      if (decoded.exp < currentTime) {
             
            setisexpired(true);
               dispatch(logout()) ; // Logout if the token is expired
      } else {
         setisexpired(false);
        // console.log('Token is valid');
      }
    } catch (error) {
      console.error('Invalid token:', error);
      setisexpired(true);
      dispatch(logout());
    }

  }

 // useEffect to verify the token when the component mounts
 useEffect(() => {
  if (accesstoken) {
    // console.log("if access",accesstoken);
    verifyAccessToken(accesstoken); // Verify token on component load

  } else {
    const tokenFromCookie = Cookies.get('accessToken');
    // console.log("else access",tokenFromCookie);
    if (tokenFromCookie) {
      // console.log(" if else  access",tokenFromCookie);
      // console.log("fnjnfjn",document.cookie);

      verifyAccessToken(tokenFromCookie); // Verify token from cookies if not in Redux state
    }else{
      // console.log("fnjnfjn:",document.cookie);
      // console.log(" if else else  access",tokenFromCookie);
      setisexpired(true);   
    }
  }
}, [accesstoken]); // Runs when accessToken changes

  return (
    

    <header className="bg-bg-dark text-white py-4 flex items-center justify-between px-28">
    {/* Logo */}
    <Link 
      to="/" 
      className="text-4xl font-bold no-underline  flex items-center text-white hover:text-gray-300 hover:no-underline   "
    >
      Open Course
    </Link>
  
    {/* Navigation Links */}
    <nav className="hidden md:flex space-x-6">
      <Link 
        to="/#"
        className="text-xl font-bold no-underline text-gray-300 hover:text-white hover:underline transition-colors hover:scale-105 duration-150"
      >
        Roadmap
      </Link>
      <Link 
        to="/#"
        className="text-xl font-bold no-underline text-gray-300 hover:text-white hover:underline transition-colors hover:scale-105 duration-150"
      >
        Interview
      </Link>
      <Link 
        to="/#"
        className="text-xl font-bold no-underline text-gray-300 hover:text-white hover:underline transition-colors hover:scale-105 duration-150"
      >
        About Us
      </Link>
      <Link 
        to="/#"
        className="text-xl font-bold no-underline text-gray-300 hover:text-white hover:underline transition-colors duration-150"
      >
        Community
      </Link>
    </nav>
  
    {/* Sign Up and Login Buttons */}
    {isexpired && (
      <div className="flex space-x-4">
        <Link 
          to="/signup" 
          className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-all"
        >
          Sign Up
        </Link>
        <Link 
          to="/login" 
          className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-500 hover:text-white transition-all"
        >
          Login
        </Link>
      </div>
    )}
  
    {/* Mobile Menu Toggle (Optional) */}
    <div className="md:hidden">
      {/* Add a hamburger menu or dropdown toggle for mobile if needed */}
    </div>
  </header>
  


  )
}

export default Header