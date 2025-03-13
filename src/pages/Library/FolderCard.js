import React from "react";
import { useNavigate } from "react-router-dom";
import { useDrop } from "react-dnd";

import { moveExamToFolder } from "../../services/folderService";

const ItemTypes = {
  EXAM: "exam",
};

const FolderCard = ({ folder, updateRefresh}) => {
  const navigate = useNavigate();

  const [{ isOver }, drop] = useDrop(() => ({
    accept: ItemTypes.EXAM,
    drop: async (item) => {
      try {
        await moveExamToFolder(item.id, folder.subjectId); // Ensure move completes
        updateRefresh(); // Toggle refresh state
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
    <div
      ref={drop}
      className={`library-folder ${isOver ? "folder-highlight" : ""}`}
      onClick={handleClick}
    >
      <p className="folder-name">{folder.subjectName}</p>
      <p className="folder-exams-number">{folder.numExams || 0}</p>
    </div>
  );
};

export default FolderCard;
