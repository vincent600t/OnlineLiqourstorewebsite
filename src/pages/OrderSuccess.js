import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

/*
  OrderSuccess reads the last order from localStorage bw_last_order and displays it.
*/

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("bw_last_order");
    setOrder(raw ? JSON.parse(raw) : null);
  }, []);

  if (!order) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "Inter, Arial, sans-serif" }}>
        <div style={{ textAlign: "center" }}>
          <h2>No recent order found</h2>
          <Link to="/categories" style={{ color: "#ff0000", textDecoration: "none" }}>Continue shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      <img src="/logo.png" alt="logo" style={{ position: "absolute", top: 20, right: 20, width: 72 }} />

      <div style={{ maxWidth: 760, margin: "0 auto", paddingTop: 40, textAlign: "center" }}>
        <div style={{ fontSize: 64, color: "#22c55e" }}>✔</div>
        <h1 style={{ fontSize: 28, fontWeight: 800 }}>Order Successful!</h1>
        <p style={{ color: "#444", marginTop: 8 }}>Thank you — your order has been placed.</p>

        <div style={{ marginTop: 24, textAlign: "left", background: "#fafafa", padding: 16, borderRadius: 8 }}>
          <div style={{ marginBottom: 8 }}><strong>Order Number:</strong> {order.id}</div>
          <div style={{ marginBottom: 8 }}><strong>Delivery:</strong> {order.delivery}</div>
          <div style={{ marginBottom: 8 }}><strong>Total Paid:</strong> ${order.total.toFixed(2)}</div>

          <div style={{ marginTop: 10 }}>
            <strong>Items</strong>
            <ul>
              {order.items.map((it, i) => <li key={i}>{it.name} — ${it.price.toFixed(2)}</li>)}
            </ul>
          </div>
        </div>

        <div style={{ marginTop: 20, display: "flex", justifyContent: "center", gap: 12 }}>
          <Link to="/categories" style={{ padding: "10px 14px", background: "#ff0000", color: "#fff", borderRadius: 8, textDecoration: "none", fontWeight: 700 }}>Continue Shopping</Link>
          <Link to="/cart" style={{ padding: "10px 14px", background: "#fff", color: "#000", borderRadius: 8, textDecoration: "none", border: "1px solid #000" }}>View Cart</Link>
        </div>
      </div>
    </div>
  );
}