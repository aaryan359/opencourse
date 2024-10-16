import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from './App.jsx'
import SignUp from './Authentication/SignUp.jsx';
import './index.css'
import Login from './Authentication/Login.jsx';
import Admin from './pages/Admin.jsx';
import NonTechAdmin from './pages/NonTechAdmin.jsx';
import UserPanel from './pages/UserPanel.jsx';
import Header from './Components/Header.jsx';
import Interview from './pages/Interview.jsx';
import InterviewPrep from './pages/InterviewPrep.jsx';
import { Provider, useSelector } from "react-redux";
import { configureStore} from "@reduxjs/toolkit"


import { Toaster } from "react-hot-toast";
import rootreducer from './reducer/index.js';


  
   
 const store =  configureStore({
                   
                   reducer: rootreducer,
 })

 

createRoot(document.getElementById('root')).render(
 
  <StrictMode>

   
    <Provider   store={store}>
  
      <Router>
        
      <Header/>

      <Routes>

        <Route path="/" element={<App />} />

        <Route path="/signup" element={<SignUp />} />

        <Route path="/login" element={<Login />} />
  
        <Route path="/admin" element={<Admin />} />

        <Route path="/nontech" element={<NonTechAdmin />} />

        <Route path="/userpanel" element={<UserPanel />} />

        <Route path="/interview" element={<Interview />} />

        <Route path="/interviewprep" element={<InterviewPrep />} />

      </Routes>

    </Router>
 
     <Toaster/>
    </Provider>

    </StrictMode>

  
)
