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

      <div className="nav-items"> {/*gap-6 -> gap-3*/}
        <div className="stat-item">
          <Flame className={ streakActive? "streak-active": "streak-not-active"} />
          <span className="font-medium">{streak}</span>
        </div>
        
        <div className="stat-item">
          <TbCoin className="coin" />
          <span className="font-medium">{coins}</span>
        </div>

        <div className="stat-item">
          <BsLightningFill className="power" />
          <span className="font-medium">{generationPower}</span>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
