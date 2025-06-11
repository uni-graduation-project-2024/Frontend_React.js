// // import React, {useEffect, useRef} from "react";
// // import { useLocation, useNavigate } from "react-router-dom";
// // import "./scorePage.css";
// // import ManCelebration from "../../assets/svg/ManCelebration";

// // const ScorePage = () => {
// //   const location = useLocation();
// //   const navigate = useNavigate();
// //   const { totalScore, timeTaken, xpCollected } = location.state || {};
// //   const celebrationSound = useRef(null);

// //   useEffect(()=>{
// //     if(totalScore >= 90){
// //       celebrationSound.current = new Audio("/assets/soundEffects/best-celebration.mp3");
// //       celebrationSound.current.preload = "auto";
// //     }
// //     else{
// //       celebrationSound.current = new Audio("/assets/soundEffects/celebration.mp3");
// //       celebrationSound.current.preload = "auto";
// //     }
    

// //     celebrationSound.current.currentTime = 0; // Reset sound if already playing
// //     celebrationSound.current.play();
// //   }, [totalScore])

// //   const homeHandle = () =>{
// //     navigate("/library");
// //   }

// //   return (
// //     <div className="score-container">
// //     <div className="score-card">
// //     <div className="celebration-img">
// //   {
// //     totalScore >= 90 ? (
// //       // <img src="/images/good degree.png" alt="Superstar" /> 
// //       <ManCelebration showDecoration={true} heightDimmension={250} scaleValue={1.2}/>
// //     ) : totalScore >= 70 ? (
// //       <img src="/images/p.png" alt="Challenge" /> 
// //     ) : totalScore >= 50 ? (
// //       <img src="/images/good degree2.png" alt="Encourage" /> 
// //     ) : totalScore >= 20 ? (
// //       <img src="/images/bad degree2.png" alt="Try Again" /> 
// //     ) : (
// //       <img src="/images/bad degree.png" alt="Very Bad" /> 
// //     )
// //   }
// // </div>

// //       <h2 className="quiz-completed">Quiz Completed</h2>
  
// //       <div className="score-details">
// //         <div className="score-box time">
// //           <p className="label">TIME</p>
// //           <div className="in-box">
// //             <span className="icon">⏰</span>
// //             <p className="value">{timeTaken}</p>
// //           </div>
// //         </div>
  
// //         <div className="score-box score">
// //           <p className="label">SCORE</p>
// //           <div className="in-box">
// //             <span className="icon">🏆</span>
// //             <p className="value">{totalScore}%</p>
// //           </div>
// //         </div>
  
// //         <div className="score-box xp">
// //           <p className="label">XP</p>
// //           <div className="in-box">
// //             <span className="icon">⚡</span>
// //             <p className="value">{xpCollected}</p>
// //           </div>
// //         </div>
// //       </div>
  
// //       <div className="score-feedback">
// //         {
// //           typeof totalScore === "number" ? (
// //             totalScore >= 90 ? "🌟 ممتاز! مذاكرتك ممتازة جدًا" :
// //             totalScore >= 70 ? "👍 أداء جيد! استمر في المذاكرة" :
// //             totalScore >= 50 ? "🙂 مش بطال، بس محتاج تراجع الشابتر" :
// //             "📚 درجتك ضعيفة، راجع الشابتر كويس وحاول تاني"
// //           ) : "لم يتم تحديد الدرجة بعد."
// //         }
// //       </div>
  
// //       <button className="home-button" onClick={homeHandle}>
// //         Done
// //       </button>
// //     </div>
// //   </div>
  
// //   );
// // };

// // export default ScorePage;


// import React, { useEffect, useRef } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import "./scorePage.css";
// import ManCelebration from "../../assets/svg/ManCelebration";

// const ScorePage = () => {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const { totalScore, timeTaken, xpCollected } = location.state || {};
//   const celebrationSound = useRef(null);

//   useEffect(() => {
//     // Use correct audio file based on score
//     const soundSrc =
//       totalScore >= 90
//         ? "/assets/soundEffects/best-celebration.mp3"
//         : "/assets/soundEffects/celebration.mp3";

//     // Assign audio element to ref
//     celebrationSound.current = new Audio(soundSrc);
//     celebrationSound.current.preload = "auto";

//     // Try playing with promise to handle autoplay rules
//     const playSound = async () => {
//       try {
//         celebrationSound.current.currentTime = 0;
//         await celebrationSound.current.play();
//       } catch (err) {
//         console.warn("Sound could not play automatically:", err);
//       }
//     };

//     playSound();
//   }, [totalScore]);

//   const homeHandle = () => {
//     navigate("/library");
//   };

//   return (
//     <div className="score-container">
//       <div className="score-card">
//         <div className="celebration-img">
//           {totalScore >= 90 ? (
//             <ManCelebration showDecoration={true} heightDimmension={250} scaleValue={1.2} />
//           ) : totalScore >= 70 ? (
//             <img src="/images/p.png" alt="Challenge" />
//           ) : totalScore >= 50 ? (
//             <img src="/images/good degree2.png" alt="Encourage" />
//           ) : totalScore >= 20 ? (
//             <img src="/images/bad degree2.png" alt="Try Again" />
//           ) : (
//             <img src="/images/bad degree.png" alt="Very Bad" />
//           )}
//         </div>

