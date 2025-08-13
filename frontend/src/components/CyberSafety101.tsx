import  { useState, useEffect } from "react";
import "./CyberSafety101.css";

type Tip = {
  category: string;
  tip: string;
  example: string;
  explanation: string;
};

const tips: Tip[] = [
  {
    category: "Email Safety",
    tip: "Check the Sender's Email",
    example: "Phishing: support@bank-secure-login.com vs Real: support@bank.com",
    explanation: "Scammers use lookalike domains to trick you into thinking an email is legitimate."
  },
  {
    category: "Passwords",
    tip: "Use Multi-Factor Authentication",
    example: "Even if someone steals your password, MFA stops them from logging in.",
    explanation: "Apps like Google Authenticator add an extra layer of protection."
  },
  {
    category: "Social Media",
    tip: "Don't Overshare Personal Info",
    example: "Posting your travel dates online can alert thieves your home is empty.",
    explanation: "Cybercriminals use public info to craft targeted attacks."
  }
];

const categories: string[] = ["All", "Email Safety", "Passwords", "Social Media"];

export default function CyberSafety101() {
  const [category, setCategory] = useState<string>("All");
  const [flipped, setFlipped] = useState<boolean[]>(Array(tips.length).fill(false));
  const [readCount, setReadCount] = useState<number>(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [dailyTip, setDailyTip] = useState<Tip | null>(null);

  // Daily tip logic
  useEffect(() => {
    const todayIndex = new Date().getDate() % tips.length;
    setDailyTip(tips[todayIndex]);
  }, []);

  // Flip card
  const handleFlip = (index: number): void => {
    const newFlipped = [...flipped];
    if (!newFlipped[index]) {
      setReadCount(prev => prev + 1);
    }
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);

    // Check for achievements
    if (readCount + 1 === tips.length) {
      unlockAchievement("Cyber Safety Master");
    }
  };

  const unlockAchievement = (name: string): void => {
    if (!achievements.includes(name)) {
      setAchievements(prev => [...prev, name]);
    }
  };

  // Filter tips
  const filteredTips: Tip[] =
    category === "All" ? tips : tips.filter(t => t.category === category);



  return (
    <div className="cyber-container">
      <h1>Cyber Safety 101</h1>

      {/* Daily Tip */}
      {dailyTip && (
        <div className="daily-tip">
          <strong>Daily Tip:</strong> {dailyTip.tip}
        </div>
      )}

      {/* Filters */}
      <div className="filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={category === cat ? "active" : ""}
            onClick={() => setCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(readCount / tips.length) * 100}%` }}
        ></div>
      </div>
      <p>{readCount} / {tips.length} tips read</p>

      {/* Flashcards */}
      <div className="cards">
        {filteredTips.map((tip, index) => (
          <div
            key={index}
            className={`card ${flipped[index] ? "flipped" : ""}`}
            onClick={() => handleFlip(index)}
          >
            <div className="card-front">
              <h2>{tip.tip}</h2>
              <p>Category: {tip.category}</p>
            </div>
            <div className="card-back">
              <strong>Example:</strong>
              <p>{tip.example}</p>
              <strong>Why:</strong>
              <p>{tip.explanation}</p>
            </div>
          </div>
        ))}
      </div>

     
    </div>
  );
}
