import React from "react";
import { Link } from "react-router-dom";

function OrderSuccess() {
  return (
    <div style={{ backgroundColor: "white", padding: "2rem" }}>
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order has been successfully placed.</p>
      <Link to="/categories"><button style={{ backgroundColor: "red", color: "white" }}>Continue Shopping</button></Link>{" "}
      <Link to="/cart"><button style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}>Back to Cart</button></Link>
    </div>
  );
}

export default OrderSuccess;