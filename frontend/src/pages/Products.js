// src/pages/Products.js
import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Footer from "./Footer";
import "./Products.css";

// 🔹 Import useCart
import { useCart } from "../context/CartContext";

export default function Products() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState(""); // 🔹 Search state

  // 🔹 get addToCart + cart state
  const { addToCart, cart } = useCart();

  useEffect(() => {
    if (!category) return;

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

  // 🔹 handle add to cart + toast message
  const handleAddToCart = (product) => {
    addToCart(product);
    setMessage(`${product.name} added to cart!`);
    setTimeout(() => setMessage(""), 2000);
  };

  // 🔹 Filter products based on search term
  const filteredProducts = products.filter((p) =>
    p.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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

            {/* 🔹 Cart with count badge */}
            <Link to="/cart" className="cart-link">
              <img
                src="/shopping-cart.png"
                alt="Cart"
                className="cart-icon"
              />
              {cart.length > 0 && (
                <span className="cart-count">{cart.length}</span>
              )}
            </Link>
          </nav>
        </header>

        {/* Main Content */}
        <main className="products-content">
          <div className="top-bar">
            <div className="back-link">
              <Link to="/categories">← Back to Categories</Link>
            </div>

            {/* 🔹 Search bar */}
            <div className="search-bar">
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
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
              {filteredProducts.length > 0 ? (
                filteredProducts.map((p) => (
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
                      <div className="product-cart-info">
                        <p>
                          {p.price !== undefined
                            ? `$${p.price.toFixed(2)}`
                            : "Price not available"}
                        </p>
                        <button
                          className="add-btn"
                          onClick={() => handleAddToCart(p)}
                        >
                          Add to Cart
                        </button>
                      </div>

                    </div>
                  </div>
                ))
              ) : (
                <p>No products match your search.</p>
              )}
            </div>
          )}
        </main>
      </div>

      <Footer />

      {/* 🔹 Floating success toast */}
      {message && <div className="cart-toast">✅ {message}</div>}
    </div>
  );
}
