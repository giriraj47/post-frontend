import { useNavigate } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Navbar() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const onLogout = async () => {
    await handleLogout();
    navigate("/login");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.logo}>
        <span style={styles.logoMark}>P</span>
        <span style={styles.logoText}>Posty</span>
      </div>

      <button
        type="button"
        style={styles.logoutButton}
        onClick={onLogout}
        onMouseEnter={(e) => {
          e.target.style.backgroundColor = "rgba(255,255,255,0.1)";
        }}
        onMouseLeave={(e) => {
          e.target.style.backgroundColor = "transparent";
        }}
      >
        Sign out
      </button>
    </nav>
  );
}

const font = "'Plus Jakarta Sans', sans-serif";

const styles = {
  navbar: {
    height: "64px",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#1C1B18",
    borderBottom: "1px solid rgba(255,255,255,0.06)",
    fontFamily: font,
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  logoMark: {
    width: "30px",
    height: "30px",
    backgroundColor: "#C9602E",
    color: "white",
    borderRadius: "7px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "14px",
    fontWeight: "700",
    fontFamily: font,
  },
  logoText: {
    fontSize: "17px",
    fontWeight: "700",
    color: "white",
    letterSpacing: "0.3px",
    fontFamily: font,
  },
  logoutButton: {
    padding: "8px 16px",
    border: "1px solid rgba(255,255,255,0.15)",
    borderRadius: "7px",
    backgroundColor: "transparent",
    color: "rgba(255,255,255,0.75)",
    cursor: "pointer",
    fontSize: "13px",
    fontWeight: "500",
    fontFamily: font,
    transition: "background-color 0.15s",
  },
};

export default Navbar;
