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
      <h1 style={styles.logo}>Posty</h1>

      <div style={styles.rightSection}>
        <button type="button" style={styles.logoutButton} onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  );
}

const styles = {
  navbar: {
    height: "70px",
    padding: "0 40px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#111",
    color: "white",
  },

  logo: {
    fontSize: "28px",
    fontWeight: "bold",
    margin: 0,
    letterSpacing: "1px",
  },

  rightSection: {
    display: "flex",
    gap: "15px",
  },

  adminButton: {
    padding: "10px 18px",
    border: "1px solid white",
    borderRadius: "6px",
    backgroundColor: "transparent",
    color: "white",
    cursor: "pointer",
    fontSize: "14px",
  },

  logoutButton: {
    padding: "10px 18px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "white",
    color: "#111",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "bold",
  },
};

export default Navbar;
