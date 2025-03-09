import React, { useState} from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUpload } from "react-icons/fa";

import "./library.css";
import { useFolders } from "../../hooks/useFolders";
import ExamCard from "./ExamCard";

const Library = () => {
  const navigate = useNavigate();
  const { folders } = useFolders();
  const [folderMode, setFolderMode] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(true);


  const handleNewFolderClick = () => {
    navigate("/create-folder");
  };

  const handleViewAllExamMode = ()=>{
    setFolderMode(-1);
  }

  const handleViewFolder = ()=>{
    setFolderMode(null);
  }

  return (
    <>
      <div className="library-container" onClick={()=> setOpenDropdown(false)}>
        <div className="library-header">
          <h1 className="library-title">My Library</h1>
          <div className="library-buttons">
            <button onClick={handleNewFolderClick} className="library-button">
              <FaPlus className="mr-2" /> Create
            </button>
            <button className="library-button library-button-gray">
              <FaUpload className="mr-2" /> My Uploads
            </button>
          </div>
        </div>

        <div className="sidebar-left" onClick={handleViewFolder}>Folders</div>
        <div className="sidebar-left2" onClick={handleViewAllExamMode}>All Exams</div>

        { folderMode === null && (
          <div className="library-folders">
            <h3 className="library-folders-title">Folders</h3>
            <div className="library-folder-grid">
              {folders.length === 0 ? (
                <p>No folders created yet.</p>
              ) : (
                folders.map((folder) => (
                  <div 
                    key={folder.subjectId} 
                    className="library-folder" 
                    onClick={() => navigate(`/folder/${folder.subjectName}?subjectId=${folder.subjectId}`)}
                  >
                    {folder.subjectName}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        
        <ExamCard subjectId={folderMode} 
        openDropdown={openDropdown} 
        updateDropdown={setOpenDropdown}
        />

      </div>
    </>
  );
};

export default Library;
