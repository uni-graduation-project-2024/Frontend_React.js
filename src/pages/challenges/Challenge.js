import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Challenge.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";

const Challenge = () => {
  const [challenges, setChallenges] = useState({
    dailyXp: 0,
    targetdaily: 50,
    monthlyXp: 7,
    monthtarget: [1000, 2000, 3000]
  });
  const [ dailyProgress, setDailyProgress] = useState(0);
  const [ monthlyProgress, setMonthlyProgress] = useState(0);
  const { user } = getAuthToken();

  useEffect(() => {
    axios.get(`${linkhost}/api/User/get-challenge-status/${user.nameid}`)
      .then(response => {
        setChallenges(response.data);
        setDailyProgress((response.data.dailyXp / response.data.targetdaily) * 100);
        setMonthlyProgress((response.data.monthlyXp / response.data.monthtarget[2]) * 100);
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
        <p>{challenges.dailyXp} / {challenges.targetdaily}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${dailyProgress}%` }}></div>
        </div>
      </div>

      <div className="challenge-card">
        <h2>Monthly Challenge</h2>
        <p>{challenges.monthlyXp} / {challenges.monthtarget[2]}</p>
        <div className="progress-bar">
          <div className="progress-fill" style={{ width: `${monthlyProgress}%` }}></div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
