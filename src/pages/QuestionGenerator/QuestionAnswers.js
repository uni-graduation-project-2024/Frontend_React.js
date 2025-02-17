import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import "./QuestionAnswers.css";
import linkhost from "../..";

const QuestionAnswers = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  const location = useLocation();
  const options = location.state?.options || {};

  useEffect(() => {
    const savedQuestions = localStorage.getItem("generatedQuestions");
    if (savedQuestions) {
      try {
        let parsedQuestions = JSON.parse(savedQuestions);
        if (parsedQuestions.questionData && Array.isArray(parsedQuestions.questionData)) {
          setQuestions(parsedQuestions.questionData);
        } else {
          console.error("Invalid or empty questions array in local storage.");
        }
      } catch (error) {
        console.error("Failed to parse questions:", error);
      }
    }
  }, []);

  if (!questions.length) {
    return <p className="loading">No valid questions available.</p>;
  }

  const questionData = questions[currentQuestionIndex];

  if (!questionData || !questionData.question) {
    return <p className="loading">Invalid question format.</p>;
  }

  const handleAnswerClick = (answer) => {
    const isCorrect = answer === questionData.correctAnswer;
    setSelectedAnswer(answer);
    setUserAnswers((prevAnswers) => [
      ...prevAnswers,
      {
        id: questionData.questionNumber,
        text: questionData.question,
        options: questionData.options,
        correctAnswer: questionData.correctAnswer,
        userAnswer: answer,
        isCorrect: isCorrect,
        explain: questionData.explanation || "No explanation provided."
      }
    ]);
  };

  const handleSubmit = async () => {
    const endTime = Date.now();
    const timeTakenMilliseconds = endTime - startTime;
    const timeTakenDate = new Date(timeTakenMilliseconds);
    const formattedTimeTaken = timeTakenDate.toISOString().substr(11, 8); // Converts to HH:mm:ss
    const numQuestions = questions.length;
    const numCorrectQuestions = userAnswers.filter(q => q.isCorrect).length;
    const numWrongQuestions = numQuestions - numCorrectQuestions;
    const totalScore = Math.round((numCorrectQuestions / numQuestions) * 100); // Example scoring logic
    const xpValue = {
      EASY: 1,
      MEDIUM: 2,
      HARD: 3
    };
    const xpCollected = numCorrectQuestions * xpValue[options.difficulty]; // Example XP logic
    console.log(xpCollected);

    const payload = {
      questionType: options.questionType, // Assuming all questions are MCQs
      numQuestions,
      numCorrectQuestions,
      numWrongQuestions,
      difficultyLevel: options.difficulty, // Can be dynamic based on user input
      mcqQuestionsData: userAnswers,
      tfQuestionsData: [], // Assuming no True/False questions for now
      timeTaken: formattedTimeTaken,
      totalScore,
      xpCollected,
      userId: 5, // Replace with actual user ID
      subjectId: 3 // Replace with actual subject ID
    };

    try {
      await axios.post(linkhost + "/api/Exam", payload);
      navigate("/");
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
    } else {
      handleSubmit();
    }
  };

  const handleRestartQuestion = () =>{
    setCurrentQuestionIndex(0);
    setSelectedAnswer(null);
    setUserAnswers([]); // Reset answers
    setStartTime(Date.now());
  }

  return (
    <div className="quiz-container">
      <div className="quiz-card">
        <h2 className="question">{questionData.questionNumber}. {questionData.question}</h2>

        <div className="answers">
          {questionData.options.map((option, index) => (
            <button
              key={index}
              className={`answer-btn ${
                selectedAnswer
                  ? option === questionData.correctAnswer
                    ? "correct"
                    : option === selectedAnswer
                    ? "incorrect"
                    : "disabled"
                  : ""
              }`}
              onClick={() => handleAnswerClick(option)}
              disabled={selectedAnswer !== null}
            >
              {option}
            </button>
          ))}
        </div>

        {selectedAnswer && (
          <div className={`feedback ${selectedAnswer === questionData.correctAnswer ? "correct-feedback" : "incorrect-feedback"}`}>
            <p>{selectedAnswer === questionData.correctAnswer ? "✅ Correct" : "❌ Incorrect"}</p>
            <p className="explanation">Explanation: {questionData.explanation || "No explanation provided."}</p>
          </div>
        )}

        <button className="continue-btn" onClick={handleNextQuestion}>
          {currentQuestionIndex < questions.length - 1 ? "Continue" : "Finish"}
        </button>
        {currentQuestionIndex === questions.length - 1 &&
        <button className="continue-btn" onClick={handleRestartQuestion}>
          Restart
        </button>
        }
      </div>
    </div>
  );
};

export default QuestionAnswers;