import { useState } from "react";
import { useNavigate, Link } from "react-router";
import { useAuth } from "../hooks/useAuth";

function Register() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { loading, handleRegister } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleRegister({ username, email, password });
    navigate("/");
  };

  if (loading) {
    return (
      <main>
        <h1>Loading.......</h1>
      </main>
    );
  }
  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.heading}>Register</h1>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
            type="text"
            placeholder="Enter your username"
            style={styles.input}
          />

          <input
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            type="email"
            placeholder="Enter your email"
            style={styles.input}
          />

          <input
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
            type="password"
            placeholder="Enter your password"
            style={styles.input}
          />

          <button type="submit" style={styles.button}>
            Create Account
          </button>
        </form>

        <p>
          Already have an account? <Link to={"/login"}>Login</Link>
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },

  card: {
    width: "350px",
    padding: "30px",
    borderRadius: "10px",
    backgroundColor: "white",
    boxShadow: "0 0 10px rgba(0,0,0,0.1)",
  },

  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },

  input: {
    padding: "12px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    fontSize: "16px",
  },

  button: {
    padding: "12px",
    border: "none",
    borderRadius: "5px",
    backgroundColor: "black",
    color: "white",
    fontSize: "16px",
    cursor: "pointer",
  },
};

export default Register;
