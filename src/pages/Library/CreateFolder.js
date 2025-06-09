import React, { useState } from 'react';
import axios from 'axios';

import './CreateFolder.css';
import linkhost from "../../";
import SubjectColors from './SubjectColors';
import { getAuthToken } from '../../services/auth';
import { useFoldersStore } from '../../hooks/useFolders';

const CreateFolder = ({ onClose }) => {
  const [folderName, setFolderName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {user} = getAuthToken();
  const [activeColor, setActiveColor] = useState("red");
  const [errorMessage, setErrorMessage] = useState('');
  const { addFolder } = useFoldersStore();

  const handleFolderSubmit = async () => {
    if (!folderName.trim()) {
      setErrorMessage('Subject name cannot be empty');
      return
    };
    setIsSubmitting(true);
    
    const newFolder = { subjectName: folderName, subjectColor: SubjectColors[activeColor] };

    try {
      const response = await axios.post(linkhost +`/api/Subject/${user.nameid}`, newFolder);

      if (response.status === 201 || response.status === 200) {
        addFolder(response.data);
        console.log('Folder created successfully:', response.data);
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
          className={ errorMessage? "create-folder-input error-sub-Name-required":"create-folder-input"}
          placeholder='Subject Name'
          value={folderName}
          onChange={(e) => {setFolderName(e.target.value); setErrorMessage('');}}
          disabled={isSubmitting}
          maxLength={20}
          autoFocus
        />

        <div className='subject-colors-container'>
        {Object.entries(SubjectColors).map(([colorName, colorValue])=>(
          <div className="color-picker"
          key={colorName}
          onClick={()=> setActiveColor(colorName)}
          style={{
            background: colorValue,
            border: activeColor === colorName ? '3px solid #b8b8b8' : '2px solid transparent',
          }}>
            { (activeColor === colorName) &&
            <svg width="13" height="12" viewBox="0 0 13 12" fill="none">
            <path d="M1 6.14286L5.30435 10L12 1" stroke="#FFFFFF" strokeWidth="3"/>
            </svg>}
          </div>
          ))}
        </div>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        
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
