import React from 'react';  
import { FaBook, FaTrophy, FaShoppingCart, FaUser } from 'react-icons/fa';
import { RiAiGenerate } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";
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
        {user && (
          <>
            {user.role === "User" && (
              <>
                <Link to="/GenerationForm" className="sidebar-item">
                  <RiAiGenerate className="icon" /> Generate Questions
                </Link>
                <Link to="/library" className="sidebar-item">
                  <FaBook className="icon" /> My Library
                </Link>
                <Link to="/leaderboard" className="sidebar-item">
                  <MdLeaderboard className="icon" /> Leaderboard
                </Link>
                <Link to="/challenges" className="sidebar-item">
                  <FaTrophy className="icon" /> Challenges
                </Link>
                <Link to="/market" className="sidebar-item">
                  <FaShoppingCart className="icon" /> Market
                </Link>
              </>
            )}
          </>
        )}
      </div>

      {user && (
        <div className="user-info">
          <FaUser className="icon" />
          <Link to="/user-profile" className="profile-link">{user.unique_name}</Link>
        </div>
      )}

      <div className="sidebar-extra">{children}</div>
    </div>
  );
};

export default Sidebar;











