import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FaPlus, FaFolderOpen, FaUpload } from 'react-icons/fa';
import axios from 'axios';
import './library.css';

const Library = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [folders, setFolders] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const newFolder = queryParams.get('newFolder');

  const fetchFolders = async () => {
    try {
      const response = await axios.get('https://localhost:7163/api/folders');
      setFolders(response.data);
    } catch (error) {
      console.error('Error fetching folders:', error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [location.search]);

  useEffect(() => {
    if (newFolder) {
      setFolders((prevFolders) => [...prevFolders, { name: newFolder }]);
    }
  }, [newFolder]);

  const handleCreateButtonClick = () => {
    setIsCreateMenuOpen(!isCreateMenuOpen);
  };

  const handleNewFolderClick = () => {
    navigate('/create-folder');
  };

  return (
    <div className="library-container">
      <div className="library-header">
        <h1 className="library-title">My Library</h1>
        <div className="library-buttons">
          <button onClick={handleCreateButtonClick} className="library-button">
            <FaPlus className="mr-2" /> Create
          </button>
          <button className="library-button library-button-gray">
            <FaUpload className="mr-2" /> My Uploads
          </button>
        </div>
      </div>

      {isCreateMenuOpen && (
        <div className="library-create-menu">
          <button onClick={handleNewFolderClick} className="library-button w-full mb-2">
            <FaFolderOpen className="mr-2" /> New Folder
          </button>
          <button className="library-button w-full">
            <FaPlus className="mr-2" /> New Lesson
          </button>
        </div>
      )}

      <div className="library-folders">
        <h3 className="library-folders-title">Folders</h3>
        <div className="library-folder-grid">
          {folders.length === 0 ? (
            <p>No folders created yet.</p>
          ) : (
            folders.map((folder, index) => (
              <div key={index} className="library-folder">
                {folder.name}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Library;
