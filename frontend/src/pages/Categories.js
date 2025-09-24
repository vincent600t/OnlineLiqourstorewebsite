import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer"; // make sure Footer is imported
import "./Categories.css";

const categories = [
  { id: "whiskey", name: "Whiskey", description: "Explore our selection", image: "https://via.placeholder.com/600x400?text=Whiskey" },
  { id: "vodka", name: "Vodka", description: "Explore our selection", image: "https://via.placeholder.com/600x400?text=Vodka" },
  { id: "wine", name: "Wine", description: "Explore our selection", image: "https://via.placeholder.com/600x400?text=Wine" },
  { id: "beer", name: "Beer", description: "Explore our selection", image: "https://via.placeholder.com/600x400?text=Beer" },
  { id: "rum", name: "Rum", description: "Explore our selection", image: "https://via.placeholder.com/600x400?text=Rum" },
  { id: "tequila", name: "Tequila", description: "Explore our selection", image: "https://via.placeholder.com/600x400?text=Tequila" },
];

export default function Categories() {
  return (
    <div className="page-container">
      <div className="categories-page">
        <header className="header">
          <img src="/logo-removebg-preview.png" alt="Logo" className="header-logo" />
          <nav className="header-nav">
            <Link to="/">Home</Link>
            <Link to="/contact">Contact</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </header>

        <main className="categories-content">
          <h1>Our Categories</h1>

          <div className="categories-grid">
            {categories.map((cat) => (
              <div key={cat.id} className="category-card" style={{ backgroundImage: `url(${cat.image})` }}>
                <div className="overlay">
                  <h2>{cat.name}</h2>
                  <Link to={`/products/${cat.id}`} className="explore-link">
                    {cat.description}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* Footer at the bottom */}
      <Footer />
    </div>
  );
}
