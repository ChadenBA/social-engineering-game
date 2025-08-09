import React, { useEffect, useState } from "react";
import type { CSSProperties } from "react";
import axios from "axios";
import type { RolePlayScenario } from "../types/RolePlayScenario";

const RolePlayGame: React.FC = () => {
  const [scenarios, setScenarios] = useState<RolePlayScenario[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);

  useEffect(() => {
    axios.get("http://127.0.0.1:5000/api/roleplay-scenarios").then((res) => {
      setScenarios(res.data);
    });
  }, []);

  const handleChoice = (index: number) => setSelected(index);

  const next = () => {
    setCurrentIndex((prev) => prev + 1);
    setSelected(null);
  };

  if (scenarios.length === 0) return <p style={{ color: "#ccc" }}>Loading mission data...</p>;

  const current = scenarios[currentIndex];

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.role}>
          {current.role === "attacker" ? "🎭 Attacker Mission" : "🛡️ Defender Mission"}
        </h2>
        <p style={styles.situation}><strong>📜 Scenario:</strong> {current.situation}</p>

        <div style={styles.choices}>
          {current.choices.map((choice, i) => (
            <button
              key={i}
              onClick={() => handleChoice(i)}
              disabled={selected !== null}
              style={{
                ...styles.choiceButton,
                backgroundColor:
                  selected === i ? "#00bcd4" : "#1e1e2f",
                cursor: selected === null ? "pointer" : "default",
              }}
            >
              {choice.text}
            </button>
          ))}
        </div>

        {selected !== null && (
          <div style={styles.result}>
            <p style={styles.outcome}>
              <strong>💡 Outcome:</strong> {current.choices[selected].outcome}
            </p>
            {currentIndex < scenarios.length - 1 ? (
              <button onClick={next} style={styles.nextButton}>
                ▶️ Next Mission
              </button>
            ) : (
              <p style={styles.complete}>🏁 All missions complete. Good job, agent!</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

// Explicitly type each style object as CSSProperties
const styles: Record<string, CSSProperties> = {
  container: {
    background: "#0d1117",
    color: "#e0e0e0",
    fontFamily: "'Courier New', monospace",
    paddingTop: "8rem",

  
  },
  card: {
    background: "#161b22",
    padding: "2rem",
    borderRadius: "8px",
    boxShadow: "0 0 20px rgba(0, 255, 255, 0.2)",
    maxWidth: "600px",
    margin: "0 auto",
  },
  role: {
    fontSize: "1.5rem",
    color: "#00bcd4",
    marginBottom: "1rem",
  },
  situation: {
    fontSize: "1.1rem",
    marginBottom: "1.5rem",
  },
  choices: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
  },
  choiceButton: {
    padding: "1rem",
    backgroundColor: "#1e1e2f",
    color: "#ffffff",
    border: "1px solid #00bcd4",
    borderRadius: "5px",
    transition: "background 0.3s",
  },
  result: {
    marginTop: "2rem",
  },
  outcome: {
    backgroundColor: "#00303d",
    padding: "1rem",
    borderRadius: "5px",
    color: "#80deea",
  },
  nextButton: {
    marginTop: "1rem",
    padding: "0.75rem 1.5rem",
    fontSize: "1rem",
    backgroundColor: "#00bcd4",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    color: "#0d1117",
  },
  complete: {
    marginTop: "1rem",
    color: "#8bc34a",
    fontWeight: "bold",
  },
};

export default RolePlayGame;
