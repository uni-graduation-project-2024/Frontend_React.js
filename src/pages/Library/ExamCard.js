// 🏗 **Draggable ExamCard Component**
import { useDrag } from "react-dnd";
import { Trash2, MoreVertical } from "lucide-react";
import { LuFolderSymlink } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";

import { TimeAgo } from "../../utils/timeAgo";
import MoveExam from "./MoveToFolder";

const ItemTypes = {
    EXAM: "exam",
  };

export const ExamCard = ({
    exam,
    handleRetry,
    handleDelete,
    openMenu,
    toggleMenu,
    openDropdown,
  }) => {
    const navigate = useNavigate();
    const { openModal } = useOutletContext();
    const [{ isDragging }, drag] = useDrag(() => ({
      type: ItemTypes.EXAM,
      item: { id: exam.examId },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }));

  const handleMoveToFolder = (examId, subId) => {
    openModal(<MoveExam examId={examId} subId={subId} onClose={() => openModal(null)}/>);
  };

  function getScoreClass(score) {
    if (score === 100) return "exam-score score-100";
    if (score >= 90) return "exam-score score-above-90";
    if (score >= 80) return "exam-score score-above-80";
    if (score >= 50) return "exam-score score-above-50";
    return "exam-score score-below-50";
  }
  
    return (
      <div
        ref={drag}
        className="library-exam"
        onClick={() => navigate("/Review-Mode", { state: { examId : exam.examId } })}
        style={{ opacity: isDragging ? 0.7 : 1, cursor: "grab" }}
      >
        <div className="exam-info">
          <p className="exam-time">
          {<TimeAgo dateString={exam.createdDate}/>} • {exam.numQuestions} questions
          </p>
          <p className="exam-title" >{exam.examName}</p>
          <div className="exam-details-container">
            <div className="exam-type"><p>{exam.questionType}</p></div>
            <div className={ exam.difficultyLevel == "EASY" ? "exam-difficulty-level easy" : exam.difficultyLevel == "MEDIUM" ? "exam-difficulty-level medium" : "exam-difficulty-level hard" }
            ><p>{exam.difficultyLevel}</p></div>
            <div className={getScoreClass(exam.totalScore)}><p>Score : {exam.totalScore}</p></div>
          </div>
        </div>
        <div className="exam-content">
          <div className="exam-actions">
            <button onClick={() => handleRetry(exam)} className="retry-button">
              Practice Again
            </button>
  
            <div className="exam-dropdown">
              <MoreVertical className="exam-menu-icon" onClick={(e) => toggleMenu(exam.examId, e)} />
  
              {openMenu === exam.examId && openDropdown && (
                <div className={`exam-dropdown-menu ${openDropdown ? "open" : "closed"}`} onClick={(e) => e.stopPropagation()}>
                  <button className="move-exam-to-folder-btn" onClick={() => handleMoveToFolder(exam.examId, exam.subjectId)}>
                    <LuFolderSymlink className="exam-move-icon" /> Move to Folder
                  </button>
                  <button className="exam-delete-btn" onClick={() => handleDelete(exam.examId)}>
                    <Trash2 className="exam-delete-icon" /> Delete
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };