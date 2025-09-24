 import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./Categories.css"; // ensures header styles are applied

export default function Cart() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const raw = localStorage.getItem("bw_cart");
    setItems(raw ? JSON.parse(raw) : []);
  }, []);

  const subtotal = items.reduce((s, it) => s + (it.price || 0), 0);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      
      {/* === HEADER UPDATED TO MATCH CATEGORIES === */}
      <header className="header">
        <img src="/logo-removebg-preview.png" alt="Logo" className="header-logo" />
        <nav className="header-nav">
          <Link to="/categories">Home</Link>
          <Link to="/cart">Cart</Link>
        </nav>
      </header>
      {/* === END HEADER === */}

      <div style={{ maxWidth: 720, margin: "0 auto", paddingTop: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Your Cart</h1>
        {items.length === 0 ? (
          <p>Your cart is empty.</p>
        ) : (
          <div style={{ display: "grid", gap: 12, marginTop: 18 }}>
            {items.map((it, i) => (
              <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: 12, border: "1px solid #ddd", borderRadius: 8 }}>
                <span>{it.name}</span>
                <span>${it.price.toFixed(2)}</span>
              </div>
            ))}
            <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700 }}>
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
          </div>
        )}
        <div style={{ marginTop: 18 }}>
          <Link to="/checkout" style={{ display: "inline-block", padding: "10px 14px", background: "#000", color: "#fff", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>Proceed to Checkout</Link>
        </div>
      </div>
    </div>
  );
}