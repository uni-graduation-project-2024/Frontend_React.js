import React, { useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import axios from "axios";

import "./folderView.css";
import linkhost from "../..";
import ExamsContainer from "./ExamsContainer";

const FolderView = () => {
  const { folderName } = useParams();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subjectId");
  const [folderNameHolder, setFolderNameHolder] = useState(folderName);
  const [openDropdown, setOpenDropdown] = useState(true);
  const navigate = useNavigate();

  const handleDeleteFolder = async () => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      try {
        await axios.delete(`${linkhost}/api/Subject/${subjectId}`);
        navigate("/library"); 
      } catch (error) {
        console.error("Error deleting folder:", error);
      }
    }
  };

  const handleRenameFolder = () => {
    const newName = prompt("Enter new folder name:");
    if (newName) {
      axios
        .put(`${linkhost}/api/Subject/${subjectId}`, { subjectName: newName })
        .then(() => {
          setFolderNameHolder(newName);
        })
        .catch((error) => {
          console.error("Error renaming folder:", error);
        });
    }
  };

  const handleBackClick = () => {
    navigate("/library");
  };

  return (
    <>
      <div className="folder-view-container" onClick={()=> setOpenDropdown(false)}>
        <div className="folder-header">
          <ArrowLeft className="back-icon" onClick={handleBackClick} />
          <div className="folder-title">
            <h1>{folderNameHolder}</h1>
            <Pencil className="rename-icon" onClick={handleRenameFolder} />
            <Trash2 className="delete-icon" onClick={handleDeleteFolder} />
          </div>
        </div>

        <ExamsContainer subjectId={subjectId}
         openDropdown={openDropdown} 
         updateDropdown={setOpenDropdown}/>
      </div>
    </>
  );
};

export default FolderView;
