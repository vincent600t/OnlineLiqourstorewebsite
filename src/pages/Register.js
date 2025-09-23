import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/*
  Register page:
  - white background, centered card
  - title "Register" aligned left with the inputs (not centered)
  - labels above: Name, Email, Password, Confirm Password
  - password inputs type="password" (dotted)
  - black Create Account button, disabled until checkbox is checked + validations
  - top-right links: Home | Categories | Checkout (they look like text links)
  - logo at top-right (/logo.png)
*/

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e?.preventDefault();

    if (!name.trim() || !email.trim() || !password.trim() || !confirm.trim()) {
      alert("Please fill in all fields.");
      return;
    }
    if (!isValidEmail(email)) {
      alert("Enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      alert("Password should be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      alert("Passwords do not match.");
      return;
    }
    if (!agreed) {
      alert("You must agree that you are 18 and above.");
      return;
    }

    // fake account creation
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

      {/* top-right small nav */}
      <div style={{ position: "absolute", top: 28, right: 110, display: "flex", gap: 16, alignItems: "center" }}>
        <Link to="/categories" style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontWeight: 600 }}>Home</Link>
        <Link to="/categories" style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontWeight: 600 }}>Categories</Link>
        <Link to="/checkout" style={{ textDecoration: "none", color: "#000", cursor: "pointer", fontWeight: 600 }}>Checkout</Link>
      </div>

      <form onSubmit={handleCreate} style={{
        width: "100%",
        maxWidth: 420,
        background: "#fff",
        padding: "2rem",
        borderRadius: 12,
        boxShadow: "0 6px 20px rgba(0,0,0,0.08)"
      }}>
        <h2 style={{ fontSize: 28, fontWeight: 700, color: "#000", textAlign: "left", margin: 0, marginBottom: 16 }}>Register</h2>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            type="text"
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 15 }}
            aria-label="Name"
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 15 }}
            aria-label="Email"
          />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 15 }}
            aria-label="Password"
          />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label style={{ display: "block", fontSize: 13, marginBottom: 6 }}>Confirm Password</label>
          <input
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            type="password"
            style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid #ddd", fontSize: 15 }}
            aria-label="Confirm Password"
          />
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
          <input type="checkbox" id="agreeReg" checked={agreed} onChange={() => setAgreed(!agreed)} style={{ width: 16, height: 16 }} />
          <label htmlFor="agreeReg" style={{ fontSize: 13 }}>I agree, I am 18 and above</label>
        </div>

        <button
          type="submit"
          disabled={!agreed}
          style={{
            width: "100%",
            padding: 12,
            backgroundColor: agreed ? "#000000" : "#333333",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            fontWeight: 700,
            fontSize: 15,
            cursor: agreed ? "pointer" : "not-allowed",
            marginBottom: 12
          }}
        >
          Create Account
        </button>

        <p style={{ textAlign: "center", fontSize: 13 }}>Already have an account? <Link to="/login" style={{ color: "#ff0000", textDecoration: "none" }}>Login</Link></p>
      </form>
    </div>
  );
}