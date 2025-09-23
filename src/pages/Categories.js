import React from "react";
import { Link, useNavigate } from "react-router-dom";

/*
  Categories page:
  - grid of sample categories/products (image placeholders)
  - clicking a product adds a sample item to cart (localStorage) then navigates to cart
  - top-right: logo + nav
*/

const sampleProducts = [
  { id: "whiskey-1", name: "Classic Whiskey", price: 45.00, image: "https://via.placeholder.com/300x200?text=Whiskey" },
  { id: "vodka-1", name: "Smooth Vodka", price: 30.00, image: "https://via.placeholder.com/300x200?text=Vodka" },
  { id: "wine-1", name: "Red Wine", price: 25.00, image: "https://via.placeholder.com/300x200?text=Wine" },
  { id: "beer-1", name: "Craft Beer (6-pack)", price: 18.00, image: "https://via.placeholder.com/300x200?text=Beer" }
];

function addToCart(item) {
  const raw = localStorage.getItem("bw_cart");
  const cart = raw ? JSON.parse(raw) : [];
  cart.push(item);
  localStorage.setItem("bw_cart", JSON.stringify(cart));
}

export default function Categories() {
  const navigate = useNavigate();

  const handleClick = (product) => {
    addToCart(product);
    navigate("/cart");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#fff", fontFamily: "Inter, Arial, sans-serif", padding: 24 }}>
      {/* Top-right: logo */}
      <img src="/logo.png" alt="logo" style={{ position: "absolute", top: 20, right: 20, width: 72 }} />

      {/* Top nav */}
      <div style={{ position: "absolute", top: 28, right: 110, display: "flex", gap: 16 }}>
        <Link to="/categories" style={{ textDecoration: "none", color: "#000", fontWeight: 600 }}>Home</Link>
        <Link to="/contact" style={{ textDecoration: "none", color: "#000", fontWeight: 600 }}>Contact</Link>
        <Link to="/cart" style={{ textDecoration: "none", color: "#000", fontWeight: 600 }}>Cart</Link>
      </div>

      <div style={{ maxWidth: 1100, margin: "0 auto", paddingTop: 40 }}>
        <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 18 }}>Our Categories</h1>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: 16
        }}>
          {sampleProducts.map(p => (
            <div key={p.id} style={{ border: "1px solid #eee", borderRadius: 8, overflow: "hidden", background: "#fff", boxShadow: "0 4px 14px rgba(0,0,0,0.03)" }}>
              <img src={p.image} alt={p.name} style={{ width: "100%", height: 140, objectFit: "cover" }} />
              <div style={{ padding: 12 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <strong>{p.name}</strong>
                  <span style={{ fontWeight: 700 }}>${p.price.toFixed(2)}</span>
                </div>
                <div style={{ marginTop: 10 }}>
                  <button onClick={() => handleClick(p)} style={{
                    backgroundColor: "#ff0000",
                    color: "#fff",
                    border: "none",
                    padding: "8px 12px",
                    borderRadius: 6,
                    fontWeight: 700,
                    cursor: "pointer"
                  }}>Add to cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

