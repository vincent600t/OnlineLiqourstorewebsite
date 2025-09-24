import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e?.preventDefault();
    if (!email.trim() || !password.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Please enter a valid email address.");
      return;
    }
    if (!agreed) {
      alert("You must confirm you are 18 and above to proceed.");
      return;
    }
    navigate("/categories");
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <img
        src="/logo-removebg-preview.png"
        alt="Black and White Logo"
        className="login-logo"
      />

      {/* Navigation */}
      <div className="login-nav">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

      {/* Form */}
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <p className="subtitle">Sign in to your account</p>

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            aria-label="Email"
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            aria-label="Password"
          />
        </div>

        {/* Checkbox */}
        <div className="login-checkbox">
          <input
            id="agreeLogin"
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <label htmlFor="agreeLogin">I agree I am 18yrs and above</label>
        </div>

        {/* Button */}
        <button type="submit" disabled={!agreed} className="login-button">
          Login
        </button>

        <p>
          Don’t have an account?{" "}
          <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}
