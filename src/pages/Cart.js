import React from "react";
import { Link } from "react-router-dom";

function Cart() {
  return (
    <div style={{ backgroundColor: "white", padding: "2rem" }}>
      <h1>Cart Page</h1>
      <p>Your cart items will appear here.</p>
      <Link to="/checkout"><button style={{ backgroundColor: "red", color: "white" }}>Checkout</button></Link>{" "}
      <Link to="/categories"><button style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}>Back to Categories</button></Link>
    </div>
  );
}

export default Cart;