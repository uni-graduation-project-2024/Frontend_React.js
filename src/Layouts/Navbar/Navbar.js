import React, { useState, useEffect } from "react";
import { Flame } from "lucide-react";
import { TbCoin } from "react-icons/tb";
import { BsLightningFill } from "react-icons/bs";
import axios from "axios";

import linkhost from "../.."; 
import { getAuthToken } from "../../services/auth"; 
import "./Navbar.css";  

const Navbar = ( {refreshNavbar} ) => {
  const [streak, setStreak] = useState(0);
  const [streakActive, setStreakActive ] = useState(false);
  const [coins, setCoins] = useState(0);
  const [generationPower, setGenerationPower] = useState(0);
  const { user } = getAuthToken(); 

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get(`${linkhost}/api/User/user-navbar-info?userId=${user.nameid}`);
        setStreak(response.data.streakScore || 0);
        setStreakActive(response.data.ifStreakActive || false);
        setCoins(response.data.coins || 0);
        setGenerationPower(response.data.generationPower || 0);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    if (user.nameid) fetchUserStats();
  }, [user.nameid, refreshNavbar]);

  return (
    <nav className="navbar">

      <div className="nav-items">
          <div className="stat-item tooltip-container">
            <Flame className={streakActive ? "streak-active" : "streak-not-active"} />
            <span className="font-medium">{streak}</span>
            <span className="tooltip-text">
              <strong>Streak Score</strong><br />
              Each day you complete a quiz, it increases by one.<br />
              If you miss a day, your streak resets.
            </span>
          </div>

          <div className="stat-item tooltip-container">
            <TbCoin className="coin" />
            <span className="font-medium">{coins}</span>
            <span className="tooltip-text">
              <strong>Coins</strong><br />
              You can use coins to buy items in the market.
            </span>
          </div>

          <div className="stat-item tooltip-container">
            <BsLightningFill className="power" />
            <span className="font-medium">{generationPower}</span>
            <span className="tooltip-text">
              <strong>Generation Power</strong><br />
              You can use this power to create new quizzes.
            </span>
          </div>
</div>

    </nav>
  );
};

export default Navbar;
