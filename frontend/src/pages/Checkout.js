import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext"; 
import "./Checkout.css";
import Footer from "./Footer";

export default function Checkout() {
  const navigate = useNavigate();
  const { cart, clearCart } = useCart();
  const [delivery, setDelivery] = useState("standard");
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
  const [showPayment, setShowPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState("");
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: "",
    expiry: "",
    cvv: "",
    mpesaNumber: "",
  });
  const [errors, setErrors] = useState({}); // ✅ field-specific errors

  const subtotal = cart.reduce((s, it) => s + it.price * it.quantity, 0);
  const deliveryFee = delivery === "express" ? 3.39 : 0;
  const total = subtotal + deliveryFee;

  const handlePlaceOrderClick = () => {
    let newErrors = {};

    if (!form.name.trim()) {
      newErrors.name = "Please enter your full name.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!form.email.trim() || !emailRegex.test(form.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    const phoneRegex = /^[0-9]{10,}$/;
    if (!form.phone.trim() || !phoneRegex.test(form.phone)) {
      newErrors.phone = "Phone number must be at least 10 digits and contain only numbers.";
    }

    if (!form.address.trim()) {
      newErrors.address = "Please enter your street address.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    setShowPayment(true);
  };

  const confirmPayment = () => {
    if (!paymentMethod) {
      setErrors({ payment: "Please select a payment method." });
      return;
    }

    if (
      paymentMethod === "Credit Card" &&
      (!paymentDetails.cardNumber || !paymentDetails.expiry || !paymentDetails.cvv)
    ) {
      setErrors({ payment: "Please fill in all credit card details." });
      return;
    }

    if (paymentMethod === "M-Pesa" && !paymentDetails.mpesaNumber) {
      setErrors({ payment: "Please enter your M-Pesa phone number." });
      return;
    }

    const order = {
      id: "BW" + Math.floor(Math.random() * 900000 + 100000),
      items: cart,
      subtotal,
      delivery: delivery === "express" ? "Express" : "Standard",
      deliveryFee,
      total,
      payment: {
        method: paymentMethod,
        details:
          paymentMethod === "Credit Card"
            ? { cardNumber: paymentDetails.cardNumber, expiry: paymentDetails.expiry }
            : paymentMethod === "M-Pesa"
            ? { mpesaNumber: paymentDetails.mpesaNumber }
            : {},
      },
      customer: form,
      date: new Date().toISOString(),
    };

    localStorage.setItem("bw_last_order", JSON.stringify(order));
    clearCart();
    navigate("/order-success");
  };

  return (
    <div className="checkout-wrapper">
      <img src="/logo-removebg-preview.png" alt="logo" className="checkout-logo" />
      <div className="checkout-nav">
        <Link to="/categories">Home</Link>
        <Link to="/cart">Cart</Link>
      </div>

      <div className="checkout-container">
        <h1 className="checkout-title">Checkout</h1>
        <div className="checkout-grid">
          {/* shipping */}
          <div className="checkout-form">
            <h2>Shipping Information</h2>
            <div className="form-fields">
              <input
                placeholder="Full Name"
                value={form.name}
                className={errors.name ? "error-input" : ""}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              {errors.name && <p className="error-message">{errors.name}</p>}

              <input
                type="email"
                placeholder="Email Address"
                value={form.email}
                className={errors.email ? "error-input" : ""}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              {errors.email && <p className="error-message">{errors.email}</p>}

              <input
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                className={errors.phone ? "error-input" : ""}
                onChange={(e) => {
                  const value = e.target.value.replace(/\D/g, ""); // only numbers
                  setForm({ ...form, phone: value });
                }}
                maxLength={15}
              />
              {errors.phone && <p className="error-message">{errors.phone}</p>}

              <input
                placeholder="Street Address"
                value={form.address}
                className={errors.address ? "error-input" : ""}
                onChange={(e) => setForm({ ...form, address: e.target.value })}
              />
              {errors.address && <p className="error-message">{errors.address}</p>}
            </div>

            <div className="delivery-options">
              <h3>Delivery Options</h3>
              <label>
                <input
                  type="radio"
                  checked={delivery === "standard"}
                  onChange={() => setDelivery("standard")}
                />{" "}
                Standard Delivery (3–5 days) — Free
              </label>
              <label>
                <input
                  type="radio"
                  checked={delivery === "express"}
                  onChange={() => setDelivery("express")}
                />{" "}
                Express Delivery (1–2 days) — $3.39
              </label>
            </div>
          </div>

          {/* order summary */}
          <div className="order-summary">
            <h3>Order Summary</h3>
            <div className="order-items">
              {cart.length === 0 ? (
                <p>No items.</p>
              ) : (
                cart.map((it, i) => (
                  <div key={i} className="order-item">
                    <span>
                      {it.name} × {it.quantity}
                    </span>
                    <span>${(it.price * it.quantity).toFixed(2)}</span>
                  </div>
                ))
              )}
            </div>
            <hr />
            <div className="summary-line">
              <span>Subtotal</span>
              <strong>${subtotal.toFixed(2)}</strong>
            </div>
            <div className="summary-line">
              <span>Delivery</span>
              <strong>${deliveryFee.toFixed(2)}</strong>
            </div>
            <div className="summary-total">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div className="summary-actions">
              {!showPayment ? (
                <button onClick={handlePlaceOrderClick}>Place Order</button>
              ) : (
                <div className="payment-methods">
                  <h3>Choose Payment Method</h3>

                  {/* Credit Card */}
                  <label>
                    <input
                      type="radio"
                      checked={paymentMethod === "Credit Card"}
                      onChange={() => setPaymentMethod("Credit Card")}
                    />{" "}
                    Credit Card
                  </label>
                  {paymentMethod === "Credit Card" && (
                    <div className="payment-extra">
                      <input
                        type="text"
                        placeholder="Card Number"
                        value={paymentDetails.cardNumber}
                        onChange={(e) =>
                          setPaymentDetails({ ...paymentDetails, cardNumber: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        placeholder="Expiry Date (MM/YY)"
                        value={paymentDetails.expiry}
                        onChange={(e) =>
                          setPaymentDetails({ ...paymentDetails, expiry: e.target.value })
                        }
                      />
                      <input
                        type="text"
                        placeholder="CVV"
                        value={paymentDetails.cvv}
                        onChange={(e) =>
                          setPaymentDetails({ ...paymentDetails, cvv: e.target.value })
                        }
                      />
                    </div>
                  )}

                  {/* M-Pesa */}
                  <label>
                    <input
                      type="radio"
                      checked={paymentMethod === "M-Pesa"}
                      onChange={() => setPaymentMethod("M-Pesa")}
                    />{" "}
                    Safaricom M-Pesa
                  </label>
                  {paymentMethod === "M-Pesa" && (
                    <div className="payment-extra">
                      <input
                        type="text"
                        placeholder="M-Pesa Phone Number"
                        value={paymentDetails.mpesaNumber}
                        onChange={(e) =>
                          setPaymentDetails({ ...paymentDetails, mpesaNumber: e.target.value })
                        }
                      />
                    </div>
                  )}

                  {/* Cash on Delivery */}
                  <label>
                    <input
                      type="radio"
                      checked={paymentMethod === "Cash on Delivery"}
                      onChange={() => setPaymentMethod("Cash on Delivery")}
                    />{" "}
                    Cash on Delivery
                  </label>

                  <div className="payment-actions">
                    <button onClick={confirmPayment}>Confirm & Pay</button>
                    <button onClick={() => setShowPayment(false)}>Cancel</button>
                  </div>
                  {errors.payment && <p className="error-message">{errors.payment}</p>}
                </div>
              )}
              <Link to="/cart">Back to Cart</Link>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
