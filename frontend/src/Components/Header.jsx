import { Link, useNavigate } from 'react-router-dom';
import { setToken, logout } from '../reducer/slice/authSlice';
import { jwtDecode } from 'jwt-decode';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from 'js-cookie';

function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isexpired, setisexpired] = useState(true);
  const { token: accesstoken } = useSelector((state) => state.auth);

  
  const verifyAccessToken = (token) => {
    try {
      // Decode the token
      const decoded = jwtDecode(token);

      // Current time in seconds
      const currentTime = Math.floor(Date.now() / 1000);

      if (decoded.exp < currentTime) {
        setisexpired(true);
        // Logout if the token is expired
        dispatch(logout());
        

      } else {
        setisexpired(false);
      }
    } catch (error) {

      toast.success('Please login again', {
        position: "top-right",
        autoClose: 5000, 
        success:false,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "light",
      });

      setisexpired(true);
      dispatch(logout());
    }
  };



  // useEffect to verify the token when the component mounts
  useEffect(() => {
    if (accesstoken) {
      // Verify token on component load
      verifyAccessToken(accesstoken);
    } else {
      const tokenFromCookie = Cookies.get('accessToken');
      if (tokenFromCookie) {
        // Verify token from cookies if not in Redux state
        verifyAccessToken(tokenFromCookie);
      } else {
        setisexpired(true);
      }
    }
  }, [accesstoken]);



  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
    toast.success('You have successfully logged out', {
      position: "top-right",
      autoClose: 3000, 
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleToggleMenu = () => {
    setMenuOpen(!menuOpen);
    
  };



  return (
    <header className="sticky top-0 w-full backdrop-blur bg-bg-dark bg-opacity-[.96] text-white py-4 flex items-center justify-between px-8 lg:px-28 z-50">
      {/* Logo */}
      <Link
        to="/"
        className="text-4xl font-bold no-underline flex items-center text-white hover:text-gray-300 focus:text-white active:no-underline hover:no-underline focus:no-underline focus:outline-none"
      >
        Open Course
      </Link>

      {/* Navigation Links */}
      <nav className="hidden md:flex space-x-8">
      <Link
          to="/Admin"
          className="text-xl font-bold no-underline text-gray-300 hover:text-white hover:underline transition-colors hover:scale-105 duration-150"
        >
          Contribute
        </Link>
      <Link
          to="/Userpanel"
          className="text-xl font-bold no-underline text-gray-300 hover:text-white hover:underline transition-colors hover:scale-105 duration-150"
        >
          Courses
        </Link>
{/*         
        <Link
          to="/#"
          className="text-xl font-bold no-underline text-gray-300 hover:text-white hover:underline transition-colors hover:scale-105 duration-150"
        >
          Docs
        </Link> */}

        <Link
          to="/interviewprep/Startprep"
          className="text-xl font-bold no-underline text-gray-300 hover:text-white hover:underline transition-colors hover:scale-105 duration-150"
        >
          Interview
        </Link>

        <Link
          to="/about"
          className="text-xl font-bold no-underline text-gray-300 hover:text-white hover:underline transition-colors hover:scale-105 duration-150"
        >
          About Us
        </Link>

        <Link
          to="/community"
          className="text-xl font-bold no-underline text-gray-300 hover:text-white hover:underline transition-colors duration-150"
        >
          Community
        </Link>

        {/* Conditionally Render Logout Button */}
        {!isexpired && accesstoken && (
          <Link
            to="/#"
            onClick={handleLogout}
            className="bg-red-700 text-white py-2 px-4 rounded inline-block hover:bg-red-800 hover:text-white transition-all"
          >
            Logout
          </Link>
        )}
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

      {/* Mobile Menu Toggle */}
      <div className="block md:hidden  items-center">
  <button
    onClick={handleToggleMenu}
    className="text-white p-2 border border-white rounded-lg hover:bg-gray-700"
  >
    More
  </button>

        {/* Dropdown Menu */}
        {menuOpen && (
          <div className="absolute top-16 right-5 mt-2 w-48 bg-bg-dark bg-opacity-[.96] rounded-lg shadow-lg z-50">
            <Link
              to="/#"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:underline transition-colors"
            >
              Docs
            </Link>
            <Link
              to="/InterviewPrep"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:underline transition-colors"
            >
              Interview
            </Link>

            <Link
              to="/about"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:underline transition-colors"
            >
              About Us
            </Link>
            <Link
              to="/community"
              className="block px-4 py-2 text-gray-300 hover:text-white hover:underline transition-colors"
            >
              Community
            </Link>

            {/* Conditionally Render Logout Button */}
            {!isexpired && accesstoken && (
              <Link
                to="/#"
                onClick={handleLogout}
                className="block px-4 py-2 bg-red-700 text-white rounded mb-2 hover:bg-red-800"
              >
                Logout
              </Link>
            )}
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
