import React, {useEffect, useRef} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "./scorePage.css";

const ScorePage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { totalScore, timeTaken, xpCollected } = location.state || {};
  const celebrationSound = useRef(null);

  useEffect(()=>{
    celebrationSound.current = new Audio("/assets/soundEffects/celebration.mp3");
    celebrationSound.current.preload = "auto";

    celebrationSound.current.currentTime = 0; // Reset sound if already playing
    // celebrationSound.current.play();
  }, [])

  const homeHandle = () =>{
    navigate("/library");
  }

  return (
    <div className="score-container">
    <div className="score-card">
    <div className="celebration-img">
  {
    totalScore >= 90 ? (
      <img src="/images/good degree.png" alt="Superstar" /> 
    ) : totalScore >= 70 ? (
      <img src="/images/p.png" alt="Challenge" /> 
    ) : totalScore >= 50 ? (
      <img src="/images/good degree2.png" alt="Encourage" /> 
    ) : totalScore >= 20 ? (
      <img src="/images/bad degree2.png" alt="Try Again" /> 
    ) : (
      <img src="/images/bad degree.png" alt="Very Bad" /> 
    )
  }
</div>

      <h2 className="quiz-completed">Quiz Completed</h2>
  
      <div className="score-details">
        <div className="score-box time">
          <p className="label">TIME</p>
          <p className="value">{timeTaken}</p>
        </div>
  
        <div className="score-box score">
          <p className="label">SCORE</p>
          <p className="value">{totalScore}%</p>
        </div>
  
        <div className="score-box xp">
          <p className="label">XP</p>
          <p className="value">{xpCollected}</p>
        </div>
      </div>
  
      <div className="score-feedback">
        {
          typeof totalScore === "number" ? (
            totalScore >= 90 ? "🌟 ممتاز! مذاكرتك ممتازة جدًا" :
            totalScore >= 70 ? "👍 أداء جيد! استمر في المذاكرة" :
            totalScore >= 50 ? "🙂 مش بطال، بس محتاج تراجع الشابتر" :
            "📚 درجتك ضعيفة، راجع الشابتر كويس وحاول تاني"
          ) : "لم يتم تحديد الدرجة بعد."
        }
      </div>
  
      <button className="home-button" onClick={homeHandle}>
        Done
      </button>
    </div>
  </div>
  
  );
};

export default ScorePage;
