import React from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Sidebar from "../../sidebar";
import "./folderView.css";
import linkhost from "../..";

const FolderView = () => {
  const { folderId } = useParams();
  const navigate = useNavigate();

  const handleDeleteFolder = async () => {
    try {
      await axios.delete(`${linkhost}/api/Subject/${folderId}`);
      alert("Folder deleted successfully");
      navigate("/library"); 
    } catch (error) {
      console.error("Error deleting folder:", error);
    }
  };

  const handleRenameFolder = () => {
    const newName = prompt("Enter new folder name:");
    if (newName) {
      axios
        .put(`${linkhost}/api/Subject/${folderId}`, { subjectName: newName })
        .then(() => {
          alert("Folder renamed successfully");
        })
        .catch((error) => {
          console.error("Error renaming folder:", error);
        });
    }
  };

  return (
    <>
      <Sidebar />
      <div className="folder-view-container">
        <h1>Folder Details</h1>
        <div className="folder-buttons">
          <button className="folder-button delete" onClick={handleDeleteFolder}>
            Delete Folder
          </button>
          <button className="folder-button rename" onClick={handleRenameFolder}>
            Rename Folder
          </button>
        </div>
      </div>
    </>
  );
};

export default FolderView;
