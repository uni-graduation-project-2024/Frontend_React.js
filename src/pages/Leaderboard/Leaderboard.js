import React, { useEffect, useState } from "react";
import axios from "axios";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";
import { NewbieBadge, BeginnerBadge, ProfessionalBadge, ExpertBadge, MasterBadge } from "../../assets/svg/LeaderboardBadges/LeaderboardBadges";

import "./Leaderboard.css";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const { user } = getAuthToken();


  useEffect(() => {
    axios.get(`${linkhost}/api/Group?userId=${user.nameid}`)
      .then(response => {
        setUsers(response.data);
      })
      .catch(error => {
        console.error("Error fetching leaderboard data:", error);
      });
  }, [user.nameid]);


  // useEffect(() => {
  //   setUsers([
  //     {
  //       id: 1,
  //       username: "Amr",
  //       xp: 260,
  //       level: "Expert",
  //       avatar: "https://i.pravatar.cc/40?img=1",
  //     },
  //     {
  //       id: 2,
  //       username: "Yasmin",
  //       xp: 123,
  //       level: "Newbie",
  //       avatar: "https://i.pravatar.cc/40?img=2",
  //     },
  //     {
  //       id: 3,
  //       username: "Bird",
  //       xp: 105,
  //       level: "Professional",
  //       avatar: "https://i.pravatar.cc/40?img=3",
  //     },
  //     {
  //       id: 4,
  //       username: "Cat",
  //       xp: 97,
  //       level: "Master",
  //       avatar: "https://i.pravatar.cc/40?img=4",
  //     },
  //   ]);
  // }, []);

  const getMedal = (index) => {
  if (index === 0) return <span className="medal">🥇</span>;
  if (index === 1) return <span className="medal">🥈</span>;
  if (index === 2) return <span className="medal">🥉</span>;
  return (
    <div className="rank-circle">
      {index + 1}
    </div>
  );
};

  

  const levels = [
    { name: "Newbie", color: "gray", icon:<NewbieBadge/>},
    { name: "Beginner", color: "green", icon: <BeginnerBadge/> },
    { name: "Professional", color: "goldenrod", icon: <ProfessionalBadge/> },
    { name: "Expert", color: "#1e90ff", icon: <ExpertBadge/> },
    { name: "Master", color: "purple", icon: <MasterBadge/> },
  ];

  return (
    <div className="leaderboard-container">
      <div className="level-bar">
        {levels.map((level, index) => (
          <div key={index} className="level-column">
            <div className="level-icon" style={{ color: level.color }}>
              {level.icon}
            </div>
            <div className="level-name" style={{ color: level.color }}>
              {level.name}
            </div>
          </div>
        ))}
        <span className="ends-in">Ends In: 3 days</span>
      </div>

      <div className="leaderboard-card">
        <ul>
          {users
            .sort((a, b) => b.xp - a.xp)
            .map((user, index) => (
              <li key={user.id} className={`leaderboard-item rank-${index + 1}`}>
                <div className="leaderboard-rank">
                  <span className="medal">{getMedal(index)}</span>
                  <img src={user.avatar || "images/default-profile-avatar.jpg"} alt="pic" className="avatar" />
                  <span className="username">{user.username}</span>
                  <span className="user-level">({levels[user.level].name})</span>
                </div>
                <div className="xp">{user.weeklyXp}</div>
              </li>
            ))}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
