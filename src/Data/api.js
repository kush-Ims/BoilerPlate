// src/services/api.js
import axios from "axios";

const apiClient = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Example: fetch todo list
export async function fetchItems() {
  try {
    const response = await apiClient.get("/todos");
    return response.data;
  } catch (error) {
    console.error("Error fetching items:", error);
    throw error;
  }
}

export default apiClient;
