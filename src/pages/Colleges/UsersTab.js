import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Colleges.css';
import linkhost from "../..";
import { toast } from 'react-toastify';



const DEFAULT_AVATAR = '/images/default-profile-avatar.jpg';

const UsersTab = ({ userId }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [requesting, setRequesting] = useState({}); 

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(`${linkhost}/api/Friends/suggestion-friends/${userId}`);
        const apiUsers = response.data.map(user => ({
          id: user.userId,
          name: user.username,
          profileImage: user.profilePicture || DEFAULT_AVATAR,
        }));
        setUsers(apiUsers);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    if (userId) fetchUsers();
  }, [userId, requesting]);

  const handleAddFriend = async (targetUserId) => {
    setRequesting(prev => ({ ...prev, [targetUserId]: true }));
    try {
      await axios.post(`${linkhost}/api/Friends/send-request?senderId=${userId}&receiverId=${targetUserId}`);
      toast.success('Request sent successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });

      setRequesting(prev => ({ ...prev, [targetUserId]: 'sent' }));
    } catch (error) {
      setRequesting(prev => ({ ...prev, [targetUserId]: false }));
      toast.error('Something went wrong!', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  if (loading) {
    return <div className="loading">Loading users...</div>;
  }
  if (!users.length) {
    return <div className="loading">No Users.</div>;
  }

  return (
    <div className="users-tab">
      <table className="users-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <img
                  src={user.profileImage || DEFAULT_AVATAR}
                  alt={user.name}
                  className="user-avatar"
                />
                {user.name}
              </td>
              <td>
                <button
                  className="action-button add-friend-button"
                  onClick={() => handleAddFriend((user.id))}
                  disabled={requesting[user.id] === true || requesting[user.id] === 'sent'}
                >
                  {requesting[user.id] === 'sent' ? 'Request Sent' : 'Add Friend'}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default UsersTab; 