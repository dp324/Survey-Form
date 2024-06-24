import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Cookies from 'js-cookie';
import { backendURL } from '../utils/BackendURL';
import DeleteModal from './DeleteModal';

const AdminDashboard = () => {
  const [surveys, setSurveys] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState('');
  const [surveyToDelete, setSurveyToDelete] = useState(null);
  const navigate = useNavigate();
  const URL = backendURL;

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await fetch(`${URL}/admin/checkLogin`, {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setIsLoggedIn(true);
          setUsername(data.username);
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
        const response = await fetch(`${URL}/admin/all-survey`, {
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
  }, [URL]);

  const handleLogout = async () => {
    await fetch(`${URL}/admin/logout`, {
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

  const handleDeleteSurvey = async () => {
    try {
      const response = await fetch(`${URL}/admin/delete-survey/${surveyToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ password }),
      });

      if (!response.ok) {
        return alert("Invalid Password!");
      }

      setSurveys(surveys.filter(survey => survey._id !== surveyToDelete));
      setShowModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const openModal = (surveyId) => {
    setSurveyToDelete(surveyId);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setPassword('');
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredSurveys = surveys.filter(survey => 
    survey.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-green-500 text-gray-900">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="text-green-800 text-2xl font-bold">Admin Dashboard</div>
        {username && <div className="text-green-600 text-xl">Welcome back, {username}!</div>}
        <div className="flex space-x-4">
          <Link to={"/admin/create-survey"}>
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
              Create New Survey
            </button>
          </Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
          >
            Logout
          </button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center mt-8 w-full p-4">
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {isLoggedIn ? (
          <>
            <input
              type="text"
              placeholder="Search surveys..."
              value={searchTerm}
              onChange={handleSearch}
              className="mb-4 p-2 w-full max-w-lg border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <div className="w-full max-w-4xl space-y-8">
              {filteredSurveys.length > 0 ? (
                filteredSurveys.map((survey) => (
                  <div key={survey._id} className="bg-white p-6 rounded-lg shadow-lg">
                    <Link to={`/admin/surveyInfo/${survey._id}`} className="text-xl font-bold text-green-800 hover:underline">
                      {survey.title}
                    </Link>
                    <p className="mt-2 text-gray-700">{survey.description}</p>
                    <div className="mt-4 flex justify-end space-x-4">
                      <button
                        onClick={() => handleCopyLink(survey._id)}
                        className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        Copy Link
                      </button>
                      <button
                        onClick={() => openModal(survey._id)}
                        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))
              ) : (
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-bold text-green-800">No surveys found.</h2>
                  <p className="text-gray-700">It looks like you don't have any surveys yet. Start creating a new survey to gather insights!</p>
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            <p className="text-red-500 mb-4">Login first!</p>
            <button
              onClick={() => navigate('/admin/login')}
              className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
            >
              Login
            </button>
          </>
        )}
      </main>
      <DeleteModal
        isOpen={showModal}
        onClose={closeModal}
        onDelete={handleDeleteSurvey}
        password={password}
        setPassword={setPassword}
      />
    </div>
  );
};

export default AdminDashboard;
