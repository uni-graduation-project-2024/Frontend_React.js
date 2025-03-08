import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaCoins } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import "./userProfile.css";

const UserProfile = () => {
  const [user, setUser] = useState({
    username: "UserName",
    email: "user@gmail.com",
    joinedDate: "22-2-2025",
    totalXP: 3412,
    questionsSolved: 1000,
    finishedTop3: 10,
    maxStreakScore: 82,
    examsCreated: 116,
    currentLeague: "Gold",
    coins: 82,
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/user-profile")
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.error("Error fetching user profile:", error);
      });
  }, []);

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <h2>{user.username} <FiEdit className="edit-icon" /></h2>
          <p>{user.email}</p>
          <p>Joined Date: {user.joinedDate}</p>
        </div>
        <div className="profile-coins">
          <FaCoins className="coin-icon" /> {user.coins}
        </div>
      </div>

      {/* Stats Section */}
      <div className="profile-stats">
        <div className="stat-box">
          <h3>Questions Solved</h3>
          <p>{user.questionsSolved}</p>
        </div>
        <div className="stat-box">
          <h3>Total XP</h3>
          <p>{user.totalXP}</p>
        </div>
        <div className="stat-box">
          <h3>Finished Top 3</h3>
          <p>{user.finishedTop3}</p>
        </div>
        <div className="stat-box">
          <h3>Max Streak Score</h3>
          <p>{user.maxStreakScore}</p>
        </div>
        <div className="stat-box">
          <h3>Exams Created</h3>
          <p>{user.examsCreated}</p>
        </div>
        <div className="stat-box">
          <h3>Current League</h3>
          <p>{user.currentLeague}</p>
        </div>
      </div>

      <div className="profile-actions">
        <button className=" change-password">Change Password</button>
        <button className="delete-account">Delete Account</button>
        <button className="logout">Logout</button>
      </div>
    </div>
  );
};

export default UserProfile;
