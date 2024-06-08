import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-red-400 to-yellow-500 p-4">
      <h1 className="text-5xl font-bold text-white mb-8">404 Not Found</h1>
      <p className="text-xl text-white mb-4">Sorry, the page you're looking for doesn't exist.</p>
      <button
        onClick={() => navigate('/')}
        className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Go to Home
      </button>
    </div>
  );
};

export default NotFound;
