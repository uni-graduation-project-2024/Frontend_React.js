import React, { useState, useEffect } from "react";
import axios from "axios";

import "./MoveToFolder.css";
import linkhost from "../..";
import { useFoldersStore } from "../../hooks/useFolders";
import { useExamsStore } from "../../hooks/useExams";

const MoveExam = ({examId, subId, onClose }) => { 
  const { allFolders, refreshFolders } = useFoldersStore();
  const { refreshExams } = useExamsStore();
  const [examFolder, setExamFolder] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);

  const folders = allFolders;

  useEffect(() => {
    if(subId && folders.length > 0){
      setSelectedFolder(subId);
      const matchedFolder = folders.find((folder) => folder.subjectId === subId); // this does not find the folder correctly
      if (matchedFolder) {
        setExamFolder(matchedFolder.subjectName); // Store the folder name
      }
    }
  }, [subId, folders]);

  const moveExam = (folder) => {
    axios.patch(`${linkhost}/api/Exam/${examId}/${folder}`)
      .then(() => {
        setExamFolder(folder);
        refreshExams();
        refreshFolders();
        onClose();
      })
      .catch(error => console.error("Error moving exam:", error));
  };

  return (
    <div className="move-exam-frame">
      <div className="move-exam-container">
        <h2>Move Exam</h2>

        {/* Dropdown List for Folders */}
        <select 
          className="folder-dropdown"
          value={selectedFolder || ""} 
          onChange={(e) => setSelectedFolder(e.target.value)}
        >
          <option value="-1">No folder</option>
          {folders.length === 0 ? (
            <option disabled>No folders created yet.</option>
          ) : (
            folders.map((folder) => (
              <option key={folder.subjectId} value={folder.subjectId}>
                {folder.subjectName}
              </option>
            ))
          )}
        </select>
        {/* Exam Status */}
        <div className="exam-status">
          <p>Exam is currently in: {examFolder ? examFolder : "No Folder"}</p>
        </div>

        {/* Buttons for Action */}
        <div className="action-buttons">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn" onClick={() => moveExam(selectedFolder)}>Save</button>
        </div>
      </div>
  </div>

  );
};

export default MoveExam;
