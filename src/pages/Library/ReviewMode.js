import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { ArrowLeft } from "lucide-react";

import linkhost from "../..";
import "./ReviewMode.css";

const ReviewMode = () => {
  const location = useLocation();
  const { examId } = location.state || {};
  const [questions, setQuestions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(`${linkhost}/api/Exam/${examId}`);
        if (response.data && response.data.mcqQuestionsData) {
          setQuestions(response.data.mcqQuestionsData);
        }
      } catch (error) {
        console.error("Error fetching questions:", error);
      }
    };

    if (examId) fetchQuestions();
  }, [examId]);

  const handleBackClick = () => {
  navigate("/library");
  };

  return (
    <div className="review-mode-page questions-container">
      <ArrowLeft className="back-icon" onClick={handleBackClick} />
      <h2 className="review-header" >Exam Questions</h2>
      {questions.length === 0 ? (
        <p>No questions available.</p>
      ) : (
        questions.map((q, index) => (
          <div key={q.id} className="question-box">
            <h3 className="review-question">
              {index + 1}. {q.text}
            </h3>
            <div className="options-container">
              {q.options.map((option, i) => (
                <p
                  key={i}
                  className={`option ${
                    option === q.userAnswer
                      ? option === q.correctAnswer
                        ? "correct"
                        : "wrong"
                      : ""
                  }`}
                >
                  {option} {option === q.correctAnswer && " ✅ "}
                </p>
              ))}
            </div>
            {/* <div className="explain-btn">Explain</div> */}
            <p className="explanation">Explanation: {q.explain}</p>
            
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewMode;
