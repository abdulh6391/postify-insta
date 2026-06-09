import React from "react";
import { NavLink } from "react-router";

const Nav = () => {
  return (
    <div className="flex items-center justify-around h-20 w-full bg-red-800">
      <NavLink to="/feed">Feed</NavLink>
      <NavLink to="/login">Login</NavLink>
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/create">Create Post</NavLink>
    </div>
  );
};

export default Nav;
