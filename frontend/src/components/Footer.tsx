import { Github } from "lucide-react"; 

interface FooterProps {
  repoUrl: string;
}

export default function Footer({ repoUrl }: FooterProps) {
  return (
    <footer
      style={{
        marginTop : "17rem",
        background: "#0d1117",
        color: "#e0e0e0",
        textAlign: "center",
        padding: "0.8rem",
        borderTop: "1px solid #00bcd4",
        fontFamily: "'Courier New', monospace",
        fontSize: "0.9rem",
        cursor: "pointer",
      }}
      onClick={() => window.open(repoUrl, "_blank")}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}>
        <Github size={20} color="#00bcd4" />
        <span>⭐ Give this project a star!</span>
      </div>
      <p>
        ▷ Designed and built by <strong>Chaden ben ammar</strong> © {new Date().getFullYear()}
      </p>
      <p>Created by me, sprinkled with a little magic ✨</p>
    </footer>
  );
}
