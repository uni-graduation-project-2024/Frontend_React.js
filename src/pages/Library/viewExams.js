import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom"; 
import axios from "axios";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";
import "./viewExams.css";

const ViewExams = () => {
  const { subjectId } = useParams();
  const [exams, setExams] = useState([]);
  const { user } = getAuthToken();
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(
          `${linkhost}/api/exams?userId=${user.nameid}&subjectId=${subjectId}`
        );
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, [subjectId, user.nameid]);

  const handleDelete = async (examId) => {
    try {
      await axios.delete(`${linkhost}/api/exams/${examId}`);
      setExams(exams.filter((exam) => exam.id !== examId));
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const handleRetry = (exam) => {
    localStorage.setItem(
      "generatedQuestions",
      JSON.stringify({ questionData: exam.questions })
    );
    navigate("/generate-questions", {
      state: { options: { difficulty: exam.difficulty } },
    });
  };

  const timeAgo = (dateString) => {
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
    <div className="library-container">
      <h1 className="library-title">Exams for Subject</h1>
      <div className="library-exam-grid">
        {exams.length === 0 ? (
          <p>No exams available for this subject.</p>
        ) : (
          exams.map((exam) => (
            <div key={exam.id} className="library-exam">
              <div className="exam-info">
                <p className="exam-time">
                  {timeAgo(exam.createdAt)} • {exam.plays || 0} plays •{" "}
                  {exam.questionCount} questions
                </p>
                {exam.folder && <p className="exam-folder">📂 {exam.folder}</p>}
                <h3>{exam.title}</h3>
              </div>
              <div className="exam-actions">
                <button
                  onClick={() => handleDelete(exam.id)}
                  className="delete-button"
                >
                  Delete
                </button>
                <button
                  onClick={() => handleRetry(exam)}
                  className="retry-button"
                >
                  Practice Again
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewExams;
