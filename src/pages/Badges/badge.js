import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./badge.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";

const Badge = () => {
  const [leagueHistory, setLeagueHistory] = useState({});
  const { user } = getAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${linkhost}/api/User/MonthlyBudge/${user.nameid}`)
      .then((response) => {
        setLeagueHistory(response.data.leagueHistory);
      })
      .catch((error) => {
        console.error("Error fetching league history:", error);
      });
  }, []);

  return (
    <div className="badge-container">
      <h1 className="badge-title">League History</h1>
      <div className="badge-grid">
        {Object.entries(leagueHistory).map(([month, rank]) => (
          <div key={month} className={`badge-card ${rank.toLowerCase()}`}>
            <h3>{month}</h3>
            <span className="badge-label">{rank}</span>
          </div>
        ))}
      </div>
      <button className="back-btn" onClick={() => navigate(-1)}>Back</button>
    </div>
  );
};

export default Badge;
