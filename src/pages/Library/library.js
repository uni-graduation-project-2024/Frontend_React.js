import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaUpload } from "react-icons/fa";
import Sidebar from "../../sidebar";
import axios from "axios";
import "./library.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";
import ViewExams from "./viewExams";
import { subjectData } from "../../Data/staticDB";

const Library = () => {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [viewMode, setViewMode] = useState(null);
  const { user } = getAuthToken();

  // useEffect(() => {
  //   const fetchFolders = async () => {
  //     try {
  //       const response = await axios.get(linkhost + `/api/Subject/all/${user.nameid}`);
  //       setFolders(response.data);
  //     } catch (error) {
  //       console.error("Error fetching folders:", error);
  //     }
  //   };
  //   fetchFolders();
  // }, [navigate, user.nameid]);
  useEffect(() => {
      setFolders(subjectData);
    },[]);


  const handleNewFolderClick = () => {
    navigate("/create-folder");
  };

  const handleViewAllExamMode = ()=>{
    setViewMode(0);
  }

  const handleViewFolder = ()=>{
    setViewMode(null);
  }

  return (
    <>
    <Sidebar/>

      <div className="library-container">
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

        <button className="sidebar-left" onClick={handleViewFolder}>Folders</button>
        <button className="sidebar-left2" onClick={handleViewAllExamMode}>All Exams</button>

        { viewMode === null && (
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
                    style={{ cursor: "pointer", padding: "10px", borderRadius: "5px", background: "#444", color: "white", transition: "background 0.3s" }}
                  >
                    {folder.subjectName}
                  </div>
                ))
              )}
            </div>
          </div>
        )}
        <ViewExams subjectId={viewMode}/>
        
      </div>
    </>
  );
};

export default Library;
