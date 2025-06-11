import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatbotSidebar.css';

const ChatbotSidebar = ({
  chatSessions,
  setChatSessions,
  currentDate,
  setCurrentDate,
  setChatHistory,
  saveSessions, // ✅ Added
}) => {
  const [sortBy, setSortBy] = useState('newest');
  const [menuOpen, setMenuOpen] = useState(null);
  const navigate = useNavigate();

  const sortKeys = (a, b) => {
    const [dateA, nameA = ''] = a.split(' - ');
    const [dateB, nameB = ''] = b.split(' - ');

    if (sortBy === 'newest') return new Date(dateB) - new Date(dateA);
    if (sortBy === 'oldest') return new Date(dateA) - new Date(dateB);
    if (sortBy === 'title') return nameA.localeCompare(nameB);
    return 0;
  };

  const renameChat = (oldKey) => {
    const newName = prompt('Enter a new name for this chat:');
    if (!newName?.trim()) return;

    const datePart = oldKey.split(' - ')[0];
    const newKey = `${datePart} - ${newName.trim()}`;
    if (chatSessions[newKey]) {
      alert('A chat with this name already exists.');
      return;
    }

    const updated = { ...chatSessions };
    updated[newKey] = updated[oldKey];
    delete updated[oldKey];

    saveSessions(updated); // ✅ Persist to localStorage
    setCurrentDate(newKey);
    setChatHistory(updated[newKey]);
  };

  const deleteChat = (key) => {
    if (!window.confirm('Delete this chat?')) return;

    const updated = { ...chatSessions };
    delete updated[key];

    saveSessions(updated); // ✅ Persist to localStorage

    if (key === currentDate) {
      const remainingKeys = Object.keys(updated).sort(sortKeys);
      const next = remainingKeys[0] || new Date().toISOString().split('T')[0];
      setCurrentDate(next);
      setChatHistory(updated[next] || []);
    }
  };

  return (
    <aside className="chatbot-sidebar">
      <div className="sidebar-header">
        <button className="back-btn" onClick={() => navigate('/library')}>← Back</button>
        <h2>Chats</h2>
      </div>

      <div className="sort-options">
        <label>Sort by:</label>
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="newest">Newest</option>
          <option value="oldest">Oldest</option>
          <option value="title">Title</option>
        </select>
      </div>

      {Object.keys(chatSessions)
        .sort(sortKeys)
        .map((key) => (
          <div key={key} className="sidebar-chat-entry">
            <button
              className={`sidebar-btn ${key === currentDate ? 'active' : ''}`}
              onClick={() => {
                setCurrentDate(key);
                setChatHistory(chatSessions[key]);
              }}
            >
              {key}
            </button>

            <div className="chat-options">
              <button
                className="dots-btn"
                onClick={() => setMenuOpen(menuOpen === key ? null : key)}
              >
                ⋮
              </button>
              {menuOpen === key && (
                <div className="dropdown-menu">
                  <button onClick={() => renameChat(key)}>✏️ Rename</button>
                  <button onClick={() => deleteChat(key)}>🗑️ Delete</button>
                </div>
              )}
            </div>
          </div>
        ))}

      <button
        className="new-chat-btn"
        onClick={() => {
          const today = new Date().toISOString().split('T')[0];
          const uniqueKey = Object.keys(chatSessions).some((key) => key.startsWith(today))
            ? `${today} - ${Date.now()}`
            : today;
          const updated = { ...chatSessions, [uniqueKey]: [] };
          saveSessions(updated); // ✅ Persist to localStorage
          setCurrentDate(uniqueKey);
          setChatHistory([]);
        }}
      >
        + New Chat
      </button>
    </aside>
  );
};

export default ChatbotSidebar;
