import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { User, Flame, Coins } from "lucide-react";
import axios from "axios";
import linkhost from "../.."; 
import { getAuthToken } from "../../services/auth"; 
import "./navbar.css";  

const NavBar = () => {
  const [streak, setStreak] = useState(0);
  const [coins, setCoins] = useState(0);
  const { user } = getAuthToken(); 

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get(`${linkhost}/api/user/stats/${user.nameid}`);
        setStreak(response.data.streak || 0);
        setCoins(response.data.coins || 0);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    if (user.nameid) fetchUserStats();
  }, [user.nameid]);

  return (
    <nav className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-lg">
      <div className="flex items-center gap-3">
        <Link to="/" className="text-xl font-bold">🔥Learntendo </Link>
      </div>

      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Flame className="text-yellow-400" />
          <span className="font-medium">{streak} Days Streak</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Coins className="text-yellow-300" />
          <span className="font-medium">{coins} Coins</span>
        </div>

        <div className="flex items-center gap-2">
          <User className="text-white" />
          <span className="font-medium">{user.username || "User"}</span>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
