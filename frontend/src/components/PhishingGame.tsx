import React, { useEffect, useState } from "react";
import axios from "axios";
import type { PhishingEmail } from "../types/PhishingEmail";

const phishingIcons: Record<string, string> = {
  from: "📧",
  link: "🔗",
  urgency: "⏰",
  attachment: "📎",
};

const PhishingGame: React.FC = () => {
  const [emails, setEmails] = useState<PhishingEmail[]>([]);
  const [current, setCurrent] = useState<PhishingEmail | null>(null);
  const [clicked, setClicked] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/phishing-emails").then((res) => {
      setEmails(res.data);
      setCurrent(res.data[0]);
    });
  }, []);

  const handleClick = (area: string) => {
    if (!clicked.includes(area)) {
      setClicked([...clicked, area]);
    }
  };

  const checkAnswers = () => setShowResult(true);

  if (!current) return <p style={{ color: "#eee" }}>🛠️ Loading Cyber Intel...</p>;

  return (
    <div
      style={{
        background: "#0d0d0d",
        color: "#00ffcc",
        padding: "2rem",
        fontFamily: "'Orbitron', sans-serif",
        borderRadius: "10px",
        maxWidth: "800px",
        margin: "auto",
        boxShadow: "0 0 20px #00ffcc",
      }}
    >
      <h2 style={{ borderBottom: "2px solid #00ffcc", paddingBottom: "0.5rem" }}>
        🕵️‍♂️ Detect the Phishing Clues!
      </h2>

      <div
        style={{
          border: "2px solid #333",
          borderRadius: "10px",
          backgroundColor: "#111",
          marginTop: "1rem",
          padding: "1rem",
        }}
      >
        <h3>{current.title}</h3>
        <img
          src={current.image}
          alt="email"
          style={{
            width: "100%",
            border: "2px solid #00ffcc",
            borderRadius: "8px",
          }}
        />
      </div>

      <div style={{ marginTop: "1.5rem" }}>
        <p>🧠 Click the parts of the email you think are suspicious:</p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: "1rem", marginTop: "1rem" }}>
          {["from", "link", "urgency", "attachment"].map((part) => (
            <button
              key={part}
              onClick={() => handleClick(part)}
              style={{
                padding: "1rem",
                border: "2px solid #00ffcc",
                borderRadius: "8px",
                background: clicked.includes(part)
                  ? current.suspicious_areas.includes(part)
                    ? "#004d00"
                    : "#660000"
                  : "#1a1a1a",
                color: "#00ffcc",
                cursor: "pointer",
                fontSize: "1rem",
                minWidth: "120px",
                transition: "0.3s",
              }}
            >
              {phishingIcons[part]} {part.toUpperCase()}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "2rem" }}>
          <button
            onClick={checkAnswers}
            disabled={showResult}
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#00ffcc",
              border: "none",
              borderRadius: "5px",
              color: "#000",
              fontWeight: "bold",
              cursor: showResult ? "not-allowed" : "pointer",
              marginTop: "1rem",
              fontSize: "1rem",
            }}
          >
            🚨 Reveal Clues
          </button>

          {showResult && (
            <div
              style={{
                marginTop: "2rem",
                backgroundColor: "#1a1a1a",
                padding: "1rem",
                borderRadius: "8px",
                border: "2px dashed #00ffcc",
              }}
            >
              <h4>🔍 Clue Breakdown</h4>
              <ul>
                {Object.entries(current.explanation).map(([key, val]) => (
                  <li key={key}>
                    <strong>{phishingIcons[key]} {key}:</strong> {val}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PhishingGame;
