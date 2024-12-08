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
    

  <header className="bg-blue-600 text-white py-4 flex items-center justify-between px-6">
  <Link to="/" className="text-4xl font-bold no-underline text-gray-800 hover:text-gray-600 hover:no-underline transition-colors duration-300">
  Open Course
  </Link>


    {/* Buttons */}


    {  isexpired &&
               
               <div className="flex space-x-4">
               <Link to='/signup' className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-500 hover:no-underline hover:text-white transition-all">
         
                 Sign Up
                 
               </Link>
         
               <Link to='/login' className="bg-white text-blue-600 py-2 px-4 rounded hover:bg-blue-500 hover:no-underline hover:text-white transition-all">
                 Login
               </Link>
         
             </div>
    }

   

    <Link to='/#' className='  font-bold no-underline text-xl text-gray-200 py-2 px-4 rounded hover:bg-gray-500 hover:no-underline hover:text-white transition-all'>Community Support</Link>
  </header>


  )
}

export default Header