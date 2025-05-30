import React, { useState } from 'react';
import axios from 'axios';

import './CreateFolder.css';
import linkhost from "../../" 
import { getAuthToken } from '../../services/auth';

const CreateFolder = ({ updateRefresh, onClose }) => {
  const [folderName, setFolderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {user} = getAuthToken();
  const folderColors = {
    "red": "rgba(229, 77, 77, 0.79)",
    "blue": "rgba(34, 215, 218, 0.62)",
    "green": "rgba(63, 222, 90, 0.64)",
    "yellow": "rgba(239, 244, 100, 0.63)",
    "purple": "rgba(82, 77, 229, 0.59)",
    "gray": "rgba(177, 177, 177, 0.63)",
    "pink": "rgba(255, 70, 184, 0.6)"
  };
  const [activeColor, setActiveColor] = useState("red");

  const handleFolderSubmit = async () => {
    if (!folderName.trim()) return;
    setIsSubmitting(true);
    
    const newFolder = { subjectName: folderName, subjectColor: folderColors[activeColor] };

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
      <div className="create-folder-box">
        <input
          id="folder-name"
          type="text"
          className="create-folder-input"
          placeholder='Subject Name'
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          disabled={isSubmitting}
          maxLength={20}
          autoFocus
        />

        <div className='subject-colors-container'>
        {Object.entries(folderColors).map(([colorName, colorValue])=>(
          <div className="color-picker"
          key={colorName}
          onClick={()=> setActiveColor(colorName)}
          style={{
            background: colorValue,
            border: activeColor === colorName ? '3px solid #b8b8b8' : '2px solid transparent',
          }}>
            { (activeColor === colorName) &&
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none" style={{"marginBottom": "2px"}}>
            <path d="M1 6.14286L5.30435 10L12 1" stroke="#FFFFFF" strokeWidth="3"/>
            </svg>}
          </div>
          ))}
        </div>
        
        <div className="create-folder-buttons">
          <button className="create-folder-button"
          style={{opacity: 0.9}}
          onClick={onClose}>Cancel</button>
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
