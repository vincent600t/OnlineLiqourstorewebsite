import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Contact.css"; // ✅ Import CSS file

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      alert("Please fill all fields.");
      return;
    }
    alert("Message submitted. We'll get back to you.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <div className="contact-page">
      {/* ✅ Logo moved to left side */}
      <img src="/logo-removebg-preview.png" alt="logo" className="contact-logo" />

      <div className="contact-nav">
        <Link to="/categories">Home</Link>
        <Link to="/cart">Cart</Link>
      </div>

      <div className="contact-container">
        <h1>Contact Us</h1>
        <form onSubmit={submit} className="contact-form">
          <div>
            <label>Your Name</label>
            <input
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          </div>
          <div>
            <label>Email</label>
            <input
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          </div>
          <div>
            <label>Message</label>
            <textarea
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              rows={6}
            />
          </div>

          <div className="contact-buttons">
            <button type="submit">Submit</button>
            <Link to="/categories" className="back-btn">Back to Categories</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
