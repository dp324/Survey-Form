import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', options: [''] }]);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
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
          
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setError(error.message);
      }
    };

    checkLoginStatus();
  }, []);

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].questionText = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, oIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[oIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', options: [''] }]);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push('');
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = questions.filter((_, qIndex) => qIndex !== index);
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (qIndex, oIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options = newQuestions[qIndex].options.filter((_, index) => index !== oIndex);
    setQuestions(newQuestions);
  };

  const handleCreateSurvey = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('https://survey-form-three-tau.vercel.app/admin/create-survey', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ title, questions }),
      });

      if (!response.ok) {
        throw new Error('Failed to create survey');
      }

      const data = await response.json();
      setMessage('Survey created successfully');
      setTitle('');
      setQuestions([{ questionText: '', options: [''] }]);
      navigate('/admin/dashboard'); // Redirect to the dashboard after creating survey
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-violet-600 to-purple-600">
     {isLoggedIn ? (
      <>
         <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full">
        <h2 className="text-3xl font-bold text-center mb-8">Create New Survey</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        {message && <p className="text-green-500 mb-4">{message}</p>}
        <form onSubmit={handleCreateSurvey}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-2 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {questions.map((question, qIndex) => (
            <div key={qIndex} className="mb-6">
              <label className="block text-gray-700 font-bold mb-2">
                Question {qIndex + 1}:
                <input
                  type="text"
                  value={question.questionText}
                  onChange={(e) => handleQuestionChange(qIndex, e.target.value)}
                  required
                  className="mt-2 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </label>
              {question.options.map((option, oIndex) => (
                <div key={oIndex} className="mb-2 flex items-center">
                  <label className="block text-gray-700 font-bold mb-2 w-full">
                    Option {oIndex + 1}:
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => handleOptionChange(qIndex, oIndex, e.target.value)}
                      required
                      className="mt-2 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </label>
                  <button
                    type="button"
                    onClick={() => handleDeleteOption(qIndex, oIndex)}
                    className="ml-2 bg-red-500 text-white px-2 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
                  >
                    Delete
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={() => handleAddOption(qIndex)}
                className="mt-2 bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                Add Option
              </button>
              <button
                type="button"
                onClick={() => handleDeleteQuestion(qIndex)}
                className="ml-2 mt-2 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete Question
              </button>
            </div>
          ))}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={handleAddQuestion}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Add Question
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              Create Survey
            </button>
          </div>
        </form>
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

export default CreateSurvey;
                