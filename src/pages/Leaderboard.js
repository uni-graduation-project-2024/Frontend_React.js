import React, { useEffect, useState } from "react";
import axios from "axios";
import "./leaderboard.css";
import linkhost from "..";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  // useEffect(() => {
  //   axios.get(`${linkhost}/api/Group/GetLeaderboard/1`)
  //     .then(response => {
  //       setUsers(response.data);
  //     })
  //     .catch(error => {
  //       console.error("Error fetching leaderboard data:", error);
  //     });
  // }, []);

  useEffect(() => {
    setUsers([
      {id: 1,
        username: "Rola",
        rank: 1,
        weeklyXp: 1000,
      },
      {id: 1,
        username: "Maha",
        rank: 1,
        weeklyXp: 500,
      },
      {id: 1,
        username: "Nancy",
        rank: 1,
        weeklyXp: 200,
      },
      {id: 1,
        username: "Radwa",
        rank: 1,
        weeklyXp: 100,
      },
      {id: 1,
        username: "Yasmin",
        rank: 1,
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
            <li key={user.id} className="leaderboard-item">
              <div className="leaderboard-rank">
                <span className="rank-number">{index + 1}.</span>
                <span className="username">{user.username}</span>
              </div>
              <div className="leaderboard-stats">
                <p className="xp-text">{user.weeklyXp}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;