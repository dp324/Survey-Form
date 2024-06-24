import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { backendURL } from '../utils/BackendURL';
import QuestionComponent from './QuestionComponent';

const CreateSurvey = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [questions, setQuestions] = useState([{ questionText: '', questionType: 'paragraph', options: [] }]);
  const navigate = useNavigate();
  const URL = backendURL;

  const handleAddQuestion = () => {
    setQuestions([...questions, { questionText: '', questionType: 'paragraph', options: [] }]);
  };

  const handleQuestionChange = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  const handleOptionChange = (questionIndex, optionIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options[optionIndex] = value;
    setQuestions(newQuestions);
  };

  const handleAddOption = (index) => {
    const newQuestions = [...questions];
    newQuestions[index].options.push('');
    setQuestions(newQuestions);
  };

  const handleDeleteOption = (questionIndex, optionIndex) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].options.splice(optionIndex, 1);
    setQuestions(newQuestions);
  };

  const handleDeleteQuestion = (index) => {
    const newQuestions = [...questions];
    newQuestions.splice(index, 1);
    setQuestions(newQuestions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${URL}/admin/create-survey`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ title, description, questions }),
      });

      if (!response.ok) {
        throw new Error('Survey creation failed');
      }

      await response.json();
      navigate('/admin/dashboard');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-green-500 text-black">
      <header className="flex items-center justify-between p-4 bg-white shadow-md">
        <div className="text-2xl font-bold text-slate-900">Create New Form</div>
        <div className="flex space-x-4">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400"
          >
            Back to Dashboard
          </button>
        </div>
      </header>
      <main className="flex flex-col items-center justify-center mt-8 p-4">
        <form onSubmit={handleSubmit} className="w-full max-w-lg bg-white p-8 rounded-lg shadow-lg">
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Title:</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">Description:</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>
          {questions.map((question, index) => (
            <QuestionComponent
              key={index}
              index={index}
              question={question}
              handleQuestionChange={handleQuestionChange}
              handleOptionChange={handleOptionChange}
              handleAddOption={handleAddOption}
              handleDeleteOption={handleDeleteOption}
              handleDeleteQuestion={handleDeleteQuestion}
            />
          ))}
          <button
            type="button"
            onClick={handleAddQuestion}
            className="w-full bg-green-500 text-white py-2 rounded-md mt-4 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Question
          </button>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-md mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            Create Form
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateSurvey;
