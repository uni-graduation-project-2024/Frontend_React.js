import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Leaderboard.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const { user } = getAuthToken();

  // useEffect(() => {
  //   axios.get(`${linkhost}/api/Group?userId=${user.nameid}`)
  //     .then(response => {
  //       setUsers(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching leaderboard data:", error);
  //     });
  // }, [user.nameid]);

  useEffect(() => {
    setUsers([
      {id: 1,
        username: "Nancy",
        weeklyXp: 1000,
      },
      {id: 2,
        username: "Maha",
        weeklyXp: 500,
      },
      {id: 3,
        username: "Rola",
        weeklyXp: 200,
      },
      {id: 4,
        username: "Radwa",
        weeklyXp: 100,
      },
      {id: 5,
        username: "Yasmin",
        weeklyXp: 50,
      },
    ])
  },[])
  

  return (
    <div className="leaderboard-container">
      <div className="leaderboard-card">
        <h2 className="leaderboard-title">Leaderboard</h2>
        <ul>
          {users.map((user, index) => (
            <li key={user.userId} className="leaderboard-item">
              <div className="leaderboard-rank">
                <span className="rank-number">{index + 1}.</span>
                <span className="username">{user.username}</span>
              </div>
              <div className="leaderboard-stats">
                <p className="xp-text">XP: {user.weeklyXp}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;