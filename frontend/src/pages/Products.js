// src/pages/Products.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";
import "./Products.css";

export default function Products() {
  const { category } = useParams(); // from route param
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!category) return; // safeguard

    setLoading(true);
    setError("");
    fetch(`http://127.0.0.1:5000/api/products/${category}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch products");
        return res.json();
      })
      .then((data) => {
        setProducts(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
        setError("Could not load products. Please try again later.");
        setLoading(false);
      });
  }, [category]);

  return (
    <div className="page-container">
      <div className="products-page">
        {/* Header */}
        <header className="header">
          <img
            src="/logo-removebg-preview.png"
            alt="Logo"
            className="header-logo"
          />
          <nav className="header-nav">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="products-content">
          {/* 🔹 Back to Categories button */}
          <div className="back-link">
            <Link to="/categories">← Back to Categories</Link>
          </div>

          <h1>
            {category
              ? category.charAt(0).toUpperCase() + category.slice(1)
              : "All"}{" "}
            Products
          </h1>

          {loading && <p className="loading">Loading products...</p>}
          {error && <p className="error">{error}</p>}

          {!loading && !error && (
            <div className="products-grid">
              {products.length > 0 ? (
                products.map((p) => (
                  <div key={p.id} className="product-card">
                    <img
                      src={
                        p.image ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      alt={p.name || "Unnamed Product"}
                      className="product-img"
                    />
                    <div className="product-info">
                      <h2>{p.name || "Unnamed Product"}</h2>
                      <p>
                        {p.price !== undefined
                          ? `$${p.price.toFixed(2)}`
                          : "Price not available"}
                      </p>
                      <button className="add-btn">Add to Cart</button>
                    </div>
                  </div>
                ))
              ) : (
                <p>No products found for this category.</p>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />
    </div>
  );
}