//         <h2 className="quiz-completed">Quiz Completed</h2>

//         <div className="score-details">
//           <div className="score-box time">
//             <p className="label">TIME</p>
//             <div className="in-box">
//               <span className="icon">⏰</span>
//               <p className="value">{timeTaken}</p>
//             </div>
//           </div>

//           <div className="score-box score">
//             <p className="label">SCORE</p>
//             <div className="in-box">
//               <span className="icon">🏆</span>
//               <p className="value">{totalScore}%</p>
//             </div>
//           </div>

//           <div className="score-box xp">
//             <p className="label">XP</p>
//             <div className="in-box">
//               <span className="icon">⚡</span>
//               <p className="value">{xpCollected}</p>
//             </div>
//           </div>
//         </div>

//         <div className="score-feedback">
//           {typeof totalScore === "number" ? (
//             totalScore >= 90
//               ? "🌟 ممتاز! مذاكرتك ممتازة جدًا"
//               : totalScore >= 70
//               ? "👍 أداء جيد! استمر في المذاكرة"
//               : totalScore >= 50
//               ? "🙂 مش بطال، بس محتاج تراجع الشابتر"
//               : "📚 درجتك ضعيفة، راجع الشابتر كويس وحاول تاني"
//           ) : (
//             "لم يتم تحديد الدرجة بعد."
//           )}
//         </div>

//         <button className="home-button" onClick={homeHandle}>
//           Done
//         </button>
//       </div>
//     </div>
//   );
// };

// export default ScorePage;

import React, { useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./scorePage.css";
import ManCelebration from "../../assets/svg/ManCelebration";

const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    totalScore = 0,
    timeTaken = 0,
    xpCollected = 0,
    language = "English",
  } = location.state || {};

  const audioRef = useRef(null);

  useEffect(() => {
    let soundSrc = "";
    if (totalScore >= 90) {
      soundSrc = "/assets/soundEffects/best-celebration.mp3";
    } else if (totalScore >= 50) {
      soundSrc = "/assets/soundEffects/celebration.mp3";
    } else {
      soundSrc = "/assets/soundEffects/fail-cartoon.mp3";
    }

    audioRef.current = new Audio(soundSrc);
    audioRef.current.play().catch((error) => console.log("Audio error:", error));
  }, [totalScore]);

  const handleDone = () => {
    navigate("/library", { state: { language } }); // ✅ Pass language to Library page if needed
  };

  const getFeedbackMessage = () => {
    if (language === "Arabic") {
      if (totalScore >= 90) return "🌟 ممتاز! مذاكرتك ممتازة جدًا";
      if (totalScore >= 70) return "👍 أداء جيد! استمر في المذاكرة";
      if (totalScore >= 50) return "🙂 مش بطال، بس محتاج تراجع الشابتر";
      return "📚 درجتك ضعيفة، راجع الشابتر كويس وحاول تاني";
    } else {
      if (totalScore >= 90) return "🌟 Excellent! You studied very well.";
      if (totalScore >= 70) return "👍 Good job! Keep studying.";
      if (totalScore >= 50) return "🙂 Not bad, but review the chapter.";
      return "📚 Low score. Review the chapter and try again.";
    }
  };

  const getImage = () => {
    if (totalScore >= 90) {
      return <ManCelebration showDecoration={true} heightDimmension={250} scaleValue={1.2} />;
    } else if (totalScore >= 70) {
      return <img src="/images/p.png" alt="Challenge" />;
    } else if (totalScore >= 50) {
      return <img src="/images/good degree2.png" alt="Encourage" />;
    } else if (totalScore >= 20) {
      return <img src="/images/bad degree2.png" alt="Try Again" />;
    } else {
      return <img src="/images/bad degree.png" alt="Very Bad" />;
    }
  };

  return (
    <div
      className="score-container"
      style={{
        direction: language === "Arabic" ? "rtl" : "ltr",
        textAlign: language === "Arabic" ? "right" : "left",
      }}
    >
      <div className="score-card">
        <div className="celebration-img">{getImage()}</div>

        <h2 className="quiz-completed">
          {language === "Arabic" ? "تم إكمال الاختبار" : "Quiz Completed"}
        </h2>

        <div className="score-details">
          <div className="score-box time">
            <p className="label">{language === "Arabic" ? "الوقت" : "TIME"}</p>
            <div className="in-box">
              <span className="icon">⏰</span>
              <p className="value">{timeTaken}</p>
            </div>
          </div>

          <div className="score-box score">
            <p className="label">{language === "Arabic" ? "النتيجة" : "SCORE"}</p>
            <div className="in-box">
              <span className="icon">🏆</span>
              <p className="value">{totalScore}%</p>
            </div>
          </div>

          <div className="score-box xp">
            <p className="label">{language === "Arabic" ? "نقاط الخبرة" : "XP"}</p>
            <div className="in-box">
              <span className="icon">⚡</span>
              <p className="value">{xpCollected}</p>
            </div>
          </div>
        </div>

        <div className="score-feedback">{getFeedbackMessage()}</div>

        <button className="home-button" onClick={handleDone}>
          {language === "Arabic" ? "تم" : "Done"}
        </button>
      </div>
    </div>
  );
};

export default ScorePage;
