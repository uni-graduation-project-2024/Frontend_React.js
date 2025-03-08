import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Challenge.css";

const Challenge = () => {
  const [challenges, setChallenges] = useState({
    dailyChallenge: { title: "", progress: 0 },
    monthlyChallenge: { title: "", progress: 0 }
  });

  useEffect(() => {
    axios.get("http://localhost:5000/api/challenges")
      .then(response => {
        setChallenges(response.data);
      })
      .catch(error => {
        console.error("Error fetching challenges:", error);
      });
  }, []);

  return (
    <div className="challenge-container">
      <h1 className="challenge-title">Challenges</h1>
      
      <div className="challenge-card">
        <h2>Daily Challenge</h2>
        <p>{challenges.dailyChallenge.title}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${challenges.dailyChallenge.progress}%` }}></div>
        </div>
      </div>

      <div className="challenge-card">
        <h2>Monthly Challenge</h2>
        <p>{challenges.monthlyChallenge.title}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${challenges.monthlyChallenge.progress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
