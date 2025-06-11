import { Link, Outlet, useNavigate } from "react-router-dom";
import "./admin-layout.css";
import {
  FaUsers,
  FaSearch,
  FaExclamationTriangle,
  FaSignOutAlt,
} from "react-icons/fa";
import { getAuthToken, removeAuthToken } from "../../services/auth";

const AdminLayout = () => {
  const navigate = useNavigate();
  const auth = getAuthToken();

  if (!auth?.token) {
    navigate("/admin/login");
    return null;
  }

  const handleLogOutClick = () => {
    removeAuthToken();
    navigate("/admin/login");
  };

  return (
    <div className="lt-admin__layout">
      <header className="lt-admin__header">
        <h1 className="lt-admin__title">Learntendo Admin Panel</h1>
        <nav className="lt-admin__nav">
          <ul className="lt-admin__list">
            <li className="lt-admin__item">
              <Link to="/admin/dashboard" className="lt-admin__link">
                <FaUsers /> Users
              </Link>
            </li>
            <li className="lt-admin__item">
              <Link to="/admin/search-user" className="lt-admin__link">
                <FaSearch /> Search
              </Link>
            </li>
            <li className="lt-admin__item">
              <Link to="/admin/view-delete-reports" className="lt-admin__link">
                <FaExclamationTriangle /> Reports
              </Link>
            </li>
            <li className="lt-admin__item">
              <button onClick={handleLogOutClick} className="lt-admin__link logout-btn">
                <FaSignOutAlt /> Logout
              </button>
            </li>
          </ul>
        </nav>
      </header>

      <main className="lt-admin__main">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
