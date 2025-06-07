import React from 'react';
import './search.css';

const Search = ({ searchQuery, setSearchQuery }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <form className="search-container" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Search by file name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-input"
      />
      <button type="submit" className="search-button">Search</button>
    </form>
  );
};

export default Search;
