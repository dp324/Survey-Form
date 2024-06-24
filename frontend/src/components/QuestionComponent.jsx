import React from 'react';

const QuestionComponent = ({
  question,
  index,
  handleQuestionChange,
  handleOptionChange,
  handleAddOption,
  handleDeleteOption,
  handleDeleteQuestion
}) => {
  return (
    <div className="bg-white p-4 rounded-lg shadow-lg mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2">Question {index + 1}:</label>
      <input
        type="text"
        value={question.questionText}
        onChange={(e) => handleQuestionChange(index, 'questionText', e.target.value)}
        required
        className="w-full px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
      />
      <label className="block text-gray-700 text-sm font-bold mb-2">Type:</label>
      <div className="relative">
        <select
          value={question.questionType}
          onChange={(e) => handleQuestionChange(index, 'questionType', e.target.value)}
          required
          className="w-full appearance-none px-3 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="paragraph">Paragraph</option>
          <option value="mcq">Multiple Choice</option>
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
          <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path
              fillRule="evenodd"
              d="M10 12a2 2 0 100-4 2 2 0 000 4z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      </div>
      {question.questionType === 'mcq' && (
        <div>
          {question.options.map((option, optIndex) => (
            <div key={optIndex} className="flex items-center mb-2">
              <input
                type="text"
                value={option}
                onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                required
                className="flex-grow px-3 py-2 border border-gray-300 rounded-md mr-2 focus:outline-none focus:ring-2 focus:ring-green-500"
              />
              <button
                type="button"
                onClick={() => handleDeleteOption(index, optIndex)}
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                Delete Option
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={() => handleAddOption(index)}
            className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            Add Option
          </button>
        </div>
      )}
      <button
        type="button"
        onClick={() => handleDeleteQuestion(index)}
        className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500"
      >
        Delete Question
      </button>
    </div>
  );
};

export default QuestionComponent;
