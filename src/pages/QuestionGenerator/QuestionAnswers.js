import React, { useState, useEffect } from "react";
import axios from "axios";
import "./QuestionAnswers.css";

const QuestionAnswers = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await axios.post(
          "http://localhost:8000/QuestionAnswers",
          {}, 
          {
            headers: { "Content-Type": "application/json" },
          }
        );
        setQuestions(response.data); 
        setLoading(false);
      } catch (err) {
        console.error("Error fetching questions:", err);
        setError("Failed to load questions. Please try again.");
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  if (loading) {
    return <p className="loading">Loading questions...</p>;
  }

  if (error) {
    return <p className="error">{error}</p>;
  }

  const questionData = questions[currentQuestionIndex];

  if (!questionData) {
    return <p className="loading">No questions available.</p>;
  }

  const { question, options, correctAnswer, explanation } = questionData;

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    setIsCorrect(answer === correctAnswer);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedAnswer(null);
      setIsCorrect(null);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <div className="progress-bar">
          <div
            className="progress"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>

        <h2 className="question">{question}</h2>

        <div className="answers">
          {options.map((option, index) => (
            <button
              key={index}
              className={`answer-btn ${
                selectedAnswer === option ? (isCorrect ? "correct" : "incorrect") : ""
              }`}
              onClick={() => handleAnswerClick(option)}
            >
              {option} {selectedAnswer === option && (isCorrect ? "✅" : "❌")}
            </button>
          ))}
        </div>

        {selectedAnswer && (
          <div className={`result ${isCorrect ? "success" : "error"}`}>
            {isCorrect ? "✅ Correct" : "❌ Incorrect"}
            <p className="explanation">{explanation}</p>
          </div>
        )}

        <button className="continue-btn" onClick={handleNextQuestion}>
          {currentQuestionIndex < questions.length - 1 ? "Next" : "Finish"}
        </button>
      </div>
    </div>
  );
};

export default QuestionAnswers;
