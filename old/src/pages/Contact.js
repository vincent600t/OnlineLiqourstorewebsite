import React, { useState } from "react";
import { Link } from "react-router-dom";

/*
  Simple Contact page with form, submit shows alert and returns to categories
*/

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
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      <img src="/logo.png" alt="logo" style={{ position: "absolute", top: 20, right: 20, width: 72 }} />
      <div style={{ position: "absolute", top: 28, right: 110, display: "flex", gap: 16 }}>
        <Link to="/categories" style={{ textDecoration: "none", color: "#000", fontWeight: 600 }}>Home</Link>
        <Link to="/cart" style={{ textDecoration: "none", color: "#000", fontWeight: 600 }}>Cart</Link>
      </div>

      <div style={{ maxWidth: 720, margin: "0 auto", paddingTop: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Contact Us</h1>
        <form onSubmit={submit} style={{ marginTop: 18, display: "grid", gap: 12 }}>
          <div>
            <label style={{ display: "block", marginBottom: 6 }}>Your Name</label>
            <input value={form.name} onChange={(e)=>setForm({...form, name: e.target.value})} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 6 }}>Email</label>
            <input value={form.email} onChange={(e)=>setForm({...form, email: e.target.value})} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
          </div>
          <div>
            <label style={{ display: "block", marginBottom: 6 }}>Message</label>
            <textarea value={form.message} onChange={(e)=>setForm({...form, message: e.target.value})} rows={6} style={{ width: "100%", padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
          </div>

          <div style={{ display: "flex", gap: 12 }}>
            <button type="submit" style={{ background: "#ff0000", color: "#fff", padding: "10px 14px", borderRadius: 8, border: "none", fontWeight: 700 }}>Submit</button>
            <Link to="/categories" style={{ padding: "10px 14px", border: "1px solid #000", borderRadius: 8, textDecoration: "none", color: "#000" }}>Back to Categories</Link>
          </div>
        </form>
      </div>
    </div>
  );
}