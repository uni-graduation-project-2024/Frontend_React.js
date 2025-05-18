import { NavLink } from 'react-router-dom';

import { FaBook, FaTrophy, FaShoppingCart, FaUser } from 'react-icons/fa';
import { RiAiGenerate } from "react-icons/ri";
import { MdLeaderboard } from "react-icons/md";


import { getAuthToken } from '../../services/auth';
import './Sidebar.css'; 

const Sidebar = ({ children }) => {
  const { user } = getAuthToken();
  
  return (
    <div className="sidebar">
      <div className="logo">
        <img src="/images/Learntendo.png" alt="Learntendo Logo"/>
      </div>
      <div className="menu">               
        {user && (
          <>
            {user.role === "User" && (
              <>
                <NavLink to="/GenerationForm" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                  <RiAiGenerate className="icon" style={{ strokeWidth: 1.6 ,fill: "#1226D7", stroke: "#1226D7"}}/> Generate
                </NavLink>
                <NavLink to="/library" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                  <FaBook className="icon" style={{fill:"#E7494C"}} /> My Library
                </NavLink>
                <NavLink to="/leaderboard" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                  <MdLeaderboard className="icon" style={{fill:"#E89E00"}}/> Leaderboard
                </NavLink>
                <NavLink to="/challenges" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                  <FaTrophy className="icon" style={{fill:"#EFDC00"}}/> Challenges
                </NavLink>
                <NavLink to="/market" className={({ isActive }) => isActive ? "active-sidebar sidebar-item" : "sidebar-item"}>
                  <FaShoppingCart className="icon" style={{fill:"#C22AFF"}}/> Market
                </NavLink>
              </>
            )}
          </>
        )}
      </div>

      {user && (
        <NavLink
          to={`/user-profile/${user.nameid}`}
          className={({ isActive }) =>
            isActive ? "user-info active-sidebar" : "user-info"
          }
        >
          <FaUser className="icon" style={{ fill: "#21D7DA" }} />
          <div className="profile-link">{user.unique_name}</div>
        </NavLink>
      )}

      <div className="sidebar-extra">{children}</div>
    </div>
  );
};

export default Sidebar;











