import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import SurveyForm from './components/SurveyForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import CreateSurvey from './components/CreateSurvey';
import ConfirmationPage from './pages/ConfirmationPage';
import SurveyDetails from './pages/SurveyDetails';
import NotFound from './pages/NotFound';
import AdminSignup from './components/AdminSignup'
import HomePage from './pages/HomePage';

const App = () => {
  const navigate = useNavigate();

  return(
    <Routes>
    <Route path="/" element={<HomePage/>}/>
    <Route path='/submitted' element={<ConfirmationPage/>}/>
    <Route path="/admin/surveyInfo/:surveyId" element={<SurveyDetails />} />
    <Route path="/admin/signup" element={<AdminSignup />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard"element={ <AdminDashboard /> }/>
    <Route path="/survey/:id" element={<SurveyForm />} />
    <Route path="/admin/create-survey" element={<CreateSurvey />} />
    <Route path="*" element={<NotFound />} /> 
  </Routes>
  )
};



export default App;
