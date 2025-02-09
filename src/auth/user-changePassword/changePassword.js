import { useState } from "react";
import axios from "axios";
import { FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import "./changePassword.css";
import {getAuthToken} from "../../services/auth"
import Sidebar from "../../sidebar";
import linkHost from "../../"

export const ChangePassword = () => {
  const [formState, setFormState] = useState({
    loading: false,
    err: null,
  });

  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [formErrors, setFormErrors] = useState("");
  const [passwordVisibility, setPasswordVisibility] = useState({
    old: false,
    new: false,
    confirm: false,
  });

  const validateForm = () => {
    let errors = "";

    if (!oldPassword || !newPassword || !confirmPassword) {
      errors = "All fields are required.";
    } else if (newPassword !== confirmPassword) {
      errors = "New password and confirmation password do not match.";
    } else if (newPassword.length < 6) {
      errors = "New password must be at least 6 characters.";
    }

    setFormErrors(errors);
    return errors === "";
  };

  const submit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setFormState({ ...formState, loading: true });
    const {user} = getAuthToken();
    const userId = user.nameid;
    const post = linkHost + ((user.role === "Admin")? "/api/Admin/change-password" : "/api/User/change-password");
    axios
      .post(post, {
        userId,
        oldPassword,
        newPassword,
      })
      .then((response) => {
        setFormState({ ...formState, loading: false });
        alert("Password changed successfully!");
      })
      .catch((error) => {
        setFormState({
          ...formState,
          loading: false,
          err: [{ msg: "Failed to change password. Please try again." }],
        });
      });
  };

  const togglePasswordVisibility = (field) => {
    setPasswordVisibility((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  const loadingSpinner = () => (
    <div className="container h-100">
      <div className="row h-100 justify-content-center align-items-center">
        <div className="spinner-border" role="status">
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    </div>
  );

  const errorMessage = () => (
    <div className="container">
      <div className="row">
        {formState.err &&
          formState.err.map((err, index) => (
            <div
              key={index}
              className="col-sm-12 alert alert-danger"
              role="alert"
            >
              {err.msg}
            </div>
          ))}
        {formErrors && (
          <div className="col-sm-12 alert alert-danger" role="alert">
            {formErrors}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <>
      {formState.err !== null && errorMessage()}
      {formErrors && <div className="error-message">{formErrors}</div>}
      {formState.loading ? (
        loadingSpinner()
      ) : (
        <div className="overlay body">
          <Sidebar />
          <form onSubmit={submit} className="questionGeneration">
            <div className="f6">
              <header>
                <h2>Change Password</h2>
                <p>Update your account password</p>
              </header>
              <div className="field-set">
                <label htmlFor="oldPassword">
                  <FaKey /> Old Password
                </label>
                <div className="input-item">
                  <input
                    className="form-input"
                    type={passwordVisibility.old ? "text" : "password"}
                    placeholder="Old Password"
                    value={oldPassword}
                    onChange={(e) => setOldPassword(e.target.value)}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => togglePasswordVisibility("old")}
                  >
                    {passwordVisibility.old ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <label htmlFor="newPassword">
                  <FaKey /> New Password
                </label>
                <div className="input-item">
                  <input
                    className="form-input"
                    type={passwordVisibility.new ? "text" : "password"}
                    placeholder="New Password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => togglePasswordVisibility("new")}
                  >
                    {passwordVisibility.new ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <label htmlFor="confirmPassword">
                  <FaKey /> Confirm Password
                </label>
                <div className="input-item">
                  <input
                    className="form-input"
                    type={passwordVisibility.confirm ? "text" : "password"}
                    placeholder="Confirm Password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                  <span
                    className="eye-icon"
                    onClick={() => togglePasswordVisibility("confirm")}
                  >
                    {passwordVisibility.confirm ? <FaEyeSlash /> : <FaEye />}
                  </span>
                </div>

                <button className="log-in" type="submit">
                  Change Password
                </button>
              </div>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
