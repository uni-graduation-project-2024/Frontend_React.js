// Sidebar.js
import React from 'react';
import { FaHome, FaBook } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './sidebar.css'; 


const Sidebar = () => {
  return (
    <div className="sidebar bg-gray-800 text-white w-64 h-screen flex flex-col items-start p-4">
      <div className="logo mb-6">
        <h2 className="text-3xl font-bold">Learntendo</h2>
      </div>
      <div className="menu">
        <Link to="/" className="sidebar-item flex items-center mb-4 text-lg hover:text-blue-500">
          <FaHome className="mr-2" /> Home
        </Link>
        <Link to="/library" className="sidebar-item flex items-center text-lg hover:text-blue-500">
          <FaBook className="mr-2" /> My Library
        </Link>
      </div>
    </div>
  );
};

export default Sidebar;
