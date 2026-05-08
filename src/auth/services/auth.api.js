import axios from "axios";

const api = axios.create({
  baseURL: "https://post-backend-293e.onrender.com",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  try {
    const payload = { username, email, password };
    console.log("Register payload:", payload);
    const response = await api.post("/api/v1/auth/register", payload);

    return response.data;
  } catch (err) {
    console.error("Register error:", err.response?.data || err.message);
    throw err;
  }
}

export async function login({ email, password }) {
  try {
    const response = await api.post("/api/v1/auth/login", {
      email,
      password,
    });

    return response.data;
  } catch (err) {
    console.error("Login error:", err.response?.data || err.message);
    throw err;
  }
}

export async function logout() {
  try {
    const response = await api.post("/api/v1/auth/logout");

    return response.data;
  } catch (err) {
    console.error("Logout error:", err.response?.data || err.message);
    throw err;
  }
}

export async function getMe() {
  try {
    const response = await api.get("/api/v1/auth/getMe");

    return response.data;
  } catch (err) {
    console.error("Get profile error:", err.response?.data || err.message);
    throw err;
  }
}
