import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./scorePage.css";

const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalScore, timeTaken, xpCollected } = location.state || {};

  const homeHandle = () =>{
    navigate("/library");
  }

  return (
    <div className="score-container">
      <div className="score-card">
        <div className="celebration-img">
          🎉
        </div>
        <h2 className="quiz-completed">Quiz Completed</h2>

        <div className="score-details">
          <div className="score-box time">
            <p className="label">TIME</p>
            <p className="value">{timeTaken}</p>
          </div>

          <div className="score-box score">
            <p className="label">SCORE</p>
            <p className="value">{totalScore}%</p>
          </div>

          <div className="score-box xp">
            <p className="label">XP</p>
            <p className="value">{xpCollected}</p>
          </div>
        </div>

        <button className="home-button" onClick={homeHandle}>
          Done
        </button>
        
      </div>
    </div>
  );
};

export default ScorePage;
