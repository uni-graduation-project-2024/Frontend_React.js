import React, { useState, useEffect } from 'react';
import './searchUser.css';
import { getAuthToken } from '../../services/auth';
import { useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const SearchUser = () => {
  const { token } = getAuthToken();
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [hasSearched, setHasSearched] = useState(false);
  const navigate = useNavigate(); // for back navigation

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setUsers([]);
    setHasSearched(true);

    try {
      const response = await fetch(
        `https://localhost:7078/api/Admin/search-user?query=${encodeURIComponent(query)}`,
        {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      setUsers(data || []);
    } catch (err) {
      setError(err.message || 'Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') handleSearch();
  };

  useEffect(() => {
    if (!query.trim()) {
      setUsers([]);
      setHasSearched(false);
      setError(null);
    }
  }, [query]);

  return (
    <div className="su-search-user-container">
      <button className="su-back-btn" onClick={() => navigate('/admin/layout')}>
        <FaArrowLeft style={{ marginRight: '8px' }} />
        Back to Admin Panel
      </button>

      <h2>Admin User Search</h2>

      <div className="su-search-input-group">
        <input
          type="text"
          placeholder="Enter username or email"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={loading}
          className="su-search-user-input"
        />
        <button onClick={handleSearch} disabled={loading || !query.trim()}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div className="su-search-error">{error}</div>}

      <ul className="su-search-user-results">
        {hasSearched && !loading && users.length === 0 && (
          <li className="err-su">No users found.</li>
        )}
        {users.map((user) => (
          <li key={user.userId || user.id || user.email} className="su-user-item">
            <p><strong>Username:</strong> {user.username || user.userName || 'N/A'}</p>
            <p><strong>Email:</strong> {user.email || user.userEmail || 'N/A'}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchUser;
