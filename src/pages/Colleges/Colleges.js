import React, { useState, useEffect } from 'react';
import './Colleges.css';
import UsersTab from './UsersTab';
import FriendsTab from './FriendsTab';
import FriendRequestsTab from './FriendRequestsTab';
import { getAuthToken } from "../../services/auth";
import axios from 'axios';
import linkhost from "../..";

const DEFAULT_AVATAR = '/images/default-profile-avatar.jpg';





const Colleges = () => {
  const [activeTab, setActiveTab] = useState('friends');
  const [friendRequests, setFriendRequests] = useState([]);
  const { user } = getAuthToken();

  const fetchFriendRequests = async () => {
    try {
      const response = await axios.get(`${linkhost}/api/Friends/received-requests/${user?.nameid}`);
      const apiUsers = response.data.map(user => ({
        id: user.userId,
        requestId: user.requestId,
        name: user.username,
        profileImage: user.profilePicture || DEFAULT_AVATAR,
      }));
      setFriendRequests(apiUsers);
    } catch (error) {}
  };


  useEffect(() => {
    fetchFriendRequests();
  }, []);

  return (
    <div className="colleges-container">
      <h1>Colleges</h1>
      <div className="colleges-content">
        <div className="tabs">
          <button 
            className={`tab-button ${activeTab === 'friends' ? 'active' : ''}`}
            onClick={() => setActiveTab('friends')}
          >
            My Friends
          </button>
          <button 
            className={`tab-button ${activeTab === 'requests' ? 'active' : ''}`}
            onClick={() => setActiveTab('requests')}
          >
            Friend Requests
            {friendRequests.length > 0 && (
              <span className="badge-alert">{friendRequests.length}</span>
            )}
          </button>
          <button 
            className={`tab-button ${activeTab === 'users' ? 'active' : ''}`}
            onClick={() => setActiveTab('users')}
          >
            Users
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'friends' && <FriendsTab userId={user?.nameid} />}
          {activeTab === 'users' && <UsersTab userId={user?.nameid} />}
          {activeTab === 'requests' && 
            <FriendRequestsTab 
              requests={friendRequests} 
              userId={user?.nameid}
              reloadRequests={fetchFriendRequests}
              />
              }
        </div>
      </div>
    </div>
  );
};

export default Colleges; 