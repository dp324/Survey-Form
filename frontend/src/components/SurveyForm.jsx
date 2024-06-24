import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { auth, provider, signInWithPopup, signOut, onAuthStateChanged } from '../firebase';
import { backendURL } from '../utils/BackendURL';

const SurveyForm = () => {
  const { id: surveyId } = useParams();
  const navigate = useNavigate();
  const [survey, setSurvey] = useState(null);
  const [responses, setResponses] = useState({});
  const [user, setUser] = useState(null);
  const [submitAttempted, setSubmitAttempted] = useState(false);
  const URL = backendURL;

  useEffect(() => {
    const fetchSurvey = async () => {
      try {
        const response = await fetch(`${URL}/survey/get-a-survey/${surveyId}`);
        const data = await response.json();
        setSurvey(data);
      } catch (error) {
        console.error('Error fetching survey:', error);
      }
    };

    fetchSurvey();
  }, [surveyId, URL]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return unsubscribe;
  }, []);

  const handleInputChange = (questionId, answer) => {
    setResponses(prevResponses => ({
      ...prevResponses,
      [questionId]: answer,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitAttempted(true);

    if (!user) {
      return;
    }

    const formattedResponses = Object.keys(responses).map(questionId => ({
      questionId,
      answer: responses[questionId],
    }));

    const surveyResponse = {
      surveyId,
      respondentEmail: user.email,
      respondentName: user.displayName,
      responses: formattedResponses,
    };

    try {
      const response = await fetch(`${URL}/survey/submit-survey`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(surveyResponse),
      });

      if (!response.ok) {
        throw new Error('Survey submission failed');
      }

      await response.json();
      navigate('/submitted');
    } catch (error) {
      console.error('Error submitting survey:', error);
    }
  };

  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = provider.credentialFromResult(result);
        const token = credential.accessToken;
        const user = result.user;
        setUser(user);
      })
      .catch((error) => {
        console.error('Error signing in:', error);
      });
  };

  const handleSignOut = async () => {
    await signOut(auth);
    setUser(null);
  };

  if (!survey) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-green-500 p-4">
      <div className="fixed top-0 left-0 right-0 bg-white shadow-md p-4 flex justify-between items-center">
        <div className="flex flex-col">
          <h1 className="text-2xl font-bold text-gray-800">{survey.title}</h1>
          <p className="text-gray-700">{survey.description}</p>
        </div>
        <div>
          {!user ? (
            <button
              onClick={handleSignIn}
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Sign in
            </button>
          ) : (
            <div className="flex items-center">
              <p className="text-gray-800 mr-2">{user.email}</p>
              <button
                onClick={handleSignOut}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Sign out
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="mt-20 max-w-lg mx-auto bg-white p-8 rounded-lg shadow-lg">
        <form onSubmit={handleSubmit} className="space-y-4">
          {survey.questions.map(question => (
            <div key={question._id}>
              <label className="block text-gray-700 text-sm font-bold mb-2">{question.questionText}</label>
              {question.questionType === 'paragraph' ? (
                <textarea
                  onChange={e => handleInputChange(question._id, e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                />
              ) : (
                <select
                  onChange={e => handleInputChange(question._id, e.target.value)}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                  <option value="" disabled selected>
                    Select an option
                  </option>
                  {question.options.map((option, index) => (
                    <option key={index} value={option}>
                      {option}
                    </option>
                  ))}
                </select>
              )}
            </div>
          ))}
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Submit
          </button>
          {submitAttempted && !user && (
            <p className="text-red-500 text-sm mt-2">Please sign in to submit the survey.</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default SurveyForm;
