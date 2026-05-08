import { useContext, useEffect } from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/auth.api";

export const useAuth = () => {
  const context = useContext(AuthContext);
  const { user, setUser, loading, setLoading } = context;

  const handleLogin = async ({ email, password }) => {
    setLoading(true);
    try {
      const data = await login({ email, password });
      setUser(data.user);
      return true;
    } catch (err) {
      console.error("Login failed:", err);
      alert(err.response?.data?.message || "Login failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data.user);
      return true;
    } catch (err) {
      console.error("Signup failed:", err);
      alert(err.response?.data?.message || "Sign up failed. Please try again.");
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      await logout();
      setUser(null);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data.user);
      } catch (err) {
        console.error(
          "Failed to restore user session:",
          err.response?.data || err.message,
        );
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    getAndSetUser();
  }, [setLoading, setUser]);

  return { user, loading, handleRegister, handleLogin, handleLogout };
};
