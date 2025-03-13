import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { FaPlus, FaUpload } from "react-icons/fa";
import axios from "axios";

import "./library.css";
import { useFolders } from "../../hooks/useFolders";
import ExamCard from "./ExamsContainer";
import FolderCard from "./FolderCard";  // Import the updated FolderCard
import linkhost from "../..";
import { FoldersContainer } from "./FoldersContainer";
import ExamsContainer from "./ExamsContainer";

const Library = () => {
  const navigate = useNavigate();
  const [refresh, setRefresh] = useState(false);
  //const { folders } = useFolders(refresh);
  //const { exams } = useExams(null, refresh);
  const [folderMode, setFolderMode] = useState(null);
  const [openDropdown, setOpenDropdown] = useState(true);

  const handleRefresh = () => {
    setRefresh((prev) => !prev); // Toggle refresh to trigger re-fetch
  };

  return (
      <div className="library-container" onClick={() => setOpenDropdown(false)}>
        <div className="library-header">
          <div className="library-buttons">
            <button onClick={() => navigate("/create-folder")} className="library-button">
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

