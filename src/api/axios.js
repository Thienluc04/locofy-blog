import axios from "axios";

export default axios.create({
  // baseURL: "http://localhost:5500",
  baseURL: "https://server-locofy.glitch.me",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

export const axiosPrivate = axios.create({
  // baseURL: "http://localhost:4000",
  baseURL: "https://server-locofy.glitch.me",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
