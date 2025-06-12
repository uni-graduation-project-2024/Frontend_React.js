import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";

import { TbCoin } from "react-icons/tb";
import { BsLightningFill } from "react-icons/bs";

import "./Market.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";

const Market = () => {
  const [loadingBuyFreezeStreak, setLoadingBuyFreezeStreak] = useState(false);
  const [loadingBuyGenerationPower, setLoadingBuyGenerationPower] = useState(false);
  const [freezeStreak, setFreezeStreak] = useState(0);
  const { updateNavbar } = useOutletContext();
  const { user } = getAuthToken();

  const [typedText, setTypedText] = useState("");
  const fullText = "Education is the most powerful weapon you can use to change the world.";

  useEffect(() => {
    const fetchUserStats = async () => {
      try {
        const response = await axios.get(`${linkhost}/api/User/user-navbar-info?userId=${user.nameid}`);
        setFreezeStreak(response.data.freezeStreak || 0);
      } catch (error) {
        console.error("Error fetching user stats:", error);
      }
    };

    if (user.nameid) fetchUserStats();
  }, [user.nameid]);

  useEffect(() => {
    let index = 0;
    let currentText = "";

    const interval = setInterval(() => {
      if (index < fullText.length) {
        currentText += fullText[index];
        setTypedText(currentText);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 50);

    return () => clearInterval(interval);
  }, []);

  const handlePurchaseFreezeStreak = async () => {
    setLoadingBuyFreezeStreak(true);
    try {
      await axios.post(`${linkhost}/api/User/buy-freeze-streak/${user.nameid}`);
      alert("Freeze Streak has been successfully purchased!");
      updateNavbar();
      setFreezeStreak(prev => prev + 1);
    } catch (error) {
      console.error("Purchase failed:", error);
      alert(error.response?.data || "Purchase failed! Try again.");
    } finally {
      setLoadingBuyFreezeStreak(false);
    }
  };

  const handlePurchaseGenerationPower = async () => {
    setLoadingBuyGenerationPower(true);
    try {
      await axios.post(`${linkhost}/api/User/PurchaseGenerationPower/${user.nameid}`);
      alert("Generation power has been successfully purchased!");
      updateNavbar();
    } catch (error) {
      console.error("Purchase failed:", error);
      alert(error.response?.data || "Purchase failed! Try again.");
    } finally {
      setLoadingBuyGenerationPower(false);
    }
  };

  return (
    <div className="market-items">
      <p style={{ color: "black" }}>
        You currently have : {freezeStreak} freeze streak
      </p>
      {freezeStreak >= 5 && (
        <p style={{ color: "#979393" }}>
          You can have at maximum 5 freeze streak
        </p>
      )}

      {/* 🛡️ Streak Shield */}
      <div className="item">
        <div className="item-header">
          <h3>🛡️ Freeze Streak</h3>
          <button
            className="buy-btn"
            onClick={handlePurchaseFreezeStreak}
            disabled={loadingBuyFreezeStreak}
          >
            {loadingBuyFreezeStreak ? "Processing..." : (
              <>
                <TbCoin className="coin-icon" /> 100
              </>
            )}
          </button>
        </div>
        <p className="item-description">
          This item saves your Streak score if you miss a day.
        </p>
      </div>

      {/* ⚡ Generation Power */}
      <div className="item">
        <div className="item-header">
          <h3><BsLightningFill className="power" /> Generation Power</h3>
          <button
            className="buy-btn"
            onClick={handlePurchaseGenerationPower}
            disabled={loadingBuyGenerationPower}
          >
            {loadingBuyGenerationPower ? "Processing..." : (
              <>
                <TbCoin className="coin-icon" /> 100
              </>
            )}
          </button>
        </div>
        <p className="item-description">
          You can use this power to create new quizzes.
        </p>
      </div>

      {/* Motivational Section */}
      <div className="motivational-box">
        <img src="/images/note.png" alt="Character" className="char-img" />
        <div className="speech-bubble">
          <p>{typedText}</p>
        </div>
      </div>
    </div>
  );
};

export default Market;
