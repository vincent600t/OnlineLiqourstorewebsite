// src/pages/Products.js
import React from "react";
import { useParams, Link } from "react-router-dom";
import "./Products.css";

const productsData = {
  whiskey: [
    {
      id: 1,
      name: "Johnnie Walker Black Label",
      price: 35.99,
      image: "/images/johnnie-walker.jpg",
      rating: 4,
    },
    {
      id: 2,
      name: "Jack Daniel's Old No. 7",
      price: 25.99,
      image: "/images/jack-daniels.jpg",
      rating: 5,
    },
    {
      id: 3,
      name: "Jameson Irish Whiskey",
      price: 29.99,
      image: "/images/jameson.jpg",
      rating: 3,
    },
  ],
  // you can add vodka, gin, rum, etc.
};

function Products() {
  const { categoryId } = useParams();
  const products = productsData[categoryId] || [];

  const addToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    alert(`${product.name} added to cart`);
  };

  return (
    <div className="products-container">
      <Link to="/categories" className="back-link">
        ← Back to Categories
      </Link>
      <h2 className="category-title">{categoryId.charAt(0).toUpperCase() + categoryId.slice(1)}</h2>
      <div className="products-grid">
        {products.map((product) => (
          <div key={product.id} className="product-card">
            <img src={product.image} alt={product.name} className="product-image" />
            <div className="product-info">
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">${product.price.toFixed(2)}</p>
              <div className="product-rating">
                {"★".repeat(product.rating) + "☆".repeat(5 - product.rating)}
              </div>
              <button
                className="add-to-cart-btn"
                onClick={() => addToCart(product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
