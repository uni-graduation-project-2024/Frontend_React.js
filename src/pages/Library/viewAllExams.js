import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";
import "./viewAllExams.css";


const ViewAllExams = () => {
  const navigate = useNavigate();
  const [exams, setExams] = useState([]);
  const { user } = getAuthToken();

  useEffect(() => {
    const fetchExams = async () => {
      try {
        const response = await axios.get(`${linkhost}/api/exams?userId=${user.nameid}`);
        setExams(response.data);
      } catch (error) {
        console.error("Error fetching exams:", error);
      }
    };

    fetchExams();
  }, []);

  const handleDeleteExam = async (examId) => {
    try {
      await axios.delete(`${linkhost}/api/exams/${examId}`);
      setExams(exams.filter((exam) => exam.id !== examId));
    } catch (error) {
      console.error("Error deleting exam:", error);
    }
  };

  const handleRetry = (exam) => {
    localStorage.setItem("generatedQuestions", JSON.stringify({ questionData: exam.questions }));
    navigate("/generate-questions", { state: { options: { difficulty: exam.difficulty } } });
  };

  // ✅ Improved timeAgo function using Intl.RelativeTimeFormat
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
        return new Intl.RelativeTimeFormat("en", { numeric: "auto" }).format(-interval, unit);
      }
    }

    return "Just now";
  };

  return (
    <div className="library-container">
      <h1 className="library-title">All Exams</h1>
      <div className="library-exam-grid">
        {exams.length === 0 ? (
          <p>No exams available.</p>
        ) : (
          exams.map((exam) => (
            <div key={exam.id} className="library-exam">
              <p>{exam.title}</p>
              <p className="exam-date">{timeAgo(exam.createdAt)}</p>
              <button onClick={() => handleDeleteExam(exam.id)} className="delete-btn">
                Delete
              </button>
              <button onClick={() => handleRetry(exam)} className="retry-btn">
                Practice Again
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ViewAllExams;
