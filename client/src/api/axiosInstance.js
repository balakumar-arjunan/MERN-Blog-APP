import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "/api", // Uses Vite proxy
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // If your API requires credentials (cookies, tokens)
});

export default axiosInstance;
