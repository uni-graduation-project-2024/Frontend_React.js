import React, { useState, useEffect } from "react";
import axios from "axios";
import "./MoveToFolder.css";

const MoveExam = () => {
  const [folders, setFolders] = useState([]);
  const [examFolder, setExamFolder] = useState(null);

  useEffect(() => {
    axios.get("/api/folders")
      .then(response => setFolders(response.data))
      .catch(error => console.error("Error fetching folders:", error));
  }, []);

  const moveExam = (folder) => {
    axios.post("/api/move-exam", { folder })
      .then(() => setExamFolder(folder))
      .catch(error => console.error("Error moving exam:", error));
  };

  return (
    <div className="move-exam-container">
      <h2>Move Exam</h2>
      <div className="folders">
        {folders.map((folder, index) => (
          <button key={index} className="folder-btn" onClick={() => moveExam(folder)}>
            {folder}
          </button>
        ))}
        <button className="no-folder-btn" onClick={() => moveExam(null)}>
          No Folder
        </button>
      </div>
      <div className="exam-status">
        <p>Exam is currently in: {examFolder ? examFolder : "No Folder"}</p>
      </div>
    </div>
  );
};

export default MoveExam;
