import axios from "axios";

const API_URL = "http://10.11.5.23:5268/api/Auth";

export const login = async (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

export const logout = () => {
  localStorage.removeItem("authToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("userInfo");
};
