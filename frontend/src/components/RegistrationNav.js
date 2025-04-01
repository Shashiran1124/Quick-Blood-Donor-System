import { useNavigate } from "react-router-dom";

const RegistrationNav = () => {
  const navigate = useNavigate(); // Use navigate for internal routing

  return (
    <nav
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2rem",
        backgroundColor: "#1a2a44",
        boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: "bold",
          color: "#333",
        }}
      >
        <span style={{ color: "#ff4d4f", marginRight: "0.5rem" }}>🩸</span>
        <span style={{ color: "#c3c3c3", fontSize: "13px" }}>Quick</span>
        <span style={{ color: "#8B0000", fontSize: "17px" }}>Blood</span>
      </div>
      <div style={{ display: "flex", gap: "2rem" }}>
        <button onClick={() => navigate("/")} style={navLinkStyle}>
          Home
        </button>
        <button onClick={() => navigate("/AllUsers")} style={navLinkStyle}>
          Donoers
        </button>
        <button onClick={() => navigate("/donations")} style={navLinkStyle}>
          Donations
        </button>
        <button onClick={() => navigate("/reports")} style={navLinkStyle}>
          Reports
        </button>
        <button onClick={() => navigate("/contact")} style={navLinkStyle}>
          Contact
        </button>
      </div>
    </nav>
  );
};

const navLinkStyle = {
  background: "none",
  border: "none",
  color: "#ffffff",
  fontWeight: "500",
  fontSize: "18px",
  cursor: "pointer",
  transition: "color 0.3s ease",
};

export default RegistrationNav;
