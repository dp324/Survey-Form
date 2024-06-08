import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';

const AdminDashboard = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch('https://survey-form-three-tau.vercel.app/admin/checkLogin', {
          credentials: 'include',
        });

        if (response.ok) {
          setIsLoggedIn(true);
          fetchSurveys();
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    const fetchSurveys = async () => {
      try {
        const response = await fetch('https://survey-form-three-tau.vercel.app/admin/all-survey', {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Login first!');
        }

        const data = await response.json();
        setSurveys(data);
      } catch (error) {
        setError(error.message);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogout = async () => {
    await fetch('https://survey-form-three-tau.vercel.app/admin/logout', {
      method: 'POST',
      credentials: 'include',
    });
    setIsLoggedIn(false);
    Cookies.remove('token');
    navigate('/admin/login');
  };

  const handleCopyLink = (surveyId) => {
    const link = `${window.location.origin}/survey/${surveyId}`;
    navigator.clipboard.writeText(link).then(() => {
      alert('Link copied to clipboard');
    }).catch((error) => {
      setError(error.message);
    });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-600 to-purple-600 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      {isLoggedIn ? (
        <>
          <div className="w-full flex justify-end space-x-4 p-4">
            <Link to={"/admin/create-survey"}>
              <button
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                Create New Survey
              </button>
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
            >
              Logout
            </button>
          </div>
          <h2 className="text-2xl font-bold text-white mb-4">All Surveys</h2>
          <div className="w-full max-w-4xl space-y-8">
            {surveys.map((survey) => (
              <div key={survey._id} className="bg-white p-6 rounded-lg shadow-lg">
                <Link to={`/admin/surveyInfo/${survey._id}`} className="text-xl font-bold text-blue-500 hover:underline">
                  {survey.title}
                </Link>
                <div className="mt-4 flex justify-end">
                  <button
                    onClick={() => handleCopyLink(survey._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                  >
                    Copy Link
                  </button>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <p className="text-red-500 mb-4">Login first!</p>
          <button
            onClick={() => navigate('/admin/login')}
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
