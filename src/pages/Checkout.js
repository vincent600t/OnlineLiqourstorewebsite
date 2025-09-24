import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/*
  Checkout:
  - collects shipping details (simple)
  - choose delivery (standard/express)
  - shows order summary from localStorage
  - Place Order -> save order details to localStorage "bw_last_order" and navigate to /order-success
*/

export default function Checkout() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [delivery, setDelivery] = useState("standard");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });

  useEffect(() => {
    const raw = localStorage.getItem("bw_cart");
    setItems(raw ? JSON.parse(raw) : []);
  }, []);

  const subtotal = items.reduce((s, it) => s + (it.price || 0), 0);
  const deliveryFee = delivery === "express" ? 3.39 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrder = () => {
    if (!form.name.trim() || !form.email.trim() || !form.address.trim()) {
      alert("Please fill in name, email and address.");
      return;
    }
    const order = {
      id: "BW" + Math.floor(Math.random() * 900000 + 100000),
      items,
      subtotal,
      delivery: delivery === "express" ? "Express" : "Standard",
      deliveryFee,
      total,
      customer: form,
      date: new Date().toISOString()
    };
    localStorage.setItem("bw_last_order", JSON.stringify(order));
    localStorage.removeItem("bw_cart");
    navigate("/order-success");
  };

  return (
    <div style={{ minHeight: "100vh", background: "#fff", padding: 24, fontFamily: "Inter, Arial, sans-serif" }}>
      <img src="/logo.png" alt="logo" style={{ position: "absolute", top: 20, right: 20, width: 72 }} />
      <div style={{ position: "absolute", top: 28, right: 110, display: "flex", gap: 16 }}>
        <Link to="/categories" style={{ textDecoration: "none", color: "#000", fontWeight: 600 }}>Home</Link>
        <Link to="/cart" style={{ textDecoration: "none", color: "#000", fontWeight: 600 }}>Cart</Link>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700 }}>Checkout</h1>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 24, marginTop: 18 }}>
          {/* shipping */}
          <div>
            <h2 style={{ fontSize: 18, fontWeight: 700 }}>Shipping Information</h2>
            <div style={{ display: "grid", gap: 10, marginTop: 12 }}>
              <input placeholder="Full Name" value={form.name} onChange={(e)=>setForm({...form, name:e.target.value})} style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
              <input placeholder="Email Address" value={form.email} onChange={(e)=>setForm({...form, email:e.target.value})} style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
              <input placeholder="Phone Number" value={form.phone} onChange={(e)=>setForm({...form, phone:e.target.value})} style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
              <input placeholder="Street Address" value={form.address} onChange={(e)=>setForm({...form, address:e.target.value})} style={{ padding: 10, borderRadius: 8, border: "1px solid #ddd" }} />
            </div>

            <div style={{ marginTop: 18 }}>
              <h3 style={{ fontWeight: 700 }}>Delivery Options</h3>
              <label style={{ display: "block", marginTop: 8 }}>
                <input type="radio" checked={delivery==="standard"} onChange={()=>setDelivery("standard")} /> Standard Delivery (3–5 days) — Free
              </label>
              <label style={{ display: "block", marginTop: 6 }}>
                <input type="radio" checked={delivery==="express"} onChange={()=>setDelivery("express")} /> Express Delivery (1–2 days) — $3.39
              </label>
            </div>
          </div>

          {/* order summary */}
          <div style={{ border: "1px solid #eee", padding: 16, borderRadius: 8 }}>
            <h3 style={{ marginTop: 0, fontWeight: 700 }}>Order Summary</h3>
            <div style={{ marginTop: 12 }}>
              {items.length === 0 ? <p>No items.</p> : items.map((it, i) => (
                <div key={i} style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <span>{it.name}</span><span>${it.price.toFixed(2)}</span>
                </div>
              ))}
            </div>
            <hr style={{ margin: "12px 0" }} />
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span>Subtotal</span><strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
              <span>Delivery</span><strong>${deliveryFee.toFixed(2)}</strong>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 8, fontWeight: 800 }}>
              <span>Total</span><span>${total.toFixed(2)}</span>
            </div>

            <div style={{ marginTop: 12 }}>
              <button onClick={handlePlaceOrder} style={{ width: "100%", background: "#000", color: "#fff", padding: 10, borderRadius: 8, border: "none", fontWeight: 700 }}>Place Order</button>
              <Link to="/cart" style={{ display: "block", marginTop: 10, textAlign: "center", padding: "8px 12px", borderRadius: 8, border: "1px solid #000", color: "#000", textDecoration: "none" }}>Back to Cart</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}