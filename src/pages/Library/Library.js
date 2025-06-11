import React, { useState } from "react";
import { useOutletContext } from "react-router-dom";
import { FaPlus, FaUpload } from "react-icons/fa";

import "./Library.css";
import { FoldersContainer } from "./FoldersContainer";
import ExamsContainer from "./ExamsContainer";
import CreateFolder from "./CreateFolder";

const Library = () => {
  const { openModal } = useOutletContext();
  const [folderMode, setFolderMode] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(true);

  const handleCreateFolder = () => {
    openModal(<CreateFolder onClose={() => openModal(null)}/>);
  };


  return (
      <div className="library-container" onClick={() => setOpenDropdown(false)}>
        <div className="library-header">
          <p className="subject-title">Subjects</p>
          <div className="library-buttons">
            <button onClick={handleCreateFolder} className="library-button" title="Create Subject">
              <FaPlus className="mr-2" />
            </button>
          </div>
        </div>

        <FoldersContainer/>

        <ExamsContainer subjectId={folderMode} openDropdown={openDropdown} updateDropdown={setOpenDropdown}/>
      </div>
  );
};

export default Library;

