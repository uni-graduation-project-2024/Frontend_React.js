import React from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../../sidebar';
import { FaSignInAlt } from 'react-icons/fa';
import './home.css'; 
import { getAuthToken, removeAuthToken } from '../../services/auth';

const Home = () => {
  const navigate = useNavigate();
  const {user} = getAuthToken();

  const handleLoginClick = () => {
    navigate("/loginregister"); 
  };

  const handleLogOutClick = () => {
    removeAuthToken();
    navigate("/loginregister"); 
  };

  return (
    <div className="home-container">
      <Sidebar /> {/* Sidebar component */}
      <div className="home-main">
        <div className="home-text">
          <h1 className="home-title">Welcome to Learntendo</h1>
          {user && (<button onClick={handleLogOutClick} className="home-login-button">
            <FaSignInAlt /> LogOut
          </button>)}
          {!user && (<button onClick={handleLoginClick} className="home-login-button">
            <FaSignInAlt /> Login
          </button>)}
        </div>
      </div>
    </div>
  );
};

export default Home;
