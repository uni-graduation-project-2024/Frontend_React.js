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
          <h3>{exam.title}</h3>
        </div>
        <div className="exam-content">
          <p className="exam-title">{exam.examName}</p>
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