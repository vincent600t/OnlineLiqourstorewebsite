import React from "react";
import { Link } from "react-router-dom";

function Login() {
  return (
    <div style={{ backgroundColor: "white", padding: "2rem" }}>
      <h1>Login Page</h1>
      <input type="text" placeholder="Username" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />
      <Link to="/categories">
        <button style={{ backgroundColor: "red", color: "white" }}>Login</button>
      </Link>{" "}
      <Link to="/register">
        <button style={{ backgroundColor: "black", color: "white" }}>Create Account</button>
      </Link>
    </div>
  );
}

export default Login;