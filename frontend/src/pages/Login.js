import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

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

    try {
      const response = await fetch("http://127.0.0.1:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        alert(data.error || "Login failed");
        return;
      }

      // Save JWT token and user info
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/categories");
    } catch (err) {
      console.error("Login error:", err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="login-container">
      {/* Logo */}
      <img src="/logo-removebg-preview.png" alt="Logo" className="login-logo" />

      {/* Navigation */}
      <div className="login-nav">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <p className="subtitle">Sign in to your account</p>

        <div style={{ marginBottom: 14 }}>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-label="Password"
          />
        </div>

        <div className="login-checkbox">
          <input
            type="checkbox"
            id="agreeLogin"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
          />
          <label htmlFor="agreeLogin">I agree I am 18yrs and above</label>
        </div>

        <button type="submit" disabled={!agreed} className="login-button">
          Login
        </button>

        <p>
          Don’t have an account? <Link to="/register">Register</Link>
        </p>
      </form>
    </div>
  );
}