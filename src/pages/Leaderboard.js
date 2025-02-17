import React, { useEffect, useState } from "react";
import axios from "axios";
import "./leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios.get("/api/leaderboard")
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, []);

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-card">
        <h2 className="leaderboard-title">Leaderboard</h2>
        <ul>
          {users.map((user, index) => (
            <li key={user.id} className="leaderboard-item">
              <div className="leaderboard-rank">
                <span className="rank-number">{index + 1}.</span>
                <span className="username">{user.username}</span>
              </div>
              <div className="leaderboard-stats">
                <p className="rank-text">Rank: {user.rank}</p>
                <p className="xp-text">XP: {user.weeklyXP}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;