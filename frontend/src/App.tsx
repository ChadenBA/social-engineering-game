import { useState } from "react";
import Sidebar from "./components/Sidebar";
import Quiz from "./components/Quiz";
import PhishingGame from "./components/PhishingGame";
import RolePlayGame from "./components/RolePlayGame";
import Home from "./components/Home";

export default function App() {
  const [selectedGame, setSelectedGame] = useState("Home");

  return (
    <div className="flex h-screen">
      {/* Sidebar (Vertical) */}
      <Sidebar onSelect={setSelectedGame} />

      {/* Main Content (Centered) */}
      <main className="flex-1 flex items-center justify-center p-6 bg-gray-100">
        {selectedGame === "Home" && <Home />}
        {selectedGame === "Quiz" && <Quiz />}
        {selectedGame === "Phishing" && <PhishingGame />}
        {selectedGame === "Role Play" && <RolePlayGame />}
      </main>
    </div>
  );
}
