// import React, { useState, useEffect, useRef } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import axios from "axios";

// import "./PracticeMode.css";
// import linkhost from "../..";
// import { getAuthToken } from "../../services/auth";

// const PracticeMode = () => {
//   const navigate = useNavigate();
//   const { user } = getAuthToken();
//   const [questions, setQuestions] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [submitedAnswer, setSubmitedAnswer] = useState(null);
//   const [checked, setChecked] = useState(false);
//   const [userAnswers, setUserAnswers] = useState([]);
//   const [startTime] = useState(Date.now());

//   const correctBeep = useRef(null);
//   const incorrectBeep = useRef(null);

//   const location = useLocation();
//   const options = location.state?.options || {};

//   useEffect(() => {
//     const savedQuestions = localStorage.getItem("generatedQuestions");
//     if (savedQuestions) {
//       try {
//         const parsedQuestions = JSON.parse(savedQuestions);
//         if (parsedQuestions.questionData?.length) {
//           setQuestions(parsedQuestions.questionData);
//         } else {
//           console.error("Invalid or empty questions array.");
//         }
//       } catch (err) {
//         console.error("Error parsing questions:", err);
//       }
//     }
//   }, []);

//   const playSound = (isCorrect) => {
//     const audio = isCorrect ? correctBeep.current : incorrectBeep.current;
//     if (!audio) return;
//     try {
//       audio.currentTime = 0;
//       const playPromise = audio.play();
//       if (playPromise !== undefined) {
//         playPromise.catch((err) => console.warn("Audio playback failed:", err));
//       }
//     } catch (err) {
//       console.error("Audio error:", err);
//     }
//   };

//   const handleAnswerClick = (answer) => setSelectedAnswer(answer);

//   const handleCheckAnswer = () => {
//     if (!selectedAnswer) return;

//     const currentQuestion = questions[currentQuestionIndex];
//     const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

//     playSound(isCorrect);

//      setUserAnswers((prev) => [
//       ...prev,
//       {
//         id: currentQuestion.questionNumber,
//         text: currentQuestion.question,
//         options: currentQuestion.options,
//         correctAnswer: currentQuestion.correctAnswer,
//         userAnswer: selectedAnswer,
//         isCorrect,
//         explain:
//           options.language === "Arabic"
//             ? currentQuestion.explanation_ar || "لا يوجد شرح متاح."
//             : currentQuestion.explanation || "No explanation provided.",
//       },
//     ]);


