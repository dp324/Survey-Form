import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SurveyForm from './components/SurveyForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import CreateSurvey from './components/CreateSurvey';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (username, password) => {
    // Replace this with actual login logic
    if (username === 'admin' && password === 'admin123') {
      setIsLoggedIn(true);
    }
  };

  const isAuthenticated = () => {
    // Simple authentication check
    return document.cookie.includes('session=admin');
  };

  const Home = ({ isLoggedIn }) => {
    return isLoggedIn ? <Navigate to="/survey" /> : <LoginForm handleLogin={handleLogin} />;
  };
  return(
    <Routes>
    <Route path="/" element={<Home isLoggedIn={isLoggedIn} handleLogin={handleLogin} />} />
    <Route path="/survey" element={<SurveyForm />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard"element={ <AdminDashboard /> }/>
    <Route path="/survey/:id" element={<SurveyForm />} />
    <Route path="/survey/create-survey" element={<CreateSurvey />} />
  </Routes>
  )
};



export default App;
