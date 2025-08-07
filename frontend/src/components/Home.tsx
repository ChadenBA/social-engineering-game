import React from "react";
import { Shield, Lock, Key, AlertCircle, Wifi } from "lucide-react";

const floatingIcons = [
  { Icon: Shield, size: 48, color: "#00bcd4", top: 10, left: 700, delay: "0s" },
  { Icon: Lock, size: 40, color: "#8bc34a", top: 120, left: 320, delay: "2.5s" },
  { Icon: Key, size: 36, color: "#ff5722", top: 250, left: 90, delay: "4s" },
  { Icon: AlertCircle, size: 50, color: "#ff9800", top: 320, left: 350, delay: "1.7s" },
  { Icon: Wifi, size: 44, color: "#673ab7", top: 90, left: 420, delay: "3.2s" },
  { Icon: Shield, size: 48, color: "#00bcd4", top: 50, left: 30, delay: "0s" },
  { Icon: Lock, size: 40, color: "#8bc34a", top: 120, left: 320, delay: "2.5s" },
  { Icon: Key, size: 36, color: "#ff5722", top: 250, left: 90, delay: "4s" },
  { Icon: AlertCircle, size: 50, color: "#ff9800", top: 320, left: 350, delay: "1.7s" },
  { Icon: Wifi, size: 44, color: "#673ab7", top: 90, left: 420, delay: "3.2s" },
];



const Home: React.FC = () => {
  return (
    <div style={styles.container}>
      {floatingIcons.map(({ Icon, size, color, top, left, delay }, i) => (
        <div
          key={i}
          style={{
            ...styles.floatingIcon,
            top,
            left,
            animationDelay: delay,
            width: size,
            height: size,
            color,
          }}
        >
          <Icon size={size} stroke={color} strokeWidth={1.8} />
        </div>
      ))}

      {/* Main content */}
      <div style={styles.content}>
        <h1 style={styles.title}>Social Engineering Awareness Game</h1>
        <p style={styles.description}>
          Dive into interactive cybersecurity challenges! Identify phishing scams, test your social engineering knowledge, and role-play as attacker or defender. 
        </p>
        <p style={styles.description}>
          Sharpen your skills and stay safe in the digital world.
        </p>
      </div>

      <style>{`
        @keyframes floatUpDown {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-25px); }
        }
      `}</style>
    </div>
  );
};

const styles: Record<string, React.CSSProperties> = {
  container: {
    position: "relative",
    height: "100vh",
    backgroundColor: "#0d1117",
    color: "#e0e0e0",
    fontFamily: "'Courier New', monospace",
    overflow: "hidden",
   
    width: '100%', maxWidth: 900, padding: '2rem', boxSizing: 'border-box' 
  },
  floatingIcon: {
    position: "absolute",
    opacity: 0.3,
    animationName: "floatUpDown",
    animationTimingFunction: "ease-in-out",
    animationIterationCount: "infinite",
    animationDuration: "6s",
  },
  content: {
    position: "relative",
    maxWidth: "600px",
    margin: "0 auto",
    textAlign: "center",
    zIndex: 10,
  },
  title: {
    fontSize: "3rem",
    marginBottom: "1rem",
    color: "#00bcd4",
  },
  description: {
    fontSize: "1.3rem",
    lineHeight: 1.6,
    marginBottom: "1rem",
  },
};

export default Home;
