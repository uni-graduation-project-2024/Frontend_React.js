import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./PracticeMode.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";
import correctSound from "../../assets/soundEffects/correct.mp3";

const PracticeMode = () => {
  const navigate = useNavigate();
  const { user } = getAuthToken();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [ submitedAnswer, setSubmitedAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime, setStartTime] = useState(Date.now());

  const correctBeep = useRef(null);
  const incorrectBeep = useRef(null);

  // Initialize audio object once on mount
  useEffect(() => {
    correctBeep.current = new Audio("/assets/soundEffects/correct.mp3");
    correctBeep.current.preload = "auto";

    incorrectBeep.current = new Audio("/assets/soundEffects/incorrect.mp3");
    incorrectBeep.current.preload = "auto";
  }, []);

  const playSound = (isCorrect) => {
    if(isCorrect){
      correctBeep.current.currentTime = 0; // Reset sound if already playing
      correctBeep.current.play();
    }
    else{
      incorrectBeep.current.currentTime = 0; // Reset sound if already playing
      incorrectBeep.current.play();
    }
  };

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
    setSelectedAnswer(answer);
  };

  const handleCheckAnswer = () => {
    if (selectedAnswer) {
      const isCorrect = selectedAnswer === questionData.correctAnswer;
      playSound(isCorrect);
      setUserAnswers((prevAnswers) => [
        ...prevAnswers,
        {
          id: questionData.questionNumber,
          text: questionData.question,
          options: questionData.options,
          correctAnswer: questionData.correctAnswer,
          userAnswer: selectedAnswer,
          isCorrect: isCorrect,
          explain: questionData.explanation || "No explanation provided."
        }
      ]);
      setChecked(true);
      setSubmitedAnswer(selectedAnswer);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setSelectedAnswer(null);
      setChecked(false);
      setSubmitedAnswer(null);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = async () => {
    const endTime = Date.now();
    const timeTakenMilliseconds = endTime - startTime;
    const formattedTimeTaken = new Date(timeTakenMilliseconds).toISOString().substr(11, 8);
    const numQuestions = questions.length;
    const numCorrectQuestions = userAnswers.filter(q => q.isCorrect).length;
    const totalScore = Math.round((numCorrectQuestions / numQuestions) * 100);
    const xpValue = { EASY: 1, MEDIUM: 2, HARD: 3 };
    const xpCollected = numCorrectQuestions * xpValue[options.difficulty];

    const payload = {
      questionType: options.questionType,
      examName: options.examName,
      numQuestions,
      numCorrectQuestions,
      difficultyLevel: options.difficulty,
      mcqQuestionsData: userAnswers,
      timeTaken: formattedTimeTaken,
      totalScore,
      xpCollected,
      userId: user.nameid,
      subjectId: options.subjectId || null,
      examId: options.retry ? options.examId : null
    };

    try {
      if (options.retry) {
        await axios.put(linkhost + "/api/Exam", payload);
      } else {
        await axios.post(linkhost + "/api/Exam", payload);
      }
      navigate("/score", { state: { totalScore, timeTaken: formattedTimeTaken, xpCollected } });
    } catch (error) {
      console.error("Failed to submit data:", error);
    }
  };

  return (
    <div className="quiz-container">
      <div className="quiz-card">
      <div className="progress-bar">
          <div 
            className="progress-bar-fill" 
            style={{ width: `${((currentQuestionIndex) / questions.length) * 100}%` }}
          ></div>
          <div className="progress-text">
            {currentQuestionIndex} of {questions.length}
          </div>
        </div>
        <h2 className="question">{questionData.question}</h2>
        <div className="answers">
  {questionData.options.map((option, index) => (
    <button
      key={index}
      className={`answer-btn ${(!submitedAnswer && selectedAnswer === option) ? "selected" : ""} ${
        submitedAnswer
          ? option === questionData.correctAnswer
            ? "correct"
            : option === submitedAnswer
            ? "incorrect"
            : "disabled"
          : ""
      }`}
      onClick={() => handleAnswerClick(option)}
    >
      <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
      {option}
    </button>
  ))}
</div>



        { !checked && (<button
          className="check-btn"
          onClick={handleCheckAnswer}
          disabled={!selectedAnswer || checked}
        >
          Check
        </button>)}

        {checked && (
          <>
          <div className={`feedback ${submitedAnswer === questionData.correctAnswer ? "correct-feedback" : "incorrect-feedback"}`}>
            <p>{submitedAnswer === questionData.correctAnswer ? "✅ Correct" : "❌ Incorrect"}</p>
            <p>{questionData.explanation || "No explanation provided."}</p>

            <button className="continue-btn" onClick={handleNextQuestion}>
            {currentQuestionIndex < questions.length - 1 ? "Continue" : "Finish"}
            </button>
          </div>

          
          </>
        )}
      </div>
    </div>
  );
};

export default PracticeMode;

