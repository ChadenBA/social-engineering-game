import React, { useEffect, useState } from "react";
import axios from "axios";
import type { PhishingEmail , Language } from "../types/PhishingEmail";
import { useTranslation } from "react-i18next";

const phishingIcons: Record<string, string> = {
  from: "📧",
  link: "🔗",
  urgency: "⏰",
  attachment: "📎",
};

const PhishingGame: React.FC = () => {
  const [emails, setEmails] = useState<PhishingEmail[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [clicked, setClicked] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const { t, i18n } = useTranslation();
  const language = (["en", "fr"].includes(i18n.language) ? i18n.language : "en") as Language;

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/phishing-emails`).then((res) => {
      setEmails(res.data);
    });
  }, []);

  const current = emails[currentIndex] || null;

  const handleClick = (area: string) => {
    if (!clicked.includes(area)) {
      setClicked([...clicked, area]);
    }
  };

  const checkAnswers = () => setShowResult(true);

  const handleNextEmail = () => {
    if (currentIndex < emails.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setClicked([]);
      setShowResult(false);
    }
  };

  if (!current) return <p style={{ color: "#eee" }}>🛠️ Loading Cyber Intel...</p>;

  return (
    <div
      style={{
        paddingTop: "4rem",
        background: "#0d0d0d",
        color: "#00bcd4",
        padding: "3rem",
        fontFamily: "'Orbitron', sans-serif",
        borderRadius: "10px",
        maxWidth: "800px",
        margin: "auto",
        marginTop: "3rem",
        boxShadow: "0 0 20px #3399ff",
      }}
    >
      <h2 style={{ borderBottom: "2px solid #3399ff", paddingBottom: "0.5rem" }}>
        {t("detect_phishing")}
      </h2>

      {/* Email Card */}
      <div
        style={{
          border: "2px solid #333",
          borderRadius: "10px",
          backgroundColor: "#111",
          marginTop: "1rem",
          padding: "1rem",
        }}
      >
        <h3>{current.title[language]}</h3>
        <img
  src={`${import.meta.env.VITE_API_URL}/${current.image}`}          alt="email"
          style={{
            width: "100%",
            maxWidth: "400px",
            border: "2px solid #3399ff",
            borderRadius: "8px",
            display: "block",
            margin: "0 auto",
          }}
        />
      </div>

      {/* Clickable Parts */}
      <div style={{ marginTop: "1.5rem" }}>
        {t("click_parts")}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1rem",
            marginTop: "1rem",
          }}
        >
         {["from", "link", "urgency", "attachment"].map((part) => (
  <button
    key={part}
    onClick={() => handleClick(part)}
              style={{
                padding: "1rem",
                border: "2px solid #3399ff",
                borderRadius: "8px",
                background: clicked.includes(part)
                  ? current.suspicious_areas.includes(part)
                    ? "#003366" 
                    : "#660000" 
                  : "#1a1a1a",
                color: "#66ccff",
                cursor: "pointer",
                fontSize: "1rem",
                minWidth: "120px",
                transition: "0.3s",
              }}
            >
              {phishingIcons[part]} {t(`parts.${part}`)}
            </button>
          ))}
        </div>

        {/* Controls */}
        <div style={{ marginTop: "2rem", display: "flex", gap: "1rem" }}>
          <button
            onClick={checkAnswers}
            disabled={showResult}
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#3399ff",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              fontWeight: "bold",
              cursor: showResult ? "not-allowed" : "pointer",
              fontSize: "1rem",
              boxShadow: "0 0 10px #3399ff",
            }}
          >
            {t("reveal_clues")}
          </button>

          <button
            onClick={handleNextEmail}
            disabled={currentIndex >= emails.length - 1}
            style={{
              padding: "0.8rem 1.5rem",
              backgroundColor: "#0055cc",
              border: "none",
              borderRadius: "5px",
              color: "#fff",
              fontWeight: "bold",
              cursor:
                currentIndex >= emails.length - 1 ? "not-allowed" : "pointer",
              fontSize: "1rem",
              boxShadow: "0 0 10px #0055cc",
            }}
          >
            {t("next_email")}
          </button>
        </div>

        {/* Results */}
        {showResult && (
          <div
            style={{
              marginTop: "2rem",
              backgroundColor: "#1a1a1a",
              padding: "1rem",
              borderRadius: "8px",
              border: "2px dashed #3399ff",
            }}
          >
            <h4>{t("clue_breakdown")}</h4>
            <ul>
            {Object.entries(current.explanation).map(([key, val]) => {
  const explanation = val as Record<Language, string>; // 👈 cast once
  return (
    <li key={key}>
      <strong>{phishingIcons[key]} {key}:</strong>{" "}
      {explanation[language]}
    </li>
  );
})}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

export default PhishingGame;
