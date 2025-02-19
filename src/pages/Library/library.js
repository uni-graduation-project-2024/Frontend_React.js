// import React, { useState, useEffect } from 'react';
// import { useNavigate, useLocation } from 'react-router-dom';
// import { FaPlus, FaFolderOpen, FaUpload } from 'react-icons/fa';
// import Sidebar from '../../sidebar';
// import axios from 'axios';
// import './library.css';
// import linkhost from '../..';
// import { getAuthToken } from '../../services/auth';

// const Library = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
//   const [folders, setFolders] = useState([]);

//   const queryParams = new URLSearchParams(location.search);
//   const newFolder = queryParams.get('newFolder');
//   const {user} = getAuthToken();

//   const fetchFolders = async () => {
//     try {
//       const response = await axios.get(linkhost +`/api/Subject/all/${user.nameid}`);
//       setFolders(response.data);
//     } catch (error) {
//       console.error('Error fetching folders:', error);
//     }
//   };

//   useEffect(() => {
//     fetchFolders();
//   }, [location.search]);

//   useEffect(() => {
//     if (newFolder) {
//       setFolders((prevFolders) => [...prevFolders, { name: newFolder }]);
//     }
//   }, [newFolder]);

//   const handleCreateButtonClick = () => {
//     setIsCreateMenuOpen(!isCreateMenuOpen);
//   };

//   const handleNewFolderClick = () => {
//     navigate('/create-folder');
//   };

//   return (
//     <>
//     <Sidebar />
//     <div className="library-container">
//       <div className="library-header">
//         <h1 className="library-title">My Library</h1>
//         <div className="library-buttons">
//           <button onClick={handleCreateButtonClick} className="library-button">
//             <FaPlus className="mr-2" /> Create
//           </button>
//           <button className="library-button library-button-gray">
//             <FaUpload className="mr-2" /> My Uploads
//           </button>
//         </div>
//       </div>

//       {isCreateMenuOpen && (
//         <div className="library-create-menu">
//           <button onClick={handleNewFolderClick} className="library-button w-full mb-2">
//             <FaFolderOpen className="mr-2" /> New Folder
//           </button>
//           <button className="library-button w-full">
//             <FaPlus className="mr-2" /> New Lesson
//           </button>
//         </div>
//       )}

//       <div className="library-folders">
//         <h3 className="library-folders-title">Folders</h3>
//         <div className="library-folder-grid">
//           {folders.length === 0 ? (
//             <p>No folders created yet.</p>
//           ) : (
//             folders.map((folder, index) => (
//               <div key={index} className="library-folder">
//                 {folder.subjectName}
//               </div>
//             ))
//           )}
//         </div>
//       </div>
//     </div>
//     </>
//   );
// };

// export default Library;

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaPlus, FaFolderOpen, FaUpload } from "react-icons/fa";
import Sidebar from "../../sidebar";
import axios from "axios";
import "./library.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";

const Library = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);
  const [folders, setFolders] = useState([]);

  const queryParams = new URLSearchParams(location.search);
  const newFolder = queryParams.get("newFolder");
  const { user } = getAuthToken();

  const fetchFolders = async () => {
    try {
      const response = await axios.get(linkhost + `/api/Subject/all/${user.nameid}`);
      setFolders(response.data);
    } catch (error) {
      console.error("Error fetching folders:", error);
    }
  };

  useEffect(() => {
    fetchFolders();
  }, [location.search]);

  useEffect(() => {
    if (newFolder) {
      setFolders((prevFolders) => [...prevFolders, { name: newFolder }]);
    }
  }, [newFolder]);

  const handleCreateButtonClick = () => {
    setIsCreateMenuOpen(!isCreateMenuOpen);
  };

  const handleNewFolderClick = () => {
    navigate("/create-folder");
  };

  return (
    <>
    <Sidebar>
      <button className="sidebar-left" onClick={() => navigate("/view-all-exams")}>
        View All Exams
      </button>
      <button className="sidebar-left2" onClick={() => navigate("/view-exams")}>
        View Exams
      </button>
    </Sidebar>


      <div className="library-container">
        <div className="library-header">
          <h1 className="library-title">My Library</h1>
          <div className="library-buttons">
            <button onClick={handleCreateButtonClick} className="library-button">
              <FaPlus className="mr-2" /> Create
            </button>
            <button className="library-button library-button-gray">
              <FaUpload className="mr-2" /> My Uploads
            </button>
          </div>
        </div>

        {isCreateMenuOpen && (
          <div className="library-create-menu">
            <button onClick={handleNewFolderClick} className="library-button2">
              <FaFolderOpen className="mr-2" /> New Folder
            </button>
          </div>
        )}

        <div className="library-folders">
          <h3 className="library-folders-title">Folders</h3>
          <div className="library-folder-grid">
            {folders.length === 0 ? (
              <p>No folders created yet.</p>
            ) : (
              folders.map((folder) => (
                <div 
                  key={folder.id} 
                  className="library-folder" 
                  onClick={() => navigate(`/folder/${folder.id}`)}
                  style={{ cursor: "pointer", padding: "10px", borderRadius: "5px", background: "#444", color: "white", transition: "background 0.3s" }}
                >
                  {folder.subjectName}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Library;
