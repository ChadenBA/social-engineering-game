import React, { useEffect, useState } from "react";
import axios from "axios";
import type { Question } from "../types";

const Quiz: React.FC = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/questions").then((res) => {
      setQuestions(res.data);
    });
  }, []);

  const handleAnswer = (index: number) => {
    setSelectedOption(index);
    setShowExplanation(true);
    if (index === questions[currentIndex].correctAnswer) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelectedOption(null);
    setShowExplanation(false);
  };

  const getSkillLevel = () => {
    const percentage = (score / questions.length) * 100;
    if (percentage >= 80) return "🧠 Expert Defender";
    if (percentage >= 50) return "🛡️ Intermediate";
    return "👶 Beginner – Keep Learning!";
  };

  if (questions.length === 0) return <p style={{ color: "#0f0", textAlign: "center" }}>Loading...</p>;
  const current = questions[currentIndex];
  const progressPercent = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div style={{
      background: "#0d1117",
      color: "#f0f6fc",
      fontFamily: "'Fira Code', monospace",
      minHeight: "100vh",
      padding: "2rem",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    }}>
      <h1 style={{
        color: "#58a6ff",
        textShadow: "0 0 10px #58a6ff",
        marginBottom: "2rem",
      }}>
        🛡️ Social Engineering Awareness Quiz
      </h1>

      {/* Progress Bar */}
      <div style={{
        width: "100%",
        maxWidth: "600px",
        backgroundColor: "#21262d",
        borderRadius: "5px",
        overflow: "hidden",
        marginBottom: "1rem",
      }}>
        <div style={{
          height: "10px",
          width: `${progressPercent}%`,
          backgroundColor: "#58a6ff",
          transition: "width 0.3s",
        }} />
      </div>

      <div style={{
        backgroundColor: "#161b22",
        padding: "2rem",
        borderRadius: "10px",
        maxWidth: "600px",
        width: "100%",
        boxShadow: "0 0 20px #0ff3",
      }}>
        <h2 style={{ color: "#79c0ff" }}>Question {currentIndex + 1} of {questions.length}</h2>
        <p style={{ marginBottom: "1rem" }}>{current.question}</p>

        <ul style={{ listStyle: "none", padding: 0 }}>
          {current.options.map((opt, idx) => {
            const isCorrect = selectedOption === idx && idx === current.correctAnswer;
            const isWrong = selectedOption === idx && idx !== current.correctAnswer;

            return (
              <li key={idx} style={{ marginBottom: "1rem" }}>
                <button
                  onClick={() => handleAnswer(idx)}
                  disabled={selectedOption !== null}
                  style={{
                    background: selectedOption === null
                      ? "#21262d"
                      : isCorrect
                        ? "#238636"
                        : isWrong
                          ? "#da3633"
                          : "#21262d",
                    color: "#f0f6fc",
                    border: "1px solid #30363d",
                    padding: "0.75rem 1rem",
                    width: "100%",
                    textAlign: "left",
                    borderRadius: "6px",
                    cursor: selectedOption === null ? "pointer" : "not-allowed",
                    transition: "all 0.3s",
                  }}
                >
                  {opt}
                </button>
              </li>
            );
          })}
        </ul>

        {showExplanation && (
          <div style={{ marginTop: "1.5rem" }}>
            <p style={{ color: "#ffa657" }}>
              <strong>💡 Explanation:</strong> {current.explanation}
            </p>

            {currentIndex < questions.length - 1 ? (
              <button
                onClick={handleNext}
                style={{
                  marginTop: "1rem",
                  background: "#58a6ff",
                  color: "#0d1117",
                  border: "none",
                  padding: "0.75rem 1.5rem",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "bold",
                  boxShadow: "0 0 10px #58a6ff",
                }}
              >
                Next →
              </button>
            ) : (
              <div style={{ marginTop: "1.5rem" }}>
                <h3 style={{ color: "#3fb950" }}>✅ Quiz Completed!</h3>
                <p style={{ marginTop: "0.5rem" }}>Your Score: <strong>{score} / {questions.length}</strong></p>
                <p style={{ marginTop: "0.5rem" }}>{getSkillLevel()}</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
