import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSignInAlt } from 'react-icons/fa';
import { RiAiGenerate } from "react-icons/ri";

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
    <>
    <div className="home-container">
      <div className="home-main">
        <div className="home-text">
          <h1 className="home-title">Welcome to Learntendo</h1>
          {user && 
          (
          <>
            <button onClick={()=> navigate("/GenerationForm")} className="home-login-button">
              <RiAiGenerate /> Generate
            </button>
            <button onClick={handleLogOutClick} className="home-login-button">
              <FaSignInAlt /> LogOut
            </button>
          </>
          )}
          {!user && 
          (
          <button onClick={handleLoginClick} className="home-login-button">
            <FaSignInAlt /> Login
          </button>
          )}
        </div>
        
      </div>
      {/* <div className="features-container">
          <div className="feature-card">
            <h3 className="feature-header">Create Quizies</h3>
            <p className="feaute-text">You can create unlimited quizies from your content</p>
          </div>
          <div className="feature-card">
            <h3 className="feature-header">Challenges</h3>
            <p className="feaute-text">You can create unlimited quizies from your content</p>
          </div>
          <div className="feature-card">
            <h3 className="feature-header">Leaderboards</h3>
            <p className="feaute-text">You can create unlimited quizies from your content</p>
          </div>
          <div className="feature-card">
            <h3 className="feature-header">Progress evaluation</h3>
            <p className="feaute-text">You can create unlimited quizies from your content</p>
          </div>
      </div> */}
    </div>
    </>
  );
};

export default Home;
