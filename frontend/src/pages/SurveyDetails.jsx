import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { backendURL } from '../utils/BackendURL';

const SurveyDetails = () => {
  const { surveyId } = useParams();
  const [survey, setSurvey] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const URL = backendURL;

  useEffect(() => {
    const fetchSurveyDetails = async () => {
      try {
        const response = await fetch(`${URL}/admin/surveyInfo/${surveyId}`, {
          credentials: 'include',
        });

        if (!response.ok) {
          throw new Error('Failed to fetch survey details');
        }

        const data = await response.json();
        setSurvey(data);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchSurveyDetails();
  }, [surveyId, URL]);

  const handleLogout = async () => {
    try {
      await fetch(`${URL}/admin/logout`, {
        method: 'POST',
        credentials: 'include',
      });
      Cookies.remove('token');
      navigate('/admin/login');
    } catch (error) {
      setError('Failed to logout');
    }
  };

  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!survey) {
    return <p>Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-green-500 p-4">
      <div className="fixed top-0 right-0 m-4">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          Logout
        </button>
      </div>
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl w-full mt-12">
        <h2 className="text-3xl font-bold text-center mb-8">{survey.title}</h2>
        <SurveyTable survey={survey} />
      </div>
    </div>
  );
};

const SurveyTable = ({ survey }) => {
  return (
    <table className="w-full border-collapse">
      <thead>
        <tr>
          <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
          <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
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
            <td className="border border-gray-300 px-4 py-2">{response.respondentEmail}</td>
            <td className="border border-gray-300 px-4 py-2">{response.respondentName}</td>
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

export default SurveyDetails;
  