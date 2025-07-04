import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { getAuthToken } from "../../services/auth";
import linkhost from "../..";
import "./dashboard.css";

const Dashboard = () => {
  const { token } = getAuthToken();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${linkhost}/api/Admin/view-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsers(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load users.");
        setLoading(false);
      });
  }, [token]);

  const handleDeleteUser = (userId, userEmail, e) =>{
    e.stopPropagation();
    if (window.confirm(`Are you sure you want to delete this user ${userEmail}?`)) {
      axios.delete(`${linkhost}/api/Admin/delete-user/${userId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then(() => {
          setUsers(users.filter((user) => user.userId !== userId));
        })
        .catch((error) => {
          setError( error.response?.data || "Something went wrong." );
        });
    }
  }

  return (
    <div className="admin-dashboard-container">
      <h2 className="admin-table-header">Admin Dashboard - User Management</h2>
      {loading ? (
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      ) : error ? (
        <div className="alert alert-danger">{error}</div>
      ) : (
        <table className="admin-table table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.userId} onClick={() => navigate(`/user-profile/${user.userId}`)}>
                <td>{user.userId}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={(e) =>handleDeleteUser(user.userId, user.email, e)} className="btn btn-warning btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
