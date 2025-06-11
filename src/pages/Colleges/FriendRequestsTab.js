import React from 'react';
import './Colleges.css';

import linkhost from "../..";
import axios from 'axios';

import { FaCheck, FaTimes  } from 'react-icons/fa';
import { toast } from 'react-toastify';




const DEFAULT_AVATAR = '/images/default-profile-avatar.jpg';

const FriendRequestsTab = ({ requests = [], reloadRequests }) => {


  const handleAcceptFriend = async (targetUserId, accept) => {
    try {
      await axios.post(`${linkhost}/api/Friends/respond-request?requestId=${targetUserId}&accept=${accept}`);
      if(accept){
        toast.success('Friend added successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      } else{
        toast.success('Friend rejected successfully!', {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
      if (reloadRequests) reloadRequests();
    } catch (error) {
      toast.error('Failed to accept friend', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };


  if (!requests.length) {
    return <div className="loading">No friend requests.</div>;
  }

  return (
    <div className="friend-requests-tab">
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((req) => (
            <tr key={req.id}>
              <td>
                <img
                  src={req.profileImage || DEFAULT_AVATAR}
                  alt={req.name}
                  className="user-avatar"
                />
                {req.name}
              </td>
              <td>
                <button 
                  className="action-button accept-button" 
                  onClick={() => handleAcceptFriend(req.requestId, true)}>
                    <FaCheck />
                </button>
                <button 
                  className="action-button reject-button" 
                  style={{ marginLeft: '10px' }}
                  onClick={() => handleAcceptFriend(req.requestId, false)}>
                    <FaTimes />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FriendRequestsTab; 