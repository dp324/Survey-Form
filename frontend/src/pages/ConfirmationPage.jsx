import React from 'react';
import { useNavigate } from 'react-router-dom';

const ConfirmationPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-violet-600 to-purple-600">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-lg w-full text-center">
        <h2 className="text-3xl font-bold mb-8">Form Submitted</h2>
        <p className="text-lg mb-8">Thank you! Your form has been successfully submitted.</p>
        <button
          onClick={() => navigate('/')}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          Go to Home
        </button>
      </div>
    </div>
  );
};

export default ConfirmationPage;
