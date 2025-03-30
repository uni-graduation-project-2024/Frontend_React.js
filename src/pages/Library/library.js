import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { FaPlus, FaUpload } from "react-icons/fa";

import "./Library.css";
import { FoldersContainer } from "./FoldersContainer";
import ExamsContainer from "./ExamsContainer";
import CreateFolder from "./CreateFolder";

const Library = () => {
  const navigate = useNavigate();
  const { openModal } = useOutletContext();
  const [refresh, setRefresh] = useState(false);
  const [folderMode, setFolderMode] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(true);

  const handleCreateFolder = () => {
    openModal(<CreateFolder updateRefresh={setRefresh} onClose={() => openModal(null)}/>);
  };

  const handleRefresh = (state) => {
    setRefresh((prev) => !prev); // Toggle refresh to trigger re-fetch
  };

  return (
      <div className="library-container" onClick={() => setOpenDropdown(false)}>
        <div className="library-header">
          <div className="library-buttons">
            <button onClick={handleCreateFolder} className="library-button">
              <FaPlus className="mr-2" /> Create Folder
            </button>
            <button onClick={() => navigate("/my-uploads")} className="library-button library-button-gray">
              <FaUpload className="mr-2" /> My Uploads
            </button>
          </div>
        </div>

        <div className={`view-mode ${folderMode === null ? "active" : ""}`} onClick={() => setFolderMode(null)}>Folders</div>
        <div className={`view-mode ${folderMode === -1 ? "active" : ""}`} onClick={() => setFolderMode(-1)}>All Exams</div>

        {folderMode === null && (
          <FoldersContainer updateRefresh={handleRefresh} refresh={refresh}/>
        )}

        <ExamsContainer subjectId={folderMode} openDropdown={openDropdown} updateDropdown={setOpenDropdown} refresh={refresh}/>
      </div>
  );
};

export default Library;

