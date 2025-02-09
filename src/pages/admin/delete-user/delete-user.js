
import { useEffect, useState } from "react";
import axios from "axios";
import { getAuthToken } from "../../../services/auth";
import { useParams, useNavigate } from "react-router-dom";
import "./delete-user.css";

const DeleteUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { token } = getAuthToken();

  const [deleteUser, setDeleteUser] = useState({
    loading: false,
    success: false,
    err: null,
  });

  useEffect(() => {
    if (!id) {
      setDeleteUser({ ...deleteUser, err: "User ID is missing." });
    }
  }, [id]);

  const handleDelete = () => {
    setDeleteUser({ ...deleteUser, loading: true });
    
    axios
      .delete(`https://localhost:7163/api/Admin/DeleteUser/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setDeleteUser({ ...deleteUser, loading: false, success: true });
        setTimeout(() => navigate("/users"), 2000);
      })
      .catch((error) => {
        setDeleteUser({ ...deleteUser, loading: false, err: error.response?.data || "Something went wrong." });
      });
  };

  return (
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="col-xl-12">
          <div className="card mb-4">
            <div className="card-header">Delete User</div>
            <div className="card-body">
              {deleteUser.success && (
                <div className="alert alert-success" role="alert">
                  User deleted successfully! Redirecting...
                </div>
              )}
              {deleteUser.err && (
                <div className="alert alert-danger" role="alert">
                  {deleteUser.err}
                </div>
              )}
              <p>Are you sure you want to delete this user?</p>
              <button className="btn btn-danger" onClick={handleDelete} disabled={deleteUser.loading}>
                {deleteUser.loading ? "Deleting..." : "Delete User"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteUser;