import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

const AuthContext = createContext(null);
const API = process.env.REACT_APP_BACKEND_URL || "http://localhost:5000";

export function formatApiErrorDetail(detail) {
  if (detail == null) return "Something went wrong. Please try again.";
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) return detail.map((e) => (e && typeof e.msg === "string" ? e.msg : JSON.stringify(e))).filter(Boolean).join(" ");
  if (detail && typeof detail.msg === "string") return detail.msg;
  return String(detail);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    axios.get(`${API}/api/merchant/auth/me`, { withCredentials: true })
      .then((res) => setUser(res.data))
      .catch(() => setUser(false));
  }, []);

  const login = async (email, password) => {
    // Note: The backend currently only supports OAuth. Email/password is a mock.
    throw new Error("Email/Password login is not supported by the backend. Please use Google or Discord.");
  };

  const register = async (name, email, password) => {
    // Note: The backend currently only supports OAuth. Email/password is a mock.
    throw new Error("Email/Password registration is not supported by the backend. Please use Google or Discord.");
  };

  const logout = async () => {
    await axios.post(`${API}/api/merchant/auth/logout`, {}, { withCredentials: true });
    setUser(false);
  };

  return <AuthContext.Provider value={{ user, setUser, login, register, logout }}>{children}</AuthContext.Provider>;
}

export async function apiFetch(path, options = {}) {
  try {
    return await axios({ url: `${API}${path}`, withCredentials: true, ...options });
  } catch (err) {
    if (err.response?.status === 401) {
      // Refresh token logic isn't implemented on backend currently, just throw
      throw err;
    }
    throw err;
  }
}

export const useAuth = () => useContext(AuthContext);
