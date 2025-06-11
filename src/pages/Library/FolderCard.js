import React from "react";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";

import { moveExamToFolder } from "../../services/folderService";
import { useFoldersStore } from "../../hooks/useFolders";
import { useExamsStore } from "../../hooks/useExams";

const ItemTypes = {
  EXAM: "exam",
};

const FolderCard = ({ folder}) => {
  const navigate = useNavigate();
  const { refreshFolders } = useFoldersStore();
  const { refreshExams } = useExamsStore();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.EXAM,
    drop: async (item) => {
      try {
        await moveExamToFolder(item.id, folder.subjectId); // Ensure move completes
        refreshFolders();
        refreshExams(); // Refresh exams after moving
      } catch (error) {
        console.error("Failed to move exam:", error);
      }
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));

  const handleClick = (e) => {
    e.stopPropagation();
    if (isOver) return; // Prevent navigation if an exam is being dropped
    navigate(`/folder/${folder.subjectName}?subjectId=${folder.subjectId}`);
  };

  return (
    <>

    <div
      ref={drop}
      className={`library-folder ${isOver ? "folder-highlight" : ""}`}
      onClick={handleClick}
      style={{background: folder.subjectColor || "rgba(34, 215, 218, 0.62)"}}
    >
    <div className="folder-tab"
    style={{background: (folder.subjectColor)? folder.subjectColor.replace(/rgba\(([^)]+),\s*[\d.]+\)/, 'rgba($1, 1)'): "rgba(34, 215, 218, 1)"}}></div>
      <p className="folder-name">{folder.subjectName}</p>
      <div className="folder-exams-number">{folder.numExams || 0}</div>
    </div>
    </>
  );
};

export default FolderCard;
