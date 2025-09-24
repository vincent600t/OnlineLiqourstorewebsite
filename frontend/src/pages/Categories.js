import React from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer"; 
import "./Categories.css";

const categories = [
  {
    id: "wine",
    name: "Wine",
    image: "https://images.unsplash.com/photo-1510626176961-4b57d4fbad03",
    description: "Explore our selection of fine wines"
  },
  {
    id: "whiskey",
    name: "Whiskey",
    image: "https://i.pinimg.com/474x/c4/02/e8/c402e8dfc4dfa6c49457ca6482fb36b6.jpg",
    description: "Discover premium whiskeys"
  },
  {
    id: "vodka",
    name: "Vodka",
    image: "https://images.unsplash.com/photo-1539606494565-02e568638d91?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    description: "Browse our vodka collection"
  },
  {
    id: "beer",
    name: "Beer",
    image: "https://www.reuters.com/resizer/v2/NPXHFCMBVFI2FHKA2NZV6MMVN4.jpg?auth=7c5842a97dc26155f5c23288ac6a433a41bb0b2aaf8bc2566e0ec90acd8f0874&width=960&quality=80",
    description: "Find your favorite beers"
  },
  {
    id: "rum",
    name: "Rum",
    image: "https://media.gettyimages.com/id/2175694343/photo/decanter-with-glasses-on-a-bar-cart-horizontal.jpg?s=612x612&w=0&k=20&c=dy7phj50SU7GOZUcj_5Dtg4YvW8DX3L5Luxj3mQWbDk=",
    description: "Taste the best rums"
  },
  {
    id: "gin",
    name: "Gin",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQ7uq7G1au9ImBSzrXoxqW5A1OESbpz2vZuBo5xy3mRqQRf6G4CNS18Gzb_liVDdg58Ew&usqp=CAU",
    description: "Enjoy our gin varieties"
  }
];

export default function Categories() {
  return (
    <div className="page-container">
      <div className="categories-page">
        {/* Header */}
        <header className="header">
          <img src="/logo-removebg-preview.png" alt="Logo" className="header-logo" />
          <nav className="header-nav">
            <Link to="/">Home</Link>
            <Link to="/products">Products</Link> {/* 🔹 Added Products button */}
            <Link to="/contact">Contact</Link>
            <Link to="/cart">Cart</Link>
          </nav>
        </header>

        {/* Main content */}
        <main className="categories-content">
          <h1>Our Categories</h1>

          <div className="categories-grid">
            {categories.map((cat) => (
              <div
                key={cat.id}
                className="category-card"
                style={{ backgroundImage: `url(${cat.image})` }}
              >
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

      {/* Footer */}
      <Footer />
    </div>
  );
}
