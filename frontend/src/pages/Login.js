import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ import axios
import "./Login.css";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
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

    try {
      // ✅ use axios.post instead of fetch
      const response = await axios.post(
        "http://127.0.0.1:5000/api/auth/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = response.data;

      // Save JWT token to localStorage
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("user", JSON.stringify(data.user));

      navigate("/categories");
    } catch (err) {
      // axios throws for non-2xx responses
      if (err.response) {
        alert(err.response.data.error || "Login failed");
      } else {
        alert("An error occurred. Please try again.");
      }
      console.error(err);
    }
  };

  return (
    <div className="login-container">
      <img
        src="/logo-removebg-preview.png"
        alt="Black and White Logo"
        className="login-logo"
      />

      <div className="login-nav">
        <Link to="/login">Login</Link>
        <Link to="/register">Register</Link>
      </div>

      <form onSubmit={handleLogin} className="login-form">
        <h2>Login</h2>
        <p className="subtitle">Sign in to your account</p>

        <div style={{ marginBottom: 14 }}>
          <label>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            aria-label="Email"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            aria-label="Password"
          />
        </div>

        <div className="login-checkbox">
          <input
            id="agreeLogin"
            type="checkbox"
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
