import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SurveyForm = () => {
  const [survey, setSurvey] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [respondent, setRespondent] = useState('');
  const [responses, setResponses] = useState({});
  const surveyId = '665cc0db3ab0314d39b3bbb8'; // Replace with actual survey ID
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`https://survey-form-three-tau.vercel.app/survey/get-a-survey/`)
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Fetched survey data:', data);
        setSurvey(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching survey:', error);
        setError(error);
        setLoading(false);
      });
  }, [surveyId]);

  const handleResponseChange = (questionId, answer) => {
    setResponses({
      ...responses,
      [questionId]: answer,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const formattedResponses = Object.keys(responses).map((questionId) => ({
      questionId,
      answer: responses[questionId],
    }));

    fetch('https://survey-form-three-tau.vercel.app/survey/submit-survey', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        surveyId,
        respondent,
        responses: formattedResponses,
      }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Responses submitted successfully:', data);
      })
      .catch((error) => {
        console.error('Error submitting responses:', error);
      });
      navigate('/');
  };

  if (loading) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">Loading...</div>;
  }

  if (error) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-red-500">Error: {error.message}</div>;
  }

  if (!survey || !survey.questions) {
    return <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-green-400 to-blue-500 text-white">No survey data found</div>;
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-400 to-purple-500">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 className="text-3xl font-bold text-center mb-8">{survey.title}</h1>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2">
              Respondent Name:
              <input
                type="text"
                value={respondent}
                onChange={(e) => setRespondent(e.target.value)}
                required
                className="mt-2 px-3 py-2 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </label>
          </div>
          {survey.questions.map((question) => (
            <div key={question._id} className="mb-4">
              <p className="text-gray-700 font-bold mb-2">{question.questionText}</p>
              <div className="space-y-2">
                {question.options.map((option, index) => (
                  <label key={index} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name={question._id}
                      value={option}
                      onChange={() => handleResponseChange(question._id, option)}
                      required
                      className="form-radio text-blue-500"
                    />
                    <span className="text-gray-700">{option}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
