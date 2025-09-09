import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "./CyberSafety101.css";

type Tip = {
  category: string;
  tip: string;
  example: string;
  explanation: string;
};

export default function CyberSafety101() {
  const { t } = useTranslation("cyber");

  const tips = t("tips", { returnObjects: true }) as Tip[];
  const categories: string[] = [
    t("categories.all"),
    t("categories.email"),
    t("categories.passwords"),
    t("categories.social"),
    t("categories.wifi")
  ];

  const [category, setCategory] = useState<string>(t("categories.all"));
  const [flipped, setFlipped] = useState<boolean[]>(Array(tips.length).fill(false));
  const [readCount, setReadCount] = useState<number>(0);
  const [achievements, setAchievements] = useState<string[]>([]);
  const [dailyTip, setDailyTip] = useState<Tip | null>(null);

  useEffect(() => {
    const todayIndex = new Date().getDate() % tips.length;
    setDailyTip(tips[todayIndex]);
  }, [tips]);

  const handleFlip = (index: number): void => {
    const newFlipped = [...flipped];
    if (!newFlipped[index]) {
      setReadCount(prev => prev + 1);
    }
    newFlipped[index] = !newFlipped[index];
    setFlipped(newFlipped);

    if (readCount + 1 === tips.length) {
      unlockAchievement(t("achievement"));
    }
  };

  const unlockAchievement = (name: string): void => {
    if (!achievements.includes(name)) {
      setAchievements(prev => [...prev, name]);
    }
  };

  const filteredTips: Tip[] =
    category === t("categories.all") ? tips : tips.filter(tip => tip.category === category);

  return (
    <div className="cyber-container">
      <h1>{t("title")}</h1>

      {dailyTip && (
        <div className="daily-tip">
          <strong>{t("dailyTip")}:</strong> {dailyTip.tip}
        </div>
      )}

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

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${(readCount / tips.length) * 100}%` }}
        ></div>
      </div>
      <p>{t("progress", { read: readCount, total: tips.length })}</p>

      <div className="cards">
        {filteredTips.map((tip, index) => (
          <div
            key={index}
            className={`card ${flipped[index] ? "flipped" : ""}`}
            onClick={() => handleFlip(index)}
          >
            <div className="card-front">
              <h2>{tip.tip}</h2>
              <p>{t("categories.all")}: {tip.category}</p>
            </div>
            <div className="card-back">
              <strong>{t("example")}:</strong>
              <p>{tip.example}</p>
              <strong>{t("why")}:</strong>
              <p>{tip.explanation}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
