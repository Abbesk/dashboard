// src/pages/NotFoundPage.jsx
import { useNavigate } from "react-router-dom";
import companyLogo from "../assets/LOGO_FAREVA Amboise.jpg";
import { useTranslation } from 'react-i18next';

export default function NotFoundPage() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleGoHome = () => {
    navigate("/home");
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div style={styles.wrapper}>
      <div style={styles.card}>
        <img
          src={companyLogo}
          alt="Logo de l'entreprise"
          style={styles.logo}
        />

        <h1 style={styles.title}>404</h1>
        <p style={styles.subtitle}>{t("pageNotFound")}</p>

        <p style={styles.text}>
          {t("pageNotFoundMessage")}
        </p>

        <div style={styles.buttons}>
          <button style={{ ...styles.button, ...styles.primary }} onClick={handleGoHome}>
            {t("backHome")}
          </button>
          <button style={{ ...styles.button, ...styles.secondary }} onClick={handleGoBack}>
            {t("goBack")}
          </button>
        </div>
      </div>
    </div>
  );
}

const styles = {
  wrapper: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "1.5rem",
    background: "linear-gradient(135deg, #f5f7fa, #e4ebf5)",
  },
  card: {
    maxWidth: "480px",
    width: "100%",
    backgroundColor: "#ffffff",
    borderRadius: "24px",
    boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
    padding: "2.5rem 2rem",
    textAlign: "center",
    boxSizing: "border-box",
  },
  logo: {
    width: "120px",
    marginBottom: "1.5rem",
    objectFit: "contain",
  },
  title: {
    fontSize: "3.5rem",
    fontWeight: "800",
    margin: "0",
    color: "#1f2933",
  },
  subtitle: {
    fontSize: "1.4rem",
    fontWeight: "600",
    margin: "0.3rem 0 0.8rem",
    color: "#52606d",
  },
  text: {
    fontSize: "0.98rem",
    lineHeight: 1.5,
    marginBottom: "2rem",
    color: "#7b8794",
  },
  buttons: {
    display: "flex",
    flexWrap: "wrap",
    gap: "0.75rem",
    justifyContent: "center",
  },
  button: {
    padding: "0.7rem 1.4rem",
    borderRadius: "999px",
    border: "none",
    cursor: "pointer",
    fontSize: "0.95rem",
    fontWeight: "600",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    minWidth: "140px",
  },
  primary: {
    backgroundColor: "#790022",
    color: "#ffffff",
  },
  secondary: {
    backgroundColor: "#e5e7eb",
    color: "#374151",
  },
};
