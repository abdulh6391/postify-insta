import axios from "axios";
const api = axios.create({
  // Yahan bhi wahi dynamic variable use karein
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:3000/api",
  withCredentials: true,
});

export async function register(username, email, password) {
  const response = await api.post("/register", {
    username,
    email,
    password,
  });
  return response.data;
}

export async function login(username, password) {
  const response = await api.post("/login", {
    username,
    password,
  });
  return response.data;
}

export async function getMe() {
  const response = await api.get("/get-me");
  return response.data;
}
