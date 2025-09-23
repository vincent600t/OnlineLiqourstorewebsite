import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/*
  Cart reads items from localStorage "bw_cart".
  Displays list, subtotal, and Checkout button.
*/

export default function Cart() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const raw = localStorage.getItem("bw_cart");
    setItems(raw ? JSON.parse(raw) : []);
  }, []);

  const subtotal = items.reduce((s, it) => s + (it.price || 0), 0);

  const handleCheckout = () => {
    if (items.length === 0) {
      alert("Your cart is empty.");
      return;
    }
    navigate("/checkout");
  };

  const handleClear = () => {
    localStorage.removeItem("bw_cart");
    setItems([]);
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      <img src="/logo.png" alt="logo" style={{ position: "absolute", top: 20, right: 20, width: 72 }} />
      <div style={{ position: "absolute", top: 28, right: 110, display: "flex", gap: 16 }}>
        <Link to="/categories" style={{ textDecoration: "none", color: "#000", fontWeight: 600 }}>Home</Link>
        <Link to="/contact" style={{ textDecoration: "none", color: "#000", fontWeight: 600 }}>Contact</Link>
      </div>

      <div style={{ maxWidth: 900, margin: "0 auto", paddingTop: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Your Cart</h1>

        {items.length === 0 ? (
          <div style={{ marginTop: 24 }}>
            <p>Your cart is empty.</p>
            <Link to="/categories" style={{ color: "#ff0000", textDecoration: "none" }}>Go to categories</Link>
          </div>
        ) : (
          <div style={{ marginTop: 18 }}>
            <div style={{ display: "grid", gap: 12 }}>
              {items.map((it, i) => (
                <div key={i} style={{ display: "flex", gap: 12, alignItems: "center", border: "1px solid #eee", padding: 12, borderRadius: 8 }}>
                  <img src={it.image} alt={it.name} style={{ width: 100, height: 70, objectFit: "cover", borderRadius: 6 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                      <strong>{it.name}</strong>
                      <span style={{ fontWeight: 700 }}>${it.price.toFixed(2)}</span>
                    </div>
                    <div style={{ marginTop: 6, fontSize: 13 }}>Qty: 1</div>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ marginTop: 20, textAlign: "right" }}>
              <div style={{ fontSize: 18, fontWeight: 700 }}>Subtotal: ${subtotal.toFixed(2)}</div>
              <div style={{ marginTop: 12, display: "flex", justifyContent: "flex-end", gap: 12 }}>
                <button onClick={handleClear} style={{ background: "#fff", border: "1px solid #000", padding: "8px 14px", borderRadius: 8 }}>Clear</button>
                <button onClick={handleCheckout} style={{ background: "#ff0000", color: "#fff", border: "none", padding: "8px 14px", borderRadius: 8 }}>Checkout</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}