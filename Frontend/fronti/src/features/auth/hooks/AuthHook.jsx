import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { login, register } from "../services/authApi";

export const AuthHook = () => {
  const context = useContext(AuthContext);
  const { user, loading, setUser, setLoading } = context;

  const handleRegister = async (username, email, password) => {
    setLoading(true);
    const response = await register(username, email, password);
    setUser(response.user);
    setLoading(false);
  };

  const handleLogin = async (username, password) => {
    setLoading(true);
    const response = await login(username, password);
    setUser(response.user);
    setLoading(false);
  };

  return { user, loading, handleRegister, handleLogin };
};
