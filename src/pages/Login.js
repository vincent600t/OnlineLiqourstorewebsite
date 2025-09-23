import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/*
  Login page:
  - centered card
  - title "Login" centered
  - subtitle "Sign in to your account"
  - labels above inputs
  - checkbox "I agree, I am 18 and above" aligned with inputs
  - bright red login button (#FF0000)
  - top-right small nav "Login  Register" (non-button looking links)
  - logo at top-right as well (public/logo.png) — ensure file exists
*/

const isValidEmail = (email) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

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

    // For now, fake success. In real app, call backend.
    navigate("/categories");
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#ffffff",
      fontFamily: "Inter, Arial, sans-serif",
      position: "relative",
      padding: "1rem"
    }}>
      {/* Logo top-right */}
      <img
        src="/logo.png"
        alt="Black and White Logo"
        style={{ position: "absolute", top: 20, right: 20, width: 72, height: "auto" }}
      />

      {/* top-right small nav (looks like text) */}
      <div style={{ position: "absolute", top: 28, right: 110, display: "flex", gap: 16, alignItems: "center" }}>
        <Link to="/login" style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontWeight: 600 }}>Login</Link>
        <Link to="/register" style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontWeight: 600 }}>Register</Link>
      </div>

      <form onSubmit={handleLogin} style={{
        width: "100%",
        maxWidth: 420,
        background: "#fff",
        padding: "2rem",
        borderRadius: 12,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
      }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#000", textAlign: "center", margin: 0 }}>Login</h2>
        <p style={{ fontSize: 14, color: "#111", textAlign: "center", marginTop: 8, marginBottom: 20 }}>Sign in to your account</p>

        {/* Email */}
        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 6, color: "#111" }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 15,
              outline: "none",
            }}
            aria-label="Email"
          />
        </div>

        {/* Password */}
        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 6, color: "#111" }}>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            style={{
              width: "100%",
              padding: "12px 14px",
              borderRadius: 8,
              border: "1px solid #ddd",
              fontSize: 15,
              outline: "none",
            }}
            aria-label="Password"
          />
        </div>

        {/* Checkbox inline with inputs */}
        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <input
            id="agreeLogin"
            type="checkbox"
            checked={agreed}
            onChange={() => setAgreed(!agreed)}
            style={{ width: 16, height: 16 }}
          />
          <label htmlFor="agreeLogin" style={{ fontSize: 13, color: "#111" }}>I agree, I am 18 and above</label>
        </div>

        {/* Login button */}
        <button
          type="submit"
          disabled={!agreed}
          style={{
            width: "100%",
            padding: "12px",
            backgroundColor: agreed ? "#ff0000" : "#ff9a9a",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            cursor: agreed ? "pointer" : "not-allowed",
            marginBottom: 14,
          }}
        >
          Login
        </button>

        <p style={{ textAlign: "center", fontSize: 13, color: "#111" }}>
          Don’t have an account?{" "}
          <Link to="/register" style={{ color: "#ff0000", textDecoration: "none", fontWeight: 600 }}>Register</Link>
        </p>
      </form>
    </div>
  );
}