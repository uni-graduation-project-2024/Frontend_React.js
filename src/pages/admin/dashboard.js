import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

import { getAuthToken } from "../../services/auth";
import linkhost from "../..";
import { FaArrowLeft } from "react-icons/fa"; // Back icon
import "./dashboard.css";

const Dashboard = () => {
  const { token } = getAuthToken();
  const [usersData, setUsersData] = useState({
    totalUsers: 0,
    totalExams: 0,
    users: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refresh, setRefresh] = useState(false); // State to trigger re-fetching
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${linkhost}/api/Admin/view-users`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setUsersData(response.data);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load users.");
        setLoading(false);
      });
  }, [token, refresh]);

  const handleDeleteUser = (userId, userEmail, e) => {
    e.stopPropagation();
    if (
      window.confirm(`Are you sure you want to delete this user ${userEmail}?`)
    ) {
      axios
        .delete(`${linkhost}/api/Admin/delete-user/${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then(() => {
          setRefresh(!refresh); // Trigger re-fetching of users
          toast.success('User deleted successfully!', {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: true,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
          });
          setError(null);
        })
        .catch((error) => {
          console.error("Delete error:", error);
          setError(error.response?.data?.message || "Failed to delete user.");
        });
    }
  };

  return (
    <div className="admin-dashboard-container">
      <button
        className="admin-back-btn"
        onClick={() => navigate("/admin/layout")}
      >
        <FaArrowLeft style={{ marginRight: "8px" }} />
        Back to Admin Panel
      </button>

      <h2 className="admin-table-header">Admin Dashboard - User Management</h2>

      <div className="stats-container">
      <div className="total-users-info">
        <p className="total-text">Total Users Registered:</p>
        <p className="total-number"> {usersData.totalUsers || 0} Users</p>
      </div>
      <div className="total-exams-info">
        <p className="total-text">Total Exams Generated:</p>
        <p className="total-number"> {usersData.totalExams || 0} Exams</p>
      </div>
      </div>

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
            {usersData.users.map((user) => (
              <tr
                  key={user.userId}
                  onClick={() => navigate(`/show-user/${user.userId}`)}
                  style={{ cursor: "pointer" }}
                >
                  <td>{user.userId}</td>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>
                    <button
                      onClick={(e) => handleDeleteUser(user.userId, user.email, e)}
                      className="admin-btn"
                      onMouseDown={(e) => e.stopPropagation()} // prevent row click on button press
                    >
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
