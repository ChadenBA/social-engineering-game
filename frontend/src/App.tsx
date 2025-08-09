import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Quiz from "./components/Quiz";
import PhishingGame from "./components/PhishingGame";
import RolePlayGame from "./components/RolePlayGame";
import Home from "./components/Home";

export default function App() {
  const [selectedGame, setSelectedGame] = useState("Home");

  return (
    <div>
      <Sidebar onSelect={setSelectedGame} />

      <main className="ml-20 p-6">
        {selectedGame === "Home" && <Home />}
        {selectedGame === "Quiz" && <Quiz />}
        {selectedGame === "Phishing" && <PhishingGame />}
        {selectedGame === "Role Play" && <RolePlayGame />}
      </main>
    </div>
  );
}

