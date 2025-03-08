import React from 'react';  
import { FaHome, FaBook, FaTrophy, FaShoppingCart, FaUser } from 'react-icons/fa';
import { RiAiGenerate, RiLockPasswordFill } from "react-icons/ri";
import { Link } from 'react-router-dom';
import { getAuthToken } from './services/auth';
import './sidebar.css'; 

const Sidebar = ({ children }) => {
  const { user } = getAuthToken();
  
  return (
    <div className="sidebar">
      <div className="logo">
        <h2>Learntendo</h2>
      </div>
      <div className="menu">
        <Link to="/" className="sidebar-item">
          <FaHome className="icon" /> Home
        </Link>
                
        {user && (
          <>
            {user.role === "User" && (
              <>
                <Link to="/library" className="sidebar-item">
                  <FaBook className="icon" /> My Library
                </Link>
                <Link to="/GenerationForm" className="sidebar-item">
                  <RiAiGenerate className="icon" /> Generate Questions
                </Link>
                <Link to="/challenges" className="sidebar-item">
                  <FaTrophy className="icon" /> Challenges
                </Link>
                <Link to="/market" className="sidebar-item">
                  <FaShoppingCart className="icon" /> Market
                </Link>
              </>
            )}
            <Link to="/change-password" className="sidebar-item">
              <RiLockPasswordFill className="icon" /> Change Password
            </Link>
          </>
        )}
      </div>

      {user && (
        <div className="user-info">
          <FaUser className="icon" />
          <Link to="/user-profile" className="profile-link">{user.username}</Link>
        </div>
      )}

      <div className="sidebar-extra">{children}</div>
    </div>
  );
};

export default Sidebar;











