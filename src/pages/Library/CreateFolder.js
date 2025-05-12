import React, { useState } from 'react';
import axios from 'axios';

import './CreateFolder.css';
import linkhost from "../../" 
import { getAuthToken } from '../../services/auth';

const CreateFolder = ({ updateRefresh, onClose }) => {
  const [folderName, setFolderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {user} = getAuthToken();

  const handleFolderSubmit = async () => {
    if (!folderName.trim()) return;
    setIsSubmitting(true);
    
    const newFolder = { subjectName: folderName };

    try {
      const response = await axios.post(linkhost +`/api/Subject/${user.nameid}`, newFolder);

      if (response.status === 201 || response.status === 200) {
        console.log('Folder created successfully:', response.data);
        updateRefresh();
        onClose();
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
        <input
          id="folder-name"
          type="text"
          className="create-folder-input"
          placeholder='New Folder Name'
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          disabled={isSubmitting}
        />
        
        <div className="create-folder-buttons">
          <button
            onClick={handleFolderSubmit}
            className="create-folder-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Creating...' : 'Create'}
          </button>
          <button className="create-folder-button" onClick={onClose}>Cancel</button>
        </div>
      </div>
    </div>
  );
  
};

export default CreateFolder;
