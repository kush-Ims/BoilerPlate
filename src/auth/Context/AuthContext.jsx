import React, { createContext, useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // npm install jwt-decode

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode(token.replace("Bearer ", ""));
        const currentTime = Date.now() / 1000;

        if (decoded.exp < currentTime) {
          handleLogout(); // expired → logout
        } else {
          setAuth(token);

          // Auto logout when token expires
          const timeout = (decoded.exp - currentTime) * 1000;
          setTimeout(() => handleLogout(), timeout);
        }
      } catch (err) {
        handleLogout();
      }
    }
  }, []);

  const handleLogin = (token) => {
    localStorage.setItem("authToken", token);
    setAuth(token);

    const decoded = jwtDecode(token.replace("Bearer ", ""));
    const currentTime = Date.now() / 1000;
    const timeout = (decoded.exp - currentTime) * 1000;

    setTimeout(() => handleLogout(), timeout);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("refreshToken");
    localStorage.removeItem("userInfo");
    setAuth(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ auth, handleLogin, handleLogout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};