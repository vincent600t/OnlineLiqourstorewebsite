import React, { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";
import "./Cart.css";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="cart-page">
      <h1 className="cart-title">Cart</h1>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <div className="cart-table-container">
          <table className="cart-table">
            <thead>
              <tr>
                <th>Item</th>
                <th>Price</th>
                <th>Quantity</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <img src={item.image} alt={item.name} />
                    {item.name}
                  </td>
                  <td>${item.price.toFixed(2)}</td>
                  <td>
                    <input
                      className="quantity-input"
                      type="number"
                      min="1"
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, parseInt(e.target.value))
                      }
                    />
                  </td>
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
              <tr className="total-row">
                <td colSpan="2" style={{ textAlign: "left" }}>
                  Total
                </td>
                <td colSpan="2" style={{ textAlign: "right" }}>
                  ${total.toFixed(2)}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {cart.length > 0 && (
        <button className="checkout-btn" onClick={() => navigate("/checkout")}>
          Checkout
        </button>
      )}

      <Footer />
    </div>
  );
};

export default Cart;