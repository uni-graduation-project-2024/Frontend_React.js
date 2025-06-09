import React, { useRef, useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import axios from "axios";

import "./FolderView.css";
import linkhost from "../..";
import SubjectColors from "./SubjectColors";
import ExamsContainer from "./ExamsContainer";
import { useFoldersStore } from "../../hooks/useFolders";

const FolderView = () => {
  const { folderName } = useParams();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subjectId");
  const {getFolderBySubjectId, deleteFolder , updateFolderName, updateFolderColor} = useFoldersStore();
  const folder = getFolderBySubjectId(subjectId);
  const SubjectColorName = Object.entries(SubjectColors).find(
    ([key, value]) => value === folder?.subjectColor
  )?.[0];
  const [folderNameHolder, setFolderNameHolder] = useState(folderName);
  const [editSubjectName, setEditSubjectName] = useState(false);
  const [activeColor, setActiveColor] = useState(SubjectColorName || "blue");
  const [showColorOverlay, setShowColorOverlay ] = useState(false);
  const tempName = useRef(folderNameHolder);
  const [openDropdown, setOpenDropdown] = useState(true);
  const navigate = useNavigate();
  const overlayRef = useRef(null);
  

  /// For closing colors overlay when clicking outside of it
  useEffect(() => {
    const handleClickOutside = async(event) => {
      if (overlayRef.current && !overlayRef.current.contains(event.target)) {
        setShowColorOverlay(false);
      }
    };

    if (showColorOverlay) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showColorOverlay]);

  const handleDeleteFolder = async () => {
    if (window.confirm("Are you sure you want to delete this folder?")) {
      try {
        await axios.delete(`${linkhost}/api/Subject/${subjectId}`);
        deleteFolder(subjectId); // Update the store after deletion
        navigate("/library"); 
      } catch (error) {
        console.error("Error deleting folder:", error);
      }
    }
  };

  const handleRenameFolder = () => {
    setEditSubjectName(true);
  };

  const handleBlur = () => {
    const newName = tempName.current.trim();
    if( newName && newName !== folderNameHolder){
      axios.put(`${linkhost}/api/Subject/updateSubjectName?id=${subjectId}&subjectNewName=${newName}`)
      .then(()=>{
        updateFolderName(subjectId, newName); // Update the store with the new name
        setFolderNameHolder(newName);
      })
      .catch((error)=>{
        console.log("Error in renaming subject", error);
      });
    }
    setEditSubjectName(false);
  }

  const handleBackClick = () => {
    navigate("/library");
  };

  return (
    <>
      <div className="folder-view-container" onClick={()=> setOpenDropdown(false)}>
        <div className="folder-header">
          <ArrowLeft className="back-icon" onClick={handleBackClick} />
          <div className="subject-color" style={{background: SubjectColors[activeColor] || SubjectColors.blue}}
          onClick={()=> setShowColorOverlay(true)}
          >
            {showColorOverlay &&
            <div ref={overlayRef} className="change-color-overlay">
              {Object.entries(SubjectColors).map(([colorName, colorValue])=>(
              <div className="color-picker"
              key={colorName}
              onClick={async()=> {
                setActiveColor(colorName);
                await axios.put(`${linkhost}/api/Subject/updateSubjectColor?id=${subjectId}&subjectNewColor=${colorValue}`)
                .then(()=>{
                  updateFolderColor(subjectId, colorValue); // Update the store with the new color
                });
              }}
              style={{
                background: colorValue,
                border: activeColor === colorName ? '3px solid #b8b8b8' : '2px solid transparent',
              }}>
                { (activeColor === colorName) &&
                <svg width="13" height="12" viewBox="0 0 13 12" fill="none" style={{"marginBottom": "2px"}}>
                <path d="M1 6.14286L5.30435 10L12 1" stroke="#FFFFFF" strokeWidth="3"/>
                </svg>}
              </div>
              ))}
            </div>
            }
          </div>
          <div className="folder-title">
            { (editSubjectName)? 
            <input type="text" className="edit-subject-name"
            defaultValue={folderNameHolder}
            onChange={(e)=>{tempName.current = e.target.value}}
            onBlur={handleBlur}
            maxLength={20}
            autoFocus
            />:
            <h1>{folderNameHolder}</h1>
            }
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
