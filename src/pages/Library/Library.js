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

  const handleRefresh = (state) => {
    setRefresh((prev) => !prev); // Toggle refresh to trigger re-fetch
  };
  const handleCreateFolder = () => {
    openModal(<CreateFolder updateRefresh={handleRefresh} onClose={() => openModal(null)}/>);
  };



  return (
      <div className="library-container" onClick={() => setOpenDropdown(false)}>
        <div className="library-header">
          <p className="subject-title">Subjects</p>
          <div className="library-buttons">
            <button onClick={handleCreateFolder} className="library-button">
              <FaPlus className="mr-2" />
            </button>
          </div>
        </div>

        <FoldersContainer updateRefresh={handleRefresh} refresh={refresh}/>

        <ExamsContainer subjectId={folderMode} openDropdown={openDropdown} updateDropdown={setOpenDropdown} refresh={refresh}/>
      </div>
  );
};

export default Library;

