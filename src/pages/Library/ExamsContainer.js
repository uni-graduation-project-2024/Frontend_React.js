import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import "./ExamCard.css";
import linkhost from "../..";
import { useExams } from "../../hooks/useExams";
import { ExamCard } from "./ExamCard";

const ExamsContainer = ({ subjectId, openDropdown, updateDropdown, refresh}) => {
  const { exams } = useExams(subjectId, refresh);
  const [fetchedExams, setFetchedExams] = useState(exams);
  const [openMenu, setOpenMenu] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setFetchedExams(exams);
  }, [exams]);

  useEffect(() => {
    setOpenMenu(null);
  }, [openDropdown]);

  const toggleMenu = (examId, e) => {
    e.stopPropagation();
    updateDropdown(true);
    setOpenMenu(openMenu === examId ? null : examId);
  };

  const handleDelete = async (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await axios.delete(`${linkhost}/api/Exam/${examId}`);
        setFetchedExams(exams.filter((exam) => exam.examId !== examId));
      } catch (error) {
        console.error("Error deleting exam:", error);
      }
    }
  };

  const handleRetry = async (exam) => {
    try {
      const response = await axios.get(`${linkhost}/api/Exam/${exam.examId}`);
      const fetchedExam = response.data;

      if (fetchedExam && fetchedExam.mcqQuestionsData) {
        localStorage.setItem(
          "generatedQuestions",
          JSON.stringify({
            questionData: fetchedExam.mcqQuestionsData.map((q) => ({
              questionNumber: q.id,
              question: q.text,
              options: q.options,
              correctAnswer: q.correctAnswer,
              explanation: q.explain,
            })),
          })
        );

        navigate("/PracticeMode", {
          state: {
            options: {
              difficulty: fetchedExam.difficultyLevel,
              questionType: fetchedExam.questionType,
              examName: fetchedExam.examName,
              examId: fetchedExam.examId,
              subjectId: fetchedExam.subjectId,
              retry: true,
            },
          },
        });
      } else {
        console.error("No questions found in the fetched exam.");
      }
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };
  

  const handleReviewMode = (examId) => {
    navigate("/Review-Mode", { state: { examId } });
  };

  const handleMoveToFolder = (examId, subId) => {
    navigate("/move-exam", {
      state: { examId, subId },
    });
  };

  return (
    <DndProvider backend={HTML5Backend}>
    <div className="library-exam-grid">
      {fetchedExams.length === 0 ? (
        <p>No exams available for this subject.</p>
      ) : (
        fetchedExams.map((exam) => (
          <ExamCard
            key={exam.examId}
            exam={exam}
            handleReviewMode={handleReviewMode}
            handleRetry={handleRetry}
            handleDelete={handleDelete}
            handleMoveToFolder={handleMoveToFolder}
            openMenu={openMenu}
            toggleMenu={toggleMenu}
            openDropdown={openDropdown}
          />
        ))
      )}
    </div>
    </DndProvider>
  );
};

export default ExamsContainer;
