import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthHook } from "../hooks/AuthHook";
import Nav from "../../shared/Nav";

const Login = () => {
  const { user, loading, handleLogin } = AuthHook();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    await handleLogin(username, password);
    console.log("USer Logged in");
    navigate("/create");
  };

  if (loading) {
    return <main>Loading....</main>;
  }
  return (
    <main>
      <Nav />
      <div>
        <main className="flex items-center justify-center min-h-screen">
          <div className="form-container">
            <h1 className="text-3xl">Login</h1>
            <form
              onSubmit={handleSubmit}
              className="flex flex-col gap-10 w-100 h-100 bg-gray-600 p-10 rounded-2xl"
            >
              <input
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                className="bg-green-500 border-none outline-none py-4 rounded-2xl"
                type="text"
                name="username"
                placeholder="Enter Username"
              />
              <input
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                className="bg-green-500 border-none outline-none py-4 rounded-2xl"
                type="text"
                name="password"
                placeholder="Enter Password"
              />
              <button className="bg-red-900 py-2 rounded-2xl">Login</button>
            </form>
            <p>
              Dont't have an account{" "}
              <Link to="/register" className="text-red-900 underline">
                Register
              </Link>
            </p>
          </div>
        </main>
      </div>
    </main>
  );
};

export default Login;
