import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5500",
  baseURL: "https://locofy-server.onrender.com",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

export const axiosPrivate = axios.create({
  // baseURL: "http://localhost:4000/api",
  baseURL: "https://locofy-server.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