//     setChecked(true);
//     setSubmitedAnswer(selectedAnswer);
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestionIndex < questions.length - 1) {
//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
//       setSelectedAnswer(null);
//       setChecked(false);
//       setSubmitedAnswer(null);
//     } else {
//       handleSubmit();
//     }
//   };

//   const handleSubmit = async () => {
//     const endTime = Date.now();
//     const timeTaken = new Date(endTime - startTime).toISOString().substr(11, 8);
//     const numCorrect = userAnswers.filter((q) => q.isCorrect).length;
//     const totalScore = Math.round((numCorrect / questions.length) * 100);
//     const xpMap = { EASY: 1, MEDIUM: 2, HARD: 3 };
//     const xpCollected = numCorrect * xpMap[options.difficulty];

//     const payload = {
//       questionType: options.questionType,
//       examName: options.examName,
//       numQuestions: questions.length,
//       numCorrectQuestions: numCorrect,
//       difficultyLevel: options.difficulty,
//       mcqQuestionsData: userAnswers,
//       timeTaken,
//       totalScore,
//       xpCollected,
//       userId: user.nameid,
//       subjectId: options.subjectId || null,
//       examId: options.retry ? options.examId : null,
//     };

//     try {
//       const endpoint = linkhost + "/api/Exam";
//       await (options.retry ? axios.put(endpoint, payload) : axios.post(endpoint, payload));
//       navigate("/score", {
//   state: {
//     totalScore,
//     timeTaken,
//     xpCollected,
//     language: options.language, // ✅ Fix: add language to the navigation state
//   },
// });


//   const questionData = questions[currentQuestionIndex];
//   if (!questionData?.question) return <p className="loading">Loading question...</p>;

//   return (
//     <div className="quiz-card">
//       {/* Top bar */}
//       <div className="top-bar">
//         <img src="/images/logo1.png" alt="Quiz Icon" className="quiz-icon" />
//         <div className="progress-bar">
//           <div
//             className="progress-bar-fill"
//             style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
//           ></div>
//         </div>
//         <div className="progress-text">
//           {currentQuestionIndex + 1} / {questions.length}
//         </div>
//       </div>

//       {/* Question */}
//       <h2 className="question">{questionData.question}</h2>

//       {/* Answers */}
//       <div className="answers">
//         {questionData.options.map((option, index) => {
//   const translatedOption =
//     options.language === "Arabic" && (option === "True" || option === "False")
//       ? option === "True"
//         ? "صح"
//         : "خطأ"
//       : option;

//   return (
//            <button
//                 key={index}
//                 className={`answer-btn ${
//                   !submitedAnswer && selectedAnswer === option ? "selected" : ""
//                 } ${
//                   submitedAnswer
//                     ? option === questionData.correctAnswer
//                       ? "correct"
//                       : option === submitedAnswer
//                       ? "incorrect"
//                       : "disabled"
//                     : ""
//                 }`}
//                 onClick={() => handleAnswerClick(option)}
//               >
//                 <span className="answer-letter">{String.fromCharCode(65 + index)}</span>
//                 {translatedOption}
//              </button>
//             );
//           })}

//       </div>

//       {/* Check / Feedback */}
//       {!checked ? (
//         <button
//                     className="check-btn"
//                     onClick={handleCheckAnswer}
//                     disabled={!selectedAnswer}
//                   >
//                     {options.language === "Arabic" ? "تحقق" : "Check"}
//         </button>

//       ) : (
//         <div
//           className={`feedback ${
//             submitedAnswer === questionData.correctAnswer
//               ? "correct-feedback"
//               : "incorrect-feedback"
//           }`}
//         >
//           <div className="feedback-text">
//             <p
//                 className="feedback-title"
//                 style={{
//                   direction: options.language === "Arabic" ? "rtl" : "ltr",
//                   textAlign: options.language === "Arabic" ? "right" : "left",
//                 }}
//               >
//                 {submitedAnswer === questionData.correctAnswer
//                   ? options.language === "Arabic"
//                     ? "✅ إجابة صحيحة"
//                     : "✅ Correct"
//                   : options.language === "Arabic"
//                   ? "❌ إجابة خاطئة"
//                   : "❌ Incorrect"}
//             </p>

//            <p
//               style={{
//                 maxWidth: "1100px",
//                 width: "fit-content",
//                 direction: options.language === "Arabic" ? "rtl" : "ltr",
//                 textAlign: options.language === "Arabic" ? "right" : "left",
//               }}
//             >
//               {questionData.explanation || (options.language === "Arabic" ? "لا يوجد شرح متاح." : "No explanation provided.")}
//           </p>


//           </div>
//             <button className="continue-btn" onClick={handleNextQuestion}>
//               {currentQuestionIndex < questions.length - 1
//                 ? options.language === "Arabic"
//                   ? "متابعة"
//                   : "Continue"
//                 : options.language === "Arabic"
//                 ? "إنهاء"
//                 : "Finish"}
//             </button>

//         </div>
//       )}

//       {/* Sound Effects */}
//       <audio ref={correctBeep} preload="auto">
//         <source src="/assets/soundEffects/correct.mp3" type="audio/mpeg" />
//       </audio>
//       <audio ref={incorrectBeep} preload="auto">
//         <source src="/assets/soundEffects/incorrect.mp3" type="audio/mpeg" />
//       </audio>
//     </div>
//   );
// };

// export default PracticeMode;


import React, { useState, useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import "./PracticeMode.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";
import { useExamsStore } from "../../hooks/useExams";

const PracticeMode = () => {
  const navigate = useNavigate();
  const { user } = getAuthToken();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [submitedAnswer, setSubmitedAnswer] = useState(null);
  const [checked, setChecked] = useState(false);
  const [userAnswers, setUserAnswers] = useState([]);
  const [startTime] = useState(Date.now());
  const { refreshExams } = useExamsStore();

  const correctBeep = useRef(null);
  const incorrectBeep = useRef(null);

  const location = useLocation();
  const options = location.state?.options || {};

  useEffect(() => {
    const savedQuestions = localStorage.getItem("generatedQuestions");
    if (savedQuestions) {
      try {
        const parsedQuestions = JSON.parse(savedQuestions);
        if (parsedQuestions.questionData?.length) {
          setQuestions(parsedQuestions.questionData);
        } else {
          console.error("Invalid or empty questions array.");
        }
      } catch (err) {
        console.error("Error parsing questions:", err);
      }
    }
  }, []);

  const playSound = (isCorrect) => {
    const audio = isCorrect ? correctBeep.current : incorrectBeep.current;
    if (!audio) return;
    try {
      audio.currentTime = 0;
      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.catch((err) => console.warn("Audio playback failed:", err));
      }
    } catch (err) {
      console.error("Audio error:", err);
    }
  };

  const handleAnswerClick = (answer) => setSelectedAnswer(answer);

  const handleCheckAnswer = () => {
    if (!selectedAnswer) return;

    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = selectedAnswer === currentQuestion.correctAnswer;

    playSound(isCorrect);

    setUserAnswers((prev) => [
      ...prev,
      {
        id: currentQuestion.questionNumber,
        text: currentQuestion.question,
        options: currentQuestion.options,
        correctAnswer: currentQuestion.correctAnswer,
        userAnswer: selectedAnswer,
        isCorrect,
        explain:
          options.language === "Arabic"
            ? currentQuestion.explanation_ar || "لا يوجد شرح متاح."
            : currentQuestion.explanation || "No explanation provided.",
      },
    ]);

    setChecked(true);
    setSubmitedAnswer(selectedAnswer);
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
    const timeTaken = new Date(endTime - startTime).toISOString().substr(11, 8);
    const numCorrect = userAnswers.filter((q) => q.isCorrect).length;
    const totalScore = Math.round((numCorrect / questions.length) * 100);
    const xpMap = { EASY: 1, MEDIUM: 2, HARD: 3 };
    const xpCollected = numCorrect * xpMap[options.difficulty];

    const payload = {
      questionType: options.questionType,
      examName: options.examName,
      numQuestions: questions.length,
      numCorrectQuestions: numCorrect,
      difficultyLevel: options.difficulty,
      mcqQuestionsData: userAnswers,
      timeTaken,
      totalScore,
      xpCollected,
      userId: user.nameid,
      subjectId: options.subjectId || null,
      examId: options.retry ? options.examId : null,
    };

    try {
      const endpoint = linkhost + "/api/Exam";
      await (options.retry ? axios.put(endpoint, payload) : axios.post(endpoint, payload));
      refreshExams();
      navigate("/score", { state: { totalScore, timeTaken, xpCollected } });
      navigate("/score", {
        state: {
          totalScore,
          timeTaken,
          xpCollected,
          language: options.language,
        },
      });
    } catch (error) {
      console.error("Submission failed:", error);
    }
  };

  const questionData = questions[currentQuestionIndex];
  if (!questionData?.question) return <p className="loading">Loading question...</p>;

  return (
    <div className="quiz-card">
      {/* Top bar */}
      <div className="top-bar">
        <img src="/images/logo1.png" alt="Quiz Icon" className="quiz-icon" />
        <div className="progress-bar">
          <div
            className="progress-bar-fill"
            style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          {currentQuestionIndex + 1} / {questions.length}
        </div>
      </div>

      {/* Question */}
      <h2 className="question">{questionData.question}</h2>

      {/* Answers */}
      <div className="answers">
        {questionData.options.map((option, index) => {
          const translatedOption =
            options.language === "Arabic" && (option === "True" || option === "False")
              ? option === "True"
                ? "صح"
                : "خطأ"
              : option;

          return (
            <button
              key={index}
              className={`answer-btn ${
                !submitedAnswer && selectedAnswer === option ? "selected" : ""
              } ${
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
              {translatedOption}
            </button>
          );
        })}
      </div>

      {/* Check / Feedback */}
      {!checked ? (
        <button
          className="check-btn"
          onClick={handleCheckAnswer}
          disabled={!selectedAnswer}
        >
          {options.language === "Arabic" ? "تحقق" : "Check"}
        </button>
      ) : (
        <div
          className={`feedback ${
            submitedAnswer === questionData.correctAnswer
              ? "correct-feedback"
              : "incorrect-feedback"
          }`}
        >
          <div className="feedback-text">
            <p
              className="feedback-title"
              style={{
                direction: options.language === "Arabic" ? "rtl" : "ltr",
                textAlign: options.language === "Arabic" ? "right" : "left",
              }}
            >
              {submitedAnswer === questionData.correctAnswer
                ? options.language === "Arabic"
                  ? "✅ إجابة صحيحة"
                  : "✅ Correct"
                : options.language === "Arabic"
                ? "❌ إجابة خاطئة"
                : "❌ Incorrect"}
            </p>

            <p 
              style={{ 
                maxWidth: "1000px",
                width: "fit-content",
                direction: options.language === "Arabic" ? "rtl" : "ltr",
                textAlign: options.language === "Arabic" ? "right" : "left",
              }}
            >
              {questionData.explanation ||
                (options.language === "Arabic"
                  ? "لا يوجد شرح متاح."
                  : "No explanation provided.")}
            </p>
          </div>

          <button className="continue-btn" onClick={handleNextQuestion}>
            {currentQuestionIndex < questions.length - 1
              ? options.language === "Arabic"
                ? "متابعة"
                : "Continue"
              : options.language === "Arabic"
              ? "إنهاء"
              : "Finish"}
          </button>
        </div>
      )}

      {/* Sound Effects */}
      <audio ref={correctBeep} preload="auto">
        <source src="/assets/soundEffects/correct.mp3" type="audio/mpeg" />
      </audio>
      <audio ref={incorrectBeep} preload="auto">
        <source src="/assets/soundEffects/incorrect.mp3" type="audio/mpeg" />
      </audio>
    </div>
  );
};

export default PracticeMode;


