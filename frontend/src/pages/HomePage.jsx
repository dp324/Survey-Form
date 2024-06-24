import React from 'react';
import { Link } from 'react-router-dom';
import surveyImage from '../assets/home-image2.png';

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-gray-900 p-4">
      <header className="w-full flex justify-between items-center px-8 py-4 shadow-md fixed top-0 left-0 right-0 z-10 ">
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-green-800">FORMO</h1>
        </div>
        <div className="space-x-4">
          <Link to="/admin/login">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
              Sign In
            </button>
          </Link>
          <Link to="/admin/signup">
            <button className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
              Sign Up
            </button>
          </Link>
        </div>
      </header>
      <main className="flex flex-col md:flex-row items-center justify-center mt-24 mb-24 w-full space-y-8 md:space-y-0 md:space-x-8">
        <div className="flex justify-center md:w-1/2">
          <img src={surveyImage} alt="Survey" className="w-full h-auto object-cover rounded-md" />
        </div>
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2">
          <h1 className="text-5xl font-bold mb-2 text-green-900">Welcome to Our Platform</h1>
          <p className="text-xl mb-7 text-gray-700">Create and manage surveys effortlessly</p>
          <Link to="/admin/signup">
            <button className="bg-green-600 text-white px-6 py-3 rounded-md text-xl hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-400">
              Get Started
            </button>
          </Link>
        </div>
      </main>
      <footer className="w-full flex justify-center py-4 bg-green-100">
        <p className="text-gray-600">Made by Deepanshu</p>
      </footer>
    </div>
  );
};

export default HomePage;
