// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import { useNavigate } from 'react-router-dom';
// import { RiLockPasswordFill } from "react-icons/ri";
// import axios from "axios";
// import { FaSignInAlt } from "react-icons/fa";
// import { FiEdit } from "react-icons/fi";

// import "./UserProfile.css";
// import { getAuthToken, removeAuthToken } from '../../services/auth';
// import linkhost from "../..";

// const UserProfile = () => {
//   const navigate = useNavigate();
//   const [userInfo, setUserInfo] = useState({
//     username: "UserName",
//     email: "user@gmail.com",
//     joinedDate: "22-2-2025",
//     totalXp: 3412,
//     totalQuestion: 1000,
//     finishedTop3: 10,
//     maxStreakScore: 82,
//     examsCreated: 116,
//     currentLeague: "Gold",
//     streakScore: 82,
//   });
//   const { user } = getAuthToken();
//   const { userId } = useParams();

//   useEffect(() => {
//     axios
//       .get(`${linkhost}/api/User/user-profile?userId=${userId}`)
//       .then((response) => {
//         setUserInfo(response.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching user profile:", error);
//       });
//   }, [userId]);

//   const handleLogOutClick = () => {
//       removeAuthToken();
//       navigate("/loginregister"); 
//     };

//     return (
//       <div className="profile-all">
//       <div className="profile-container">
//         <div className="profile-header">
//           <div className="profile-info">
//             {(userId === user.nameid) &&
//               <h2>{userInfo.username} <FiEdit className="edit-icon" /></h2>
//             }
//             <p className="pemail">{userInfo.email}</p>
//             <p className="pdate">
//               Joined Date: {new Date(userInfo.joinedDate).toLocaleDateString("en-GB", {
//               day: "numeric",
//               month: "long",
//               year: "numeric"
//             })}
//             </p>
//           </div>
//         </div>
    
//         {/* Stats Section */}
//         <div className="profile-stats">
    
//           <div className="stat-box">
//             <h3>Total XP</h3>
//             <p>{userInfo.totalXp ?? 0}</p>
//           </div>
    
//           <div className="stat-box">
//             <h3>Current Streak</h3>
//             <p>{userInfo.streakScore ?? 0}</p>
//           </div>
    
//           <div className="stat-box">
//             <h3>Exams Created</h3>
//             <p>{userInfo.examsCreated ?? 0}</p>
//           </div>
    
//           <div className="stat-box">
//             <h3>Questions Solved</h3>
//             <p>{userInfo.totalQuestion ?? 0}</p>
//           </div>
    
//           <div className="stat-box">
//             <h3>Finished Top 3</h3>
//             <p>{userInfo.finishedTop3 ?? 0}</p>
//           </div>
    
//           <div className="stat-box">
//             <h3>Current League</h3>
//             <p>{userInfo.currentLeague ?? 0}</p>
//           </div>
//         </div>
    
//         {(userId === user.nameid) &&
//           <div className="profile-actions">
//             <button onClick={() => navigate("/change-password")} className="button-base change-password-button">
//               <RiLockPasswordFill className="icon" /> Change Password
//             </button>
//             <button onClick={handleLogOutClick} className="button-base logout-button">
//               <FaSignInAlt /> LogOut
//             </button>
//             <button 
//             // onClick={() => navigate("/change-password")} 
//             className="button-base delete-account-button">
//               Delete Account
//             </button>
//           </div>
//         }
//       </div>
//         <div className="thinking-section">
//         <div className="thinking-bubble">
//           Look At this! You have made an amazing progress
//           <div className="tiny-dot"></div>
//         </div>
//           <img src="/images/logo 2.png" alt="Thinking" className="thinking-image" />
//         </div>
//       </div>
//     );
    
// };

// export default UserProfile;

import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { RiLockPasswordFill } from "react-icons/ri";
import { FaSignInAlt } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

