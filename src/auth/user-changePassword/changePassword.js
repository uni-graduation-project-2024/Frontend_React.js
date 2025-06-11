import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { FaKey, FaEye, FaEyeSlash } from "react-icons/fa";
import "./changePassword.css";
import { getAuthToken } from "../../services/auth";
import linkHost from "../../";

export const ChangePassword = () => {
  const navigate = useNavigate();
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
    const { user } = getAuthToken();
    const userId = user.nameid;
    const post = linkHost + ((user.role === "Admin") ? "/api/Admin/change-password" : "/api/User/change-password");

    axios.post(post, {
      userId,
      oldPassword,
      newPassword,
    })
      .then((response) => {
        setFormState({ ...formState, loading: false });
        alert("Password changed successfully!");
      })
      .catch(() => {
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
    <div className="cp-spinner-container">
      <div className="cp-spinner" role="status" />
    </div>
  );

  const errorMessage = () => (
    <div className="cp-error-container">
      {formState.err &&
        formState.err.map((err, index) => (
          <div key={index} className="cp-error-alert" role="alert">
            {err.msg}
          </div>
        ))}
      {formErrors && (
        <div className="cp-error-alert" role="alert">
          {formErrors}
        </div>
      )}
    </div>
  );

  return (
    <>
      {formState.err !== null && errorMessage()}
      {formErrors && <div className="cp-error-message">{formErrors}</div>}
      {formState.loading ? (
        loadingSpinner()
      ) : (
        <div className="cp-form-container">
          <form onSubmit={submit} className="cp-form-content">
            <div className="cp-form-header">
              <h2>Change Password</h2>
              <p>Update your account password</p>
            </div>

            <div className="cp-form-fields">
              <label htmlFor="oldPassword"><FaKey /> Old Password</label>
              <div className="cp-input-container">
                <input
                  className="cp-input-field"
                  type={passwordVisibility.old ? "text" : "password"}
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <span className="cp-visibility-icon" onClick={() => togglePasswordVisibility("old")}>
                  {passwordVisibility.old ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <label htmlFor="newPassword"><FaKey /> New Password</label>
              <div className="cp-input-container">
                <input
                  className="cp-input-field"
                  type={passwordVisibility.new ? "text" : "password"}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                />
                <span className="cp-visibility-icon" onClick={() => togglePasswordVisibility("new")}>
                  {passwordVisibility.new ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <label htmlFor="confirmPassword"><FaKey /> Confirm Password</label>
              <div className="cp-input-container">
                <input
                  className="cp-input-field"
                  type={passwordVisibility.confirm ? "text" : "password"}
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span className="cp-visibility-icon" onClick={() => togglePasswordVisibility("confirm")}>
                  {passwordVisibility.confirm ? <FaEyeSlash /> : <FaEye />}
                </span>
              </div>

              <button className="cp-submit-btn" type="submit">Change Password</button>
              <button onClick={() => navigate("/user-profile")} type="button" className="cp-cancel-btn">Cancel</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default ChangePassword;
