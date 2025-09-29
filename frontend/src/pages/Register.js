import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Register.css";

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
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

    try {
      const res = await fetch("http://127.0.0.1:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password })
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Registration failed");
        return;
      }

      alert("Account created successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Server error. Please try again later.");
    }
  };

  return (
    <div className="register-container">
      <img src="/logo-removebg-preview.png" alt="Logo" className="register-logo" />

      <div className="register-nav">
        <Link to="/categories">Home</Link>
        <Link to="/categories">Categories</Link>
        <Link to="/checkout">Checkout</Link>
      </div>

      <form onSubmit={handleCreate} className="register-form">
        <h2>Register</h2>

        <div style={{ marginBottom: 14 }}>
          <label>Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} type="text" />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" />
        </div>

        <div style={{ marginBottom: 14 }}>
          <label>Password</label>
          <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" />
        </div>

        <div style={{ marginBottom: 12 }}>
          <label>Confirm Password</label>
          <input value={confirm} onChange={(e) => setConfirm(e.target.value)} type="password" />
        </div>

        <div className="register-checkbox">
          <input type="checkbox" id="agreeReg" checked={agreed} onChange={() => setAgreed(!agreed)} />
          <label htmlFor="agreeReg">I agree, I am 18 and above</label>
        </div>

        <button type="submit" disabled={!agreed} className="register-button">
          Create Account
        </button>

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
}