import React from "react";
import { Link } from "react-router-dom";

function Register() {
  return (
    <div style={{ backgroundColor: "white", padding: "2rem" }}>
      <h1>Register Page</h1>
      <input type="text" placeholder="Full Name" /><br /><br />
      <input type="email" placeholder="Email" /><br /><br />
      <input type="password" placeholder="Password" /><br /><br />
      <Link to="/categories">
        <button style={{ backgroundColor: "black", color: "white" }}>Create Account</button>
      </Link>{" "}
      <Link to="/">
        <button style={{ backgroundColor: "red", color: "white" }}>Back to Login</button>
      </Link>
    </div>
  );
}

export default Register;


