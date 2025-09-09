import { Github } from "lucide-react";
import { useTranslation } from "react-i18next";

interface FooterProps {
  repoUrl: string;
}

export default function Footer({ repoUrl }: FooterProps) {
  const { t } = useTranslation("footer");

  return (
    <footer
      style={{
        marginTop: "15rem",
        background: "#0d1117",
        color: "#e0e0e0",
        textAlign: "center",
        padding: "0.5rem",
        borderTop: "1px solid #00bcd4",
        fontFamily: "'Courier New', monospace",
        fontSize: "0.9rem",
        cursor: "pointer",
      }}
      onClick={() => window.open(repoUrl, "_blank")}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <Github size={20} color="#00bcd4" />
        <span>{t("star")}</span>
      </div>
      <p>
        {t("designed")} <strong>Chaden ben ammar</strong> ©{" "}
        {new Date().getFullYear()}
      </p>
      <p>{t("created")}</p>
    </footer>
  );
}
