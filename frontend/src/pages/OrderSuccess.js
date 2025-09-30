import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./OrderSuccess.css"; // ✅ import CSS
import Footer from "./Footer";

export default function OrderSuccess() {
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const raw = localStorage.getItem("bw_last_order");
    setOrder(raw ? JSON.parse(raw) : null);
  }, []);

  if (!order) {
    return (
      <div className="order-empty">
        <div className="order-empty-box">
          <h2>No recent order found</h2>
          <Link to="/categories" className="btn-link">Continue shopping</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="order-success">
      <img src="/logo-removebg-preview.png" alt="logo" className="order-logo" />

      <div className="order-container">
        <div className="order-icon">
          <img src="/accept.png" alt="success" className="check-icon" />
        </div>
        <h1 className="order-title">Order Successful!</h1>
        <p className="order-subtitle">Thank you — your order has been placed.</p>

        <div className="order-details">
          <div><strong>Order Number:</strong> {order.id}</div>
          <div><strong>Delivery:</strong> {order.delivery}</div>
          <div><strong>Total Paid:</strong> ${order.total.toFixed(2)}</div>

          <div className="order-items">
            <strong>Items</strong>
            <ul>
              {order.items.map((it, i) => (
                <li key={i}>{it.name} — ${it.price.toFixed(2)}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="order-actions">
          <Link to="/categories" className="btn btn-primary">Continue Shopping</Link>
          <Link to="/cart" className="btn btn-outline">View Cart</Link>
        </div>
      </div>
    </div>
  );
}
