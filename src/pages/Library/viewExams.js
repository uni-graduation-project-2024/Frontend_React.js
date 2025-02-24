import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; 
import axios from "axios";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";
import { Trash2 } from "lucide-react";
import "./viewExams.css";

const ViewExams = ( {subjectId}) => {
  const [exams, setExams] = useState([]);
  const { user } = getAuthToken();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchExams = async () => {
      try {
        let url = `${linkhost}/api/Exam/all/${user.nameid}`;

        // Append subId if not "all"
        if (subjectId && subjectId !== 0) {
          url += `?subId=${subjectId}`;
        }

        const response = await axios.get(url);
        setExams(response.data);     
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, [subjectId, user.nameid]);

  const handleDelete = async (examId) => {
    if (window.confirm("Are you sure you want to delete this exam?")) {
      try {
        await axios.delete(`${linkhost}/api/Exam/${examId}`);
        setExams(exams.filter((exam) => exam.examId !== examId));
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
        // ✅ Prepare question data for localStorage
      const questionData = fetchedExam.mcqQuestionsData.map((q) => ({
        questionNumber: q.id,
        question: q.text,
        options: q.options,
        correctAnswer: q.correctAnswer,
        explanation: q.explain,
      }));

      // ✅ Store in localStorage
      localStorage.setItem(
        "generatedQuestions",
        JSON.stringify({
          examName: fetchedExam.examName,
          difficulty: fetchedExam.difficultyLevel,
          questionType: fetchedExam.questionType,
          questionData: questionData,
        })
      );
      
      navigate("/Question-Answers", { 
        state: {  
            options: { 
                difficulty: fetchedExam.difficultyLevel, 
                questionType: fetchedExam.questionType,
                examName : fetchedExam.examName
            } 
        } 
      });

      } else {
        console.error("No questions found in the fetched exam.");
      }
    } catch (error) {
      console.error("Error fetching exam data:", error);
    }
  };
  

  const timeAgo = (dateString) => {
    if (!dateString) return "Invalid date is undef";
    const date = new Date(dateString);
    if (isNaN(date)) return "Invalid date";

    const now = new Date();
    const diffInSeconds = Math.floor((now - date) / 1000);
    const intervals = {
      year: 31536000,
      month: 2592000,
      day: 86400,
      hour: 3600,
      minute: 60,
      second: 1,
    };

    for (let unit in intervals) {
      const interval = Math.floor(diffInSeconds / intervals[unit]);
      if (interval >= 1) {
        return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(
          -interval,
          unit
        );
      }
    }

    return "Just now";
  };

  return (
    <div className="library-container2">
      <div className="library-exam-grid">
        {exams.length === 0 ? (
          <p>No exams available for this subject.</p>
        ) : (
          exams.map((exam) => (
            <div key={exam.examId} className="library-exam">
              <div className="exam-info">
                <p className="exam-time">
                  {timeAgo(exam.createdDate)} • {exam.numQuestions} questions
                </p>
                {exam.folder && <p className="exam-folder">📂 {exam.folder}</p>}
                <h3>{exam.title}</h3>
              </div>
              <div className="exam-content">
                <p  className="exam-title">{exam.examName}</p>
                <div className="exam-actions">
                  <button onClick={() => handleRetry(exam)} className="retry-button">Practice Again</button>
                  <Trash2 className="delete-icon" onClick={() => handleDelete(exam.examId)} />
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewExams;
