import React, { useRef, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2, Pencil } from "lucide-react";
import axios from "axios";

import "./FolderView.css";
import linkhost from "../..";
import SubjectColors from "./SubjectColors";
import ExamsContainer from "./ExamsContainer";

const FolderView = () => {
  const { folderName } = useParams();
  const [searchParams] = useSearchParams();
  const subjectId = searchParams.get("subjectId");
  const [folderNameHolder, setFolderNameHolder] = useState(folderName);
  const [editSubjectName, setEditSubjectName] = useState(false);
  const [activeColor, setActiveColor] = useState("red");
  const [showColorOverlay, setShowColorOverlay ] = useState(false);
  const tempName = useRef(folderNameHolder);
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
    setEditSubjectName(true);
  };

  const handleBlur = () => {
    const newName = tempName.current.trim();
    if( newName && newName !== folderNameHolder){
      axios.put(`${linkhost}/api/Subject/${subjectId}?subjectName=${newName}`)
      .then(()=>{
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
          <div className="subject-color" style={{background: "#000000"}}
          onClick={()=> setShowColorOverlay(true)}
          >
            {showColorOverlay &&
            <div className="change-color-overlay" onBlur={()=> showColorOverlay(false)}>
              {Object.entries(SubjectColors).map(([colorName, colorValue])=>(
              <div className="color-picker"
              key={colorName}
              onClick={()=> setActiveColor(colorName)}
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
