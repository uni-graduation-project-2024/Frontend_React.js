import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Colleges.css';
import axios from 'axios';
import linkhost from "../..";
import { FaTrash, FaEnvelope } from 'react-icons/fa';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';






const DEFAULT_AVATAR = '/images/default-profile-avatar.jpg';

const FriendsTab = ({userId}) => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();



  const fetchFriends = async () => {
    try {
      const response = await axios.get(`${linkhost}/api/Friends/friends/${userId}`);
      const apiUsers = response.data.map(user => ({
        id: user.userId,
        name: user.username,
        profileImage: user.profilePicture || DEFAULT_AVATAR,
      }));
      setFriends(apiUsers);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  useEffect(() => {
    

    fetchFriends();
  }, []);

  if (loading) {
    return <div className="loading">Loading friends...</div>;
  }

  if (!friends.length) {
    return <div className="loading">No friends.</div>;
  }

  // Handler for message button
  const handleMessage = (friend) => {
    navigate(`/user-chat/${friend.id}`, { state: { userName: friend.name, userImage: friend.profileImage } });
  };

  const handleDelete = async (friendId) => {
    // Show confirmation dialog
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove friend!'
    });
  
    // Only proceed if user confirmed
    if (!result.isConfirmed) return;
  
    try {
      await axios.delete(`${linkhost}/api/Friends/remove-friend?userId=${userId}&friendId=${friendId}`);
      
      // Success feedback
      toast.success('Friend removed successfully!', {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
  
      fetchFriends();
    } catch (error) {
      toast.error('Failed to remove friend', {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  };

  return (
    <div className="friends-tab">
      <table className="friends-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {friends.map((friend) => (
            <tr key={friend.id}>
              <td>
                <img
                  src={friend.profileImage || DEFAULT_AVATAR}
                  alt={friend.name}
                  className="user-avatar"
                />
                {friend.name}
              </td>
              <td>
                <button
                  className="action-button message-button"
                  onClick={() => handleMessage(friend)}
                  title="Message"
                >
                  <FaEnvelope />
                </button>

                <button
                  className="action-button delete-button"
                  onClick={() => handleDelete(friend.id)}
                  style={{ marginLeft: '10px' }}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FriendsTab; 