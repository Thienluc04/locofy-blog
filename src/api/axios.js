import axios from "axios";

export default axios.create({
  baseURL: "http://localhost:5500",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});

export const axiosPrivate = axios.create({
  baseURL: "http://localhost:4000",
  headers: {
    "Content-Type": "application/json",
    "Cache-Control": "no-cache",
  },
});
