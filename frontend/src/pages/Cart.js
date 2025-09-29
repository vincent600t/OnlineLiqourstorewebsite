import React from "react";
import { useNavigate, Link } from "react-router-dom";
import Footer from "./Footer";
import "./Cart.css";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-wrapper">
      {/* 🔹 Header Section */}
      <header className="cart-header">
        <div className="logo" onClick={() => navigate("/Categories")}>
          <img src="/logo-removebg-preview.png" alt="logo" className="checkout-logo" />
        </div>
        <nav className="nav-links">
          <Link to="/categories">Categories</Link>
          <Link to="/cart">Cart ({cart.length})</Link>
          <Link to="/checkout">Checkout</Link>
        </nav>
      </header>

      {/* 🔹 Main Cart Page */}
      <div className="cart-page">
        <h1 className="cart-title">Your Shopping Cart</h1>

        {cart.length === 0 ? (
          <div className="empty-cart">
            <p>Your cart is empty.</p>
            <button
              className="cart-btn back-btn"
              onClick={() => navigate("/categories")}
            >
              Start Shopping →
            </button>
          </div>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Item</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Subtotal</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {cart.map((item) => (
                  <tr key={item.id}>
                    <td className="cart-item">
                      <img
                        src={item.image || "https://via.placeholder.com/70"}
                        alt={item.name}
                      />
                      <span>{item.name}</span>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value) || 1)
                        }
                      />
                    </td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="remove-btn"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="cart-summary">
              <h3>Total: ${total.toFixed(2)}</h3>
              <div className="cart-actions">
                <button
                  className="cart-btn checkout-btn"
                  onClick={() => navigate("/checkout")}
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>

            <div className="cart-actions">
              <button
                className="cart-btn back-btn"
                onClick={() => navigate("/categories")}
              >
                ← Back to Categories
              </button>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
