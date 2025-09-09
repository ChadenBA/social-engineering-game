import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Quiz from "./components/Quiz";
import PhishingGame from "./components/PhishingGame";
import RolePlayGame from "./components/RolePlayGame";
import Home from "./components/Home";
import CyberSafety101 from "./components/CyberSafety101";
import LanguageSwitcher from "./components/LanguageSwitcher";
export default function App() {
  const [selectedGame, setSelectedGame] = useState("Home");

  return (
    <div>
      <Sidebar onSelect={setSelectedGame} />
      <LanguageSwitcher />

      <main className="ml-20 p-6">

        {selectedGame === "Home" && <Home />}
        {selectedGame === "Quiz" && <Quiz />}
        {selectedGame === "Phishing" && <PhishingGame />}
        {selectedGame === "Role Play" && <RolePlayGame />}
        {selectedGame === "101" && <CyberSafety101 />}

      </main>
    </div>
  );
}

