import React, { useEffect, useState } from "react";
import axios from "axios";
import * as signalR from '@microsoft/signalr';
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
    const connection = new signalR.HubConnectionBuilder()
      .configureLogging(signalR.LogLevel.Debug)  // add this for diagnostic clues
      .withUrl(`${linkhost}/leaderboardHub`, {
        skipNegotiation: true,  // skipNegotiation as we specify WebSockets
        transport: signalR.HttpTransportType.WebSockets  // force WebSocket transport
      })
      .withAutomaticReconnect()
      .build();

    connection.start()
      .then(() => {
        console.log("Connected to LeaderboardHub");

        // Listen for updates
        connection.on("ReceiveLeaderboardUpdate", () => {
          console.log("Received leaderboard update!");
          
          axios.get(`${linkhost}/api/Group?userId=${user.nameid}`)
          .then(response => {
            setUsers(response.data.leaderboard);
            setEndDate(response.data.endDate);
          })
          .catch(error => {
            console.error("Error fetching leaderboard data:", error);
          });

        });
      })
      .catch(error => console.error("Connection failed: ", error));

    return () => {
      connection.stop();
    };
  }, [user.nameid]);


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


  ///Dont remove this useEffect, it is used to set the initial users data for testing purposes
  // useEffect(() => {
  //   setUsers([
  //     {
  //       userId: 1,
  //       username: "Amr",
  //       weeklyXp: 260,
  //       level: 4,
  //       avatar: "",
  //     },
  //     {
  //       userId: 23,
  //       username: "Mohamed",
  //       weeklyXp: 123,
  //       level: 2,
  //       avatar: "",
  //     },
  //     {
  //       userId: 3,
  //       username: "Ali",
  //       weeklyXp: 105,
  //       level: 2,
  //       avatar: "",
  //     },
  //     {
  //       userId: 4,
  //       username: "Sara",
  //       weeklyXp: 97,
  //       level: 1,
  //       avatar: "",
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
