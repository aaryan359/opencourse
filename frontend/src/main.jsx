import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx'
import SignUp from './Authentication/SignUp.jsx';
import './index.css'
import Login from './Authentication/Login.jsx';
import Admin from './pages/Admin.jsx';

import About from './pages/About/About.jsx';
import ComingSoon from './pages/Community/ComingSoon.jsx';


import UserPanel from './pages/UserPanel.jsx';
import Header from './Components/Header.jsx';
import Interview from './pages/Interviewsection/Interview.jsx';
import InterviewPrep from './pages/Interviewsection/InterviewPrep.jsx';

import { ToastContainer } from 'react-toastify';

import { Provider, useSelector } from "react-redux";
import { configureStore} from "@reduxjs/toolkit"


import { Toaster } from "react-hot-toast";
import rootreducer from './reducer/index.js';

import GiveContest from './pages/Interviewsection/GiveContest.jsx';
import DailyGoals from './pages/Interviewsection/DailyGoals.jsx';
import StartPrep from './pages/Interviewsection/Startprep.jsx';
import Practiceinterview from './pages/Interviewsection/practiceinterviewanswer.jsx';
import CheckAnswer from './pages/Interviewsection/CheckAnswer.jsx';


import Dummynontech from './pages/nontechadminparts/Dummynontech.jsx';
import Addsubtopicnontech from './pages/nontechadminparts/Addsubtopic.jsx';


import Seencourse from './pages/nontechshowcourseparts/Seencourse.jsx';
import ExplorenontechCourse from './pages/nontechshowcourseparts/Explorenoncourse.jsx';


import { GoogleOAuthProvider } from '@react-oauth/google';

  
   
 const store =  configureStore({
                   
                   reducer: rootreducer,
 })


createRoot(document.getElementById('root')).render(
 
  
 

    <Provider store = { store}>

   
  
      <Router>
        
      <Header/>

      <Routes>

        <Route path="/" element={<App />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />
  
        <Route path="/admin" element={<Admin />} />


        
       

        <Route path='/about' element={<About />}/>
        <Route path='/community' element={<ComingSoon/>} />

      
      

        <Route path="/userpanel" element={<UserPanel />} />

        <Route path="/contributeinterview" element={<Interview />} />

        <Route path="/interviewprep" element={<InterviewPrep />} />

        <Route path="/interviewprep/StartPrep" element={<StartPrep />} />
        <Route path="/interviewprep/GiveContest" element={<GiveContest />} />
        <Route path="/interviewprep/DailyGoals" element={<DailyGoals />} />
        <Route path='/practiceinterviewanswer' element={ <CheckAnswer/>  }  ></Route>


        <Route path="/dummynontechcourse" element={<Dummynontech/>} />  
        <Route path="/addnontechsub" element={  <Addsubtopicnontech/>} />

        <Route  path = "/seenontechcourse" element = {<Seencourse/>}   />
        <Route  path='/explorenontech' element = {<ExplorenontechCourse/>} />




      </Routes>
      

    </Router>

    <ToastContainer />
    </Provider>
   
    

  
)
