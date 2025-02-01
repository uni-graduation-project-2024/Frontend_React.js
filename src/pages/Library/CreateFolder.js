import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './CreateFolder.css'; 

const CreateFolder = () => {
  const [folderName, setFolderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleFolderSubmit = async () => {
    if (!folderName.trim()) return;
    setIsSubmitting(true);

    const newFolder = { name: folderName };

    try {
      const response = await axios.post('https://localhost:7163/api/folders', newFolder);

      if (response.status === 201 || response.status === 200) {
        console.log('Folder created successfully:', response.data);
        navigate(`/library?newFolder=${encodeURIComponent(folderName)}`);
      } else {
        console.error('Failed to create folder:', response.statusText);
      }
    } catch (error) {
      console.error('Error creating folder:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="create-folder-container">
      <h1 className="create-folder-title">Create New Folder</h1>
      <div className="create-folder-box">
        <h2 className="create-folder-subtitle">Use folders to organize your quizzes</h2>
        <div className="mb-4">
          <label className="create-folder-label" htmlFor="folder-name">
            New Folder Name
          </label>
          <input
            id="folder-name"
            type="text"
            className="create-folder-input"
            value={folderName}
            onChange={(e) => setFolderName(e.target.value)}
            disabled={isSubmitting}
          />
        </div>
        <button
          onClick={handleFolderSubmit}
          className="create-folder-button"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Creating...' : 'Create'}
        </button>
      </div>
    </div>
  );
};

export default CreateFolder;
