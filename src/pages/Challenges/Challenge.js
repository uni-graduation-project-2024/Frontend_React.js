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
    monthtarget: [100, 200, 300]
  });
  const [dailyProgress, setDailyProgress] = useState(0);
  const [monthlyProgress, setMonthlyProgress] = useState(0);
  const [currentLevel, setCurrentLevel] = useState("Bronze");
  const { user } = getAuthToken();
  useEffect(() => {
    if (!user?.nameid) return;
  
    axios
      .get(`${linkhost}/api/User/get-challenge-status/${user.nameid}`)
      .then((response) => {
        setChallenges(response.data);
  
        const daily = (response.data.dailyXp / response.data.targetdaily) * 100;
        const monthly = (response.data.monthlyXp / response.data.monthtarget[2]) * 100;
  
        setDailyProgress(daily);
        setMonthlyProgress(monthly);
  
        const xp = response.data.monthlyXp;
        if (xp >= response.data.monthtarget[2]) {
          setCurrentLevel("Gold 🏆");
        } else if (xp >= response.data.monthtarget[1]) {
          setCurrentLevel("Silver 🥈");
        } else if (xp >= response.data.monthtarget[0]) {
          setCurrentLevel("Bronze 🥉");
        }
      })
      .catch((error) => {
        console.error("Error fetching challenges:", error);
      });
  }, [user.nameid]);  

  const getMonthlyCardStyle = () => {
    const xp = challenges.monthlyXp;
    if (xp >= challenges.monthtarget[2]) {
      return {
        background: "linear-gradient(135deg, #FFE86A, #F8F8F8)",
        color: "#000"
      };
    } else if (xp >= challenges.monthtarget[1]) {
      return {
        background: "linear-gradient(135deg, #B3C7D9, #EEEEEE)",
        color: "#000"
      };
    } else if (xp >= challenges.monthtarget[0]) {
      return {
        background: "linear-gradient(135deg, #F9C9A1, #F4F4F4)",
        color: "#000"
      };
    } else {
      return {
        background: "linear-gradient(135deg, #F9F9F9, #E5FFFE)",
        color: "#000"
      };
    }
  };

  const getLevelTheme = () => {
    const xp = challenges.monthlyXp;
    if (xp >= challenges.monthtarget[2]) {
      return {
        color: "#FFD700",
        barColor: "#FFD700"
      };
    } else if (xp >= challenges.monthtarget[1]) {
      return {
        color: "#507999",
        barColor: "#507999"
      };
    } else if (xp >= challenges.monthtarget[0]) {
      return {
        color: "#C48B5A",
        barColor: "#CD7F32"
      };
    } else {
      return {
        color: "#22D7DA",
        barColor: "#00C8C8"
      };
    }
  };

  const levelTheme = getLevelTheme();

  return (
    <div className="challenge-container-all">
      <div className="challenge-container">
        {/* Monthly Challenge Card */}
        <div className="monthly-card" style={getMonthlyCardStyle()}>
          <div className="monthly-card-inner">
            <h2 style={{ color: levelTheme.color }}>
              Monthly Challenge
            </h2>
            <p style={{ color: levelTheme.color }} class="text-white border-2 border-current px-4 py-2 rounded-full">
              {challenges.monthlyXp} / {challenges.monthtarget[2]}
            </p>

            <div className="challenge-progress-bar-container">
              {/* Bronze Badge */}
             
              <SlBadge
                className={`badge-shape ${monthlyProgress >= 25 ? "bronze-badge-active" : ""}`}
                style={{ left: "30%" }}
              />
              <div className="badge-label-ch" style={{ left: "30%" , color: levelTheme.color }}>{challenges.monthtarget[0]}</div>

              {/* Silver Badge */}
            
              <SlBadge
                className={`badge-shape silver-badge ${monthlyProgress >= 60 ? "silver-badge-active" : ""}`}
                style={{ left: "60%" }}
              />
              <div className="badge-label-ch" style={{ left: "60%" , color: levelTheme.color }}>{challenges.monthtarget[1]}</div>

              {/* Gold Badge */}
             
              <SlBadge
                className={`badge-shape gold-badge ${monthlyProgress >= 100 ? "gold-badge-active" : ""}`}
                style={{ left: "97%" }}
              />
              <div className="badge-label-ch" style={{ left: "97%" , color: levelTheme.color }}>{challenges.monthtarget[2]}</div>

              <div className="monthbar">
                <div
                  className="challenge-progress-fill"
                  style={{
                    width: `${monthlyProgress}%`,
                    backgroundColor: levelTheme.barColor
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Daily Challenge Card */}
        <div className="daily-card">
          <div className="daily-card-inner">
            <div className="H2-NUM-DAILY">
              <h2>Daily Challenge</h2>
              <p className="num-daily">
                {challenges.dailyXp} / {challenges.targetdaily}
              </p>
            </div>
            <div className="dailybar">
              <div
                className="challenge-progress-fill"
                style={{ width: `${dailyProgress}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Badges Section */}
      <div className="badge-section">
        <div className="badges-container">
          <div className="badges-title">Monthly Badges</div>

          {/* Year 2025 */}
          <div className="year-title">2025</div>
<div className="months-grid">
  {["🥇", "🥇", "🥉", "🥈", "🥉", "", "", "", "", "", "", ""].map((badge, index) => {
    const badgeColors = {
      "🥇": "#FFD700", 
      "🥈": "#C0C0C0", 
      "🥉": "#CD7F32"  
    };

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][index];

    return (
      <div className="month" key={index}>
        {badge ? (
          <div className="badge-emoji">{badge}</div>
        ) : (
          <SlBadge className="badge-icon empty" />
        )}
        <div
          className="month-name"
          style={{ color: badgeColors[badge] || "#EAEAEA" }} 
        >
          {month}
        </div>
      </div>
    );
  })}
</div>


          <div className="year-title">2024</div>
<div className="months-grid">
  {["🥉", "🥈", "🥈", "🥇", "🥇", "🥉"].map((badge, index) => {
    const badgeColors = {
      "🥇": "#FFD700", 
      "🥈": "#C0C0C0", 
      "🥉": "#CD7F32"  
    };

    const month = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"][index];

    return (
      <div className="month" key={index}>
        <div className="badge-emoji">{badge}</div>
        <div className="month-name" style={{ color: badgeColors[badge] }}>
          {month}
        </div>
      </div>
    );
  })}


          </div>
        </div>
      </div>
    </div>
  );
};

export default Challenge;
