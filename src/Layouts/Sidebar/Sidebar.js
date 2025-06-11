import { NavLink, useNavigate } from 'react-router-dom';

import { FaBook, FaTrophy, FaShoppingCart, FaUser,FaComments } from 'react-icons/fa';
import { IoChatboxEllipsesOutline } from "react-icons/io5";
import { RiAiGenerate } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";



import { getAuthToken } from '../../services/auth';
import './Sidebar.css'; 
import { useUserInfoStore } from '../../hooks/useUserInfo';
import { useEffect } from 'react';

const Sidebar = ({ children }) => {
  const { user } = getAuthToken();
  const { userInformation, fetchUserInfo } = useUserInfoStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
  }, []);

  const handNavigate = () => {
    navigate("/");
  };
  
  return (
    <div className="sidebar">
      <div className="logo">
        <img onClick={handNavigate} src="/images/Learntendo.png" alt="Learntendo Logo" width="100%"/>
      </div>
             
        {user && (
          <>
            {user.role === "User" && (
              <>
                <NavLink to="/generationForm" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                  <RiAiGenerate className="sidebar-icon" style={{ strokeWidth: 1.6 ,fill: "#1226D7", stroke: "#1226D7"}}/>
                  <p className="sidebar-text">Generate</p>
                </NavLink>
                <NavLink to="/library" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                  <FaBook className="sidebar-icon" style={{fill:"#E7494C"}} />
                  <p className="sidebar-text">My Library</p>
                </NavLink>
                <NavLink to="/leaderboard" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                  <MdLeaderboard className="sidebar-icon" style={{fill:"#E89E00"}}/>
                  <p className="sidebar-text">Leaderboard</p>
                </NavLink>
                <NavLink to="/challenges" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                  <FaTrophy className="sidebar-icon" style={{fill:"#EFDC00"}}/>
                  <p className="sidebar-text">Challenges</p>
                </NavLink>
                <NavLink to="/market" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                <FaShoppingCart className="sidebar-icon" style={{ fill: "#C22AFF" }} /> 
                <p className="sidebar-text">Market</p>
              </NavLink>

              <NavLink to="/chatbot" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                <IoChatboxEllipsesOutline className="sidebar-icon" style={{ fill: "#4DC3FF" }} />
                <p className="sidebar-text">Chatbot</p>
              </NavLink>

              <NavLink to="/communication" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                <FaComments className="sidebar-icon" style={{ fill: "#4DC3FF" }} />
                <p className="sidebar-text">Disscuss</p>
              </NavLink>


              </>
            )}
          </>
        )}


      {user && (
        <NavLink
          to={`/user-profile/${user.nameid}`}
          className={({ isActive }) =>
            isActive ? "user-info active-sidebar" : "user-info"
          }
        >
        <div className="sidebar-avatar-container">
        <img
          src={userInformation.profileImage || "/images/default-profile-avatar.jpg"}
          alt="profile"
          className="sidebar-avatar"
        />
        </div>
          <div className="profile-link">{user.unique_name}</div>
        </NavLink>
      )}

      <div className="sidebar-extra">{children}</div>
    </div>
  );
};

export default Sidebar;

