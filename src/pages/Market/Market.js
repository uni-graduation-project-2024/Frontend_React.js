import React, { useState, useEffect } from "react";
import { useOutletContext } from "react-router-dom";
import axios from "axios";
import { FaCoins } from "react-icons/fa";
import "./Market.css";
import linkhost from "../..";
import { getAuthToken } from "../../services/auth";

const Market = ( ) => {
  const [loading, setLoading] = useState(false);
  const [freezeStreak, setFreezeStreak] = useState(0);
  const { updateNavbar } = useOutletContext();
  const { user } = getAuthToken();

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
  }, [user.nameid, loading]);

  const handlePurchase = async () => {
    setLoading(true);
    let response;
    try {
      response = await axios.post(`${linkhost}/api/User/buy-freeze-streak/${user.nameid}`);
      alert("Freeze Streak has been successfully purchased!"); // Show success message
      updateNavbar();
    } catch (error) {
      console.error("Purchase failed:", error);
      alert(error.response?.data || "Purchase failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="market-items">
      <p style={{color: "black"}}>You currently have : {freezeStreak} freeze streak</p>
      {freezeStreak >= 5? <p style={{color: "#979393"}}>You can have at maximum 5 freeze streaks</p> : <p></p>}
      <div className="item">
        <h3>⏸️ Freeze Streak</h3>
        <button
          className="buy-btn"
          onClick={() => handlePurchase()}
          disabled={loading}
        >
          {loading ? "Processing..." : <>Buy <FaCoins className="coin-icon" /> 100</>}
        </button>
      </div>

      <div className="item">
        <h3>⚡ Generation Power</h3>
        <button
          className="buy-btn"
          // onClick={() => handlePurchase("Generation Power", 200)}
        >
          <>Buy <FaCoins className="coin-icon" /> 200</>
        </button>
      </div>
    </div>
  );
};

export default Market;
