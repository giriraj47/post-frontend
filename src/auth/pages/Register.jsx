import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, handleRegister } = useAuth();

  useEffect(() => {
    const link = document.createElement("link");
    link.href =
      "https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap";
    link.rel = "stylesheet";
    document.head.appendChild(link);
    return () => document.head.removeChild(link);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await handleRegister({ username, email, password });
    if (success) {
      navigate("/");
    }
  };

  if (loading) {
    return (
      <div style={styles.container}>
        <p style={styles.loadingText}>Loading…</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        {/* <div style={styles.brandMark}>P</div> */}
        <h1 style={styles.heading}>Create an account</h1>
        <p style={styles.subheading}>Join Posty and start sharing</p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.fieldGroup}>
            <label htmlFor="username" style={styles.label}>Username</label>
            <input
              id="username"
              name="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              type="text"
              placeholder="yourname"
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) =>
                Object.assign(e.target.style, {
                  borderColor: "#E2E1DC",
                  boxShadow: "none",
                })
              }
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="email" style={styles.label}>Email</label>
            <input
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="you@example.com"
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) =>
                Object.assign(e.target.style, {
                  borderColor: "#E2E1DC",
                  boxShadow: "none",
                })
              }
            />
          </div>

          <div style={styles.fieldGroup}>
            <label htmlFor="password" style={styles.label}>Password</label>
            <input
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="••••••••"
              style={styles.input}
              onFocus={(e) => Object.assign(e.target.style, styles.inputFocus)}
              onBlur={(e) =>
                Object.assign(e.target.style, {
                  borderColor: "#E2E1DC",
                  boxShadow: "none",
                })
              }
            />
          </div>

          <button
            type="submit"
            style={styles.button}
            onMouseEnter={(e) => (e.target.style.backgroundColor = "#B05525")}
            onMouseLeave={(e) => (e.target.style.backgroundColor = "#C9602E")}
          >
            Create account
          </button>
        </form>

        <p style={styles.footerText}>
          Already have an account?{" "}
          <Link to="/login" style={styles.link}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

const font = "'Plus Jakarta Sans', sans-serif";

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F4F0",
    fontFamily: font,
    padding: "24px",
  },
  loadingText: {
    fontFamily: font,
    color: "#6B6A65",
    fontSize: "15px",
  },
  card: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "#FFFFFF",
    border: "1px solid #E2E1DC",
    borderRadius: "16px",
    padding: "40px 36px",
  },
  brandMark: {
    width: "40px",
    height: "40px",
    backgroundColor: "#C9602E",
    color: "white",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "18px",
    fontWeight: "700",
    marginBottom: "24px",
    fontFamily: font,
  },
  heading: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#1C1B18",
    margin: "0 0 6px 0",
    fontFamily: font,
  },
  subheading: {
    fontSize: "14px",
    color: "#6B6A65",
    margin: "0 0 28px 0",
    fontFamily: font,
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },
  fieldGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },
  label: {
    fontSize: "13px",
    fontWeight: "600",
    color: "#1C1B18",
    fontFamily: font,
  },
  input: {
    padding: "11px 14px",
    borderRadius: "8px",
    border: "1px solid #E2E1DC",
    fontSize: "14px",
    fontFamily: font,
    color: "#1C1B18",
    backgroundColor: "#FAFAF8",
    outline: "none",
    transition: "border-color 0.15s, box-shadow 0.15s",
  },
  inputFocus: {
    borderColor: "#C9602E",
    boxShadow: "0 0 0 3px rgba(201,96,46,0.12)",
  },
  button: {
    marginTop: "4px",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#C9602E",
    color: "white",
    fontSize: "14px",
    fontWeight: "600",
    fontFamily: font,
    cursor: "pointer",
    transition: "background-color 0.15s",
  },
  footerText: {
    marginTop: "20px",
    textAlign: "center",
    fontSize: "13px",
    color: "#6B6A65",
    fontFamily: font,
  },
  link: {
    color: "#C9602E",
    fontWeight: "600",
    textDecoration: "none",
  },
};

export default Register;
