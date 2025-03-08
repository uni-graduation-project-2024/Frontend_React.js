import React from 'react'; 
import { FaHome, FaBook } from 'react-icons/fa';
import { RiAiGenerate, RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { getAuthToken } from './services/auth';
import './sidebar.css'; 

const Sidebar = ({ children }) => {
  const { user } = getAuthToken();
  
  return (
    <div className="sidebar bg-gray-800 text-white w-64 h-screen flex flex-col items-start p-4">
      <div className="logo mb-6">
        <h2 className="text-3xl font-bold">Learntendo</h2>
      </div>
      <div className="menu">
        <Link to="/" className="sidebar-item flex items-center mb-4 text-lg hover:text-blue-500">
          <FaHome className="mr-2" /> Home
        </Link>

        {user && (
          <>
            {user.role === "User" && (
              <>
                <Link to="/library" className="sidebar-item flex items-center text-lg hover:text-blue-500">
                  <FaBook className="mr-2" /> My Library
                </Link>
                <Link to="/GenerationForm" className="sidebar-item flex items-center text-lg hover:text-blue-500">
                  <RiAiGenerate className="mr-2" /> Generate Questions
                </Link>
              </>
            )}
            <Link to="/change-password" className="sidebar-item flex items-center text-lg hover:text-blue-500">
              <RiLockPasswordFill className="mr-2" /> Change Password
            </Link>
          </>
        )}
      </div>

      {/* Dynamic Buttons Passed as Children */}
      <div className="sidebar-extra mt-4 w-full">{children}</div>
    </div>
  );
};

export default Sidebar;
