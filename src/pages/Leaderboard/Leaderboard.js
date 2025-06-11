import React, { useEffect, useState } from "react";
import axios from "axios";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";
import { NewbieBadge, BeginnerBadge, ProfessionalBadge, ExpertBadge, MasterBadge } from "../../assets/svg/LeaderboardBadges/LeaderboardBadges";

import "./Leaderboard.css";
import { useNavigate } from "react-router-dom";
import { TimeUntil } from "../../utils/timeAgo";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const [ endDate, setEndDate ] = useState(null);
  const { user } = getAuthToken();
  const navigate = useNavigate();


  useEffect(() => {
    axios.get(`${linkhost}/api/Group?userId=${user.nameid}`)
      .then(response => {
        setUsers(response.data.leaderboard);
        setEndDate(response.data.endDate);
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
    if (index === 0) return <img src="images/first-badge.png" alt="Gold Medal" className="medal" />;
    if (index === 1) return <div className="rank-circle" style={{backgroundColor:"#bdc1cc", color: "white"}}>{index + 1}</div>;
    if (index === 2) return <div className="rank-circle" style={{backgroundColor:"#df8c5b", color: "white"}}>{index + 1}</div>;
    return (
      <div className="rank-circle">{index + 1}</div>
    );
  };


  const levels = [
    { name: "Newbie", color: "#5f5f5f", icon:<NewbieBadge width={78} height={81}/>, smallIcon: <NewbieBadge width={30} height={33}/> },
    { name: "Beginner", color: "green", icon: <BeginnerBadge width={72} height={80}/>, smallIcon: <BeginnerBadge width={30} height={38}/> },
    { name: "Professional", color: "#db9c00", icon: <ProfessionalBadge width={74} height={83}/>, smallIcon: <ProfessionalBadge width={30} height={39}/> },
    { name: "Expert", color: "rgb(0, 92, 182)", icon: <ExpertBadge width={80} height={82}/>, smallIcon: <ExpertBadge width={30} height={32}/> },
    { name: "Master", color: "purple", icon: <MasterBadge width={76} height={87}/>, smallIcon: <MasterBadge width={30} height={41}/> },
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
        <span className="ends-in">Ends <TimeUntil dateString={endDate}/></span>
      </div>

      <div className="leaderboard-card">
        <ul>
          {users.map((user1, index) => {
          const isCurrentUser = user1.userId === Number(user.nameid);
          const isFirst = index === 0;
          const isLast = index === users.length - 1;

          let currentUserClass = "";
          if (isCurrentUser) {
            if (isFirst) currentUserClass = "current-user-first";
            else if (isLast) currentUserClass = "current-user-last";
            else currentUserClass = "current-user-middle";
          }
          return (
              <li key={user1.userId} className={`leaderboard-item rank-${index + 1} ${currentUserClass}`}
              >
                <div className="leaderboard-rank">
                  <span className="medal">{getMedal(index)}</span>
                  <img src={ user1.profileImage	 || "images/default-profile-avatar.jpg"} alt="pic" className="avatar" />
                  <span className="username">{user1.username}</span>
                  <span className="user-level">{levels[user1.level].smallIcon}</span>
                </div>
                <div className={index === 0 ? "xp xp-first" : (index === users.length-1)? "xp xp-last" : "xp xp-middle"}>
                  {user1.weeklyXp}</div>
              </li>
          );
            })}
        </ul>
      </div>
    </div>
  );
};

export default Leaderboard;
