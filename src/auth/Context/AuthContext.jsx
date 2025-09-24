import React, {
  createContext,
  useState,
  useEffect,
  useContext,
  useRef,
  useCallback,
} from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import axios from "axios";

export const AuthContext = createContext();

const INACTIVITY_LIMIT = 15 * 60 * 1000; // 15 minutes

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const inactivityTimer = useRef(null);
  const navigate = useNavigate();

  // 🔹 Reset inactivity timer
  const resetInactivityTimer = useCallback(() => {
    if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    inactivityTimer.current = setTimeout(() => {
      console.warn("Logged out due to inactivity");
      handleLogout();
    }, INACTIVITY_LIMIT);
  }, []);

  // 🔹 Listen for user activity
  useEffect(() => {
    const events = ["mousemove", "keydown", "scroll", "click"];
    events.forEach((event) =>
      window.addEventListener(event, resetInactivityTimer)
    );

    resetInactivityTimer(); // start timer on mount

    return () => {
      events.forEach((event) =>
        window.removeEventListener(event, resetInactivityTimer)
      );
      if (inactivityTimer.current) clearTimeout(inactivityTimer.current);
    };
  }, [resetInactivityTimer]);

  // 🔹 On mount, load token if available
  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setAuth(token);
    }
  }, []);

  // 🔹 Handle login
  const handleLogin = (accessToken, refreshToken, user) => {
    localStorage.setItem("authToken", accessToken);
    localStorage.setItem("refreshToken", refreshToken);
    localStorage.setItem("userInfo", JSON.stringify(user));
    setAuth(accessToken);
  };

  // 🔹 Handle logout
  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    setAuth(null);
    navigate("/login");
  };

  // 🔹 Refresh token API call
  const refreshAuthToken = async () => {
    try {
      const refreshToken = localStorage.getItem("refreshToken");
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      if (!refreshToken || !userInfo?.id) {
        handleLogout();
        return;
      }

      const response = await axios.post(
        "http://10.11.5.23:5268/api/Auth/refresh-token",
        {
          userId: userInfo.id, // 👈 sending userId
          refreshToken: refreshToken, // 👈 sending refresh token
        }
      );

      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // Save and update state
      handleLogin(accessToken, newRefreshToken, userInfo);

      console.log("🔄 Token refreshed successfully");
      return accessToken;
    } catch (err) {
      console.error("❌ Refresh token failed", err);
      handleLogout();
    }
  };

  // 🔹 Axios interceptor to auto-refresh token on 401
  useEffect(() => {
    const interceptor = axios.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        if (
          error.response &&
          error.response.status === 401 &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;

          const newToken = await refreshAuthToken();
          if (newToken) {
            originalRequest.headers["Authorization"] = `Bearer ${newToken}`;
            return axios(originalRequest);
          }
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axios.interceptors.response.eject(interceptor);
    };
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, handleLogin, handleLogout, refreshAuthToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);