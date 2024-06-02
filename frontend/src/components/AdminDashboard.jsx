import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const [surveys, setSurveys] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSurveys = async () => {
      try {
        const response = await fetch('http://localhost:8080/admin/all-survey', {
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

    fetchSurveys();
  }, []);

  const handleLogout = async () => {
    await fetch('http://localhost:8080/admin/logout', {
      method: 'POST',
      credentials: 'include',
    });
    navigate('/admin/login');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500 p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Admin Dashboard</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="flex space-x-4 mb-8">
        <button 
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
        <button 
          onClick={() => navigate('/survey/create-survey')}
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Create New Survey
        </button>
      </div>
      <h2 className="text-2xl font-bold text-white mb-4">All Surveys</h2>
      <div className="w-full max-w-4xl space-y-8">
        {surveys.map((survey) => (
          <div key={survey._id} className="bg-white p-6 rounded-lg shadow-lg">
            <h3 className="text-xl font-bold mb-4">{survey.title}</h3>
            <SurveyTable survey={survey} />
          </div>
        ))}
      </div>
    </div>
  );
};

const SurveyTable = ({ survey }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left">User</th>
          {survey.questions.map((question) => (
            <th key={question._id} className="border border-gray-300 px-4 py-2 text-left">
              {question.questionText}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {survey.userResponses.map((response, index) => (
          <tr key={index}>
            <td className="border border-gray-300 px-4 py-2">{response.respondent}</td>
            {survey.questions.map((question) => {
              const answer = response.responses.find((res) => res.questionId.toString() === question._id.toString());
              return <td key={question._id} className="border border-gray-300 px-4 py-2">{answer ? answer.answer : 'N/A'}</td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default AdminDashboard;
