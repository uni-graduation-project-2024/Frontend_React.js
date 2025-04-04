import React from 'react';  
import { FaBook, FaTrophy, FaShoppingCart, FaUser } from 'react-icons/fa';
import { RiAiGenerate } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import { getAuthToken } from '../../services/auth';
import './Sidebar.css'; 

const Sidebar = ({ children }) => {
  const { user } = getAuthToken();
  const navigate = useNavigate();
  
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
                  <RiAiGenerate className="icon" style={{ strokeWidth: 1.6 }}/> Generate
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
          <div onClick={()=>navigate(`/user-profile/${user.nameid}`)} className="profile-link">{user.unique_name}</div>
        </div>
      )}

      <div className="sidebar-extra">{children}</div>
    </div>
  );
};

export default Sidebar;











