import React from "react";
import { Link } from "react-router-dom";

function Checkout() {
  return (
    <div style={{ backgroundColor: "white", padding: "2rem" }}>
      <h1>Checkout Page</h1>
      <input type="text" placeholder="Shipping Address" /><br /><br />
      <input type="text" placeholder="Payment Info" /><br /><br />
      <Link to="/order-success"><button style={{ backgroundColor: "red", color: "white" }}>Place Order</button></Link>{" "}
      <Link to="/cart"><button style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}>Back to Cart</button></Link>
    </div>
  );
}

export default Checkout;