import "./UserProfile.css";
import { useUserInfoStore } from "../../hooks/useUserInfo";
import { getAuthToken, removeAuthToken } from '../../services/auth';
import axios from "axios";
import linkhost from "../..";

const UserProfile = () => {
  const navigate = useNavigate();
  const { userInformation , setProfileImage} = useUserInfoStore();

  const levels = ["Newbie", "Beginner", "Professional", "Expert", "Master"];

  const [previewUrl, setPreviewUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  const { user } = getAuthToken();
  const { userId } = useParams();


  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setPreviewUrl(URL.createObjectURL(file));
    setIsUploading(true);


    try {
      setProfileImage(file);
    } catch (error) {
      console.error("Error uploading photo:", error);
    } finally {
      setIsUploading(false);
    }
  };

  const handleLogOutClick = () => {
    removeAuthToken();
    navigate("/loginregister");
  };

  const handleDeleteAccount = async () => {
    if (window.confirm("Are you sure you want to delete your account? This action cannot be undone.")) {
      await axios.delete(`${linkhost}/api/User/delete-account/${user.nameid}`)
        .then(() => {
          removeAuthToken();
          navigate("/loginregister");
        })
        .catch((error) => {
          console.error("Error deleting account:", error);
          alert("Failed to delete account. Please try again later.");
        } );
    }
  };

  return (
    <div className="profile-all">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-photo-section">
            <label htmlFor="profile-upload">
              <div className="profile-photo-wrapper">
                <img
                  src={previewUrl || userInformation.profileImage || "/images/default-profile-avatar.jpg"}
                  alt="Profile"
                  className="profile-photo"
                />
                {!(previewUrl || userInformation.profileImage) && (
                  <div className="profile-placeholder">📷<br />Upload your photo</div>
                )}
                {isUploading && <div className="photo-loader" />}
              </div>
            </label>
            {(userId === user.nameid) && (
              <input
                id="profile-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                style={{ display: "none" }}
              />
            )}
          </div>

          <div className="profile-info">
            <h2>{userInformation.username} 
              {/* <FiEdit className="edit-icon" /> */}
              </h2>
            <p className="pemail">{userInformation.email}</p>
            <p className="pdate">
              Joined Date: {new Date(userInformation.joinedDate).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
              })}
            </p>
          </div>
        </div>

        <div className="profile-stats">
          <div className="stat-box"><h3>Total XP</h3><p>{userInformation.totalXp}</p></div>
          <div className="stat-box"><h3>Current Streak</h3><p>{userInformation.maxStreakScore}</p></div>
          <div className="stat-box"><h3>Exams Created</h3><p>{userInformation.examsCreated}</p></div>
          <div className="stat-box"><h3>Questions Solved</h3><p>{userInformation.totalQuestion}</p></div>
          <div className="stat-box"><h3>Finished Top 3</h3><p>{userInformation.finishTop}</p></div>
          <div className="stat-box"><h3>Current League</h3><p>{levels[userInformation.level]}</p></div>
        </div>

        {(userId === user.nameid) && (
          <div className="profile-actions">
            <button onClick={() => navigate("/change-password")} className="button-base change-password-button">
              <RiLockPasswordFill className="icon" /> Change Password
            </button>
            <button onClick={handleLogOutClick} className="button-base logout-button">
              <FaSignInAlt /> LogOut
            </button>
            <button onClick={handleDeleteAccount} className="button-base delete-account-button">
              Delete Account
            </button>
            <button onClick={() => navigate("/report-problem")} className="button-base  report-button">
              Report Problem
            </button>
          </div>
        )}
      </div>
            

      <div className="thinking-section">
        <div className="thinking-bubble">
          Look At this! You have made an amazing progress
          <div className="tiny-dot"></div>
        </div>
        <img src="/images/logo 2.png" alt="Thinking" className="thinking-image" />
      </div>
    </div>
  );
};

export default UserProfile;
