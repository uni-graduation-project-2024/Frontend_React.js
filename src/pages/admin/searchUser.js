import React, { useState } from 'react';
import './searchUser.css';
import { getAuthToken } from '../../services/auth'; // Adjust path if needed

const SearchUser = () => {
  const { token } = getAuthToken(); // Get token internally
  const [query, setQuery] = useState('');
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!query.trim()) return;

    setLoading(true);
    setError(null);
    setUsers([]);

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

  return (
    <div className="su-search-user-container">
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
            {users.length === 0 && !loading && query.trim() !== '' && (
            <li>No users found.</li>
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
