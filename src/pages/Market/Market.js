import React, { useState } from "react";
import axios from "axios";
import { FaCoins } from "react-icons/fa";
import "./Market.css";

const Market = () => {
  const [loading, setLoading] = useState(false);

  const handlePurchase = async (item, price) => {
    setLoading(true);
    try {
      const response = await axios.post("https://your-backend-api.com/buy", {
        item,
        price,
      });

      alert(response.data.message); // Show success message
    } catch (error) {
      console.error("Purchase failed:", error);
      alert("Purchase failed! Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="market-items">
      <div className="item">
        <h3>⏸️ Freeze Streak</h3>
        <button
          className="buy-btn"
          onClick={() => handlePurchase("Freeze Streak", 100)}
          disabled={loading}
        >
          {loading ? "Processing..." : <>Buy <FaCoins className="coin-icon" /> 100</>}
        </button>
      </div>

      <div className="item">
        <h3>⚡ Generation Power</h3>
        <button
          className="buy-btn"
          onClick={() => handlePurchase("Generation Power", 200)}
          disabled={loading}
        >
          {loading ? "Processing..." : <>Buy <FaCoins className="coin-icon" /> 200</>}
        </button>
      </div>
    </div>
  );
};

export default Market;
