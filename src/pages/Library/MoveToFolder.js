import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./MoveToFolder.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";

const MoveExam = () => {
  const location = useLocation();
  const { examId, subId } = location.state || {};
  const [folders, setFolders] = useState([]);
  const [examFolder, setExamFolder] = useState(null);
  const [selectedFolder, setSelectedFolder] = useState(null);
  const { user } = getAuthToken();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(linkhost + `/api/Subject/all/${user.nameid}`)
      .then(response => {
        setFolders(response.data);
        setSelectedFolder(subId);
        if (subId) {
          const matchedFolder = response.data.find(folder => folder.subjectId === subId);
          if (matchedFolder) {
            setExamFolder(matchedFolder.subjectName); // Store the folder name
          }
        }
      })
      .catch(error => console.error("Error fetching folders:", error));

    if(subId){
      setExamFolder(subId);
    }
  }, [user.nameid, subId]);

  const moveExam = (folder) => {
    axios.patch(`${linkhost}/api/Exam/${examId}/${folder}`)
      .then(() => {
        setExamFolder(folder);
        navigate('/library');
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
          <option value="">Select a folder</option>
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
          <button className="cancel-btn" onClick={() => navigate('/library')}>Cancel</button>
          <button className="save-btn" onClick={() => moveExam(selectedFolder)}>Save</button>
        </div>
      </div>
  </div>

  );
};

export default MoveExam;
