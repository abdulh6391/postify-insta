import axios from "axios";
const getBaseURL = () => {
  if (
    typeof import.meta !== "undefined" &&
    import.meta.env &&
    import.meta.env.VITE_API_BASE_URL
  ) {
    return import.meta.env.VITE_API_BASE_URL;
  }
  return "http://localhost:3000/api";
};

const api = axios.create({
  baseURL: getBaseURL(),
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
