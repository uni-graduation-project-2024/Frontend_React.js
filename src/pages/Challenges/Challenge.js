import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SlBadge } from "react-icons/sl";
import { IoCheckmarkCircle } from "react-icons/io5";

import "./Challenge.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";

const Challenge = () => {
  const navigate = useNavigate();
  const [challenges, setChallenges] = useState({
    dailyXp: 0,
    targetdaily: 50,
    monthlyXp: 7,
    monthtarget: [1000, 2000, 3000]
  });
  const [dailyProgress, setDailyProgress] = useState(0);
  const [monthlyProgress, setMonthlyProgress] = useState(0);
  const [currentLevel, setCurrentLevel] = useState("Bronze"); 
  const { user } = getAuthToken();

  useEffect(() => {
    axios.get(`${linkhost}/api/User/get-challenge-status/${user.nameid}`)
      .then(response => {
        setChallenges(response.data);
        setDailyProgress((response.data.dailyXp / response.data.targetdaily) * 100);
        setMonthlyProgress((response.data.monthlyXp / response.data.monthtarget[2]) * 100);
        
        const xp = response.data.monthlyXp;
        if (xp >= response.data.monthtarget[2]) {
          setCurrentLevel("Gold 🏆");
        } else if (xp >= response.data.monthtarget[1]) {
          setCurrentLevel("Silver 🥈");
        } else if (xp >= response.data.monthtarget[0]) {
          setCurrentLevel("Bronze 🥉");
        } else {
          setCurrentLevel("Beginner ⚪"); 
        }
      })
      .catch(error => {
        console.error("Error fetching challenges:", error);
      });
  }, [user.nameid]);

  return (
    <div className="challenge-container">
      <h1 className="challenge-title">Challenges</h1>
      
      <div className="challenge-card">
        <h2>Daily Challenge</h2>
        <p>{challenges.dailyXp} / {challenges.targetdaily}</p>
        <div className="challenge-progress-bar">
          <div className="challenge-progress-fill" style={{ width: `${dailyProgress}%` }}></div>
        </div>
      </div>

      <div className="challenge-card">
        <h2>Monthly Challenge - <span className="level">{currentLevel}</span></h2>
        <p>{challenges.monthlyXp} / {challenges.monthtarget[2]}</p>
        <div className="challenge-progress-bar-container">
        <IoCheckmarkCircle className={`badge-fill ${monthlyProgress>= 25? "bronze-badge-active" : ""}`} style={{left:"30.6301%"}}/>
          <SlBadge className={`badge-shape ${monthlyProgress>= 25? "bronze-badge-active" : ""}`} style={{left:"30%"}}/>

        <IoCheckmarkCircle className={`badge-fill ${monthlyProgress>= 60? "silver-badge-active" : ""}`} style={{left:"60.6301%"}}/>
          <SlBadge className={`badge-shape silver-badge ${monthlyProgress>= 60? "silver-badge-active" : ""}`} style={{left:"60%"}}></SlBadge>

        <IoCheckmarkCircle className={`badge-fill ${monthlyProgress>= 100? "gold-badge-active" : ""}`} style={{left:"97.6301%"}}/>
          <SlBadge className={`badge-shape gold-badge ${monthlyProgress>= 100? "gold-badge-active" : ""}`} style={{left:"97%"}}></SlBadge>
        <div className="challenge-progress-bar">
          <div className="challenge-progress-fill" style={{ width: `${monthlyProgress}%` }}></div>
        </div>
        </div>
      </div>

    <button className="badge-btn" onClick={() => navigate("/badge")}>
    View Badges 🏅
   </button>
 </div>
  );
};

export default Challenge;
