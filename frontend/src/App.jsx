import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import SurveyForm from './components/SurveyForm';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import CreateSurvey from './components/CreateSurvey';
import ConfirmationPage from './pages/ConfirmationPage';
import SurveyDetails from './pages/SurveyDetails';
import NotFound from './pages/NotFound';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    // Replace this with actual login logic
    if (username === 'admin' && password === 'admin123') {
      navigate('/survey/6665440bf4dc88fe8e0bb230')
      setIsLoggedIn(true);
    }
    else{
      alert('Wrong Username or Password')
      navigate('/');
    }
  };


  const Home = ({ isLoggedIn }) => {
    return isLoggedIn ? <navigate to="/survey/:id" /> : <LoginForm handleLogin={handleLogin} />;
  };
  return(
    <Routes>
    <Route path="/" element={<Home handleLogin={handleLogin} />} />
    <Route path='/submitted' element={<ConfirmationPage/>}/>
    <Route path="/admin/surveyInfo/:surveyId" element={<SurveyDetails />} />
    <Route path="/admin/login" element={<AdminLogin />} />
    <Route path="/admin/dashboard"element={ <AdminDashboard /> }/>
    <Route path="/survey/:id" element={<SurveyForm />} />
    <Route path="/admin/create-survey" element={<CreateSurvey />} />
    <Route path="*" element={<NotFound />} /> 
  </Routes>
  )
};



export default App;
