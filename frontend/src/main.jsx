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


createRoot(document.getElementById('root')).render(
 
  <StrictMode>

    
  
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
    </StrictMode>

  
)
