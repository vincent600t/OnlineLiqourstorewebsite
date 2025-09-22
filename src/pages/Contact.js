import React from "react";
import { Link } from "react-router-dom";

function Contact() {
  return (
    <div style={{ backgroundColor: "white", padding: "2rem" }}>
      <h1>Contact Page</h1>
      <input type="text" placeholder="Your Name" /><br /><br />
      <input type="email" placeholder="Email" /><br /><br />
      <textarea placeholder="Message"></textarea><br /><br />
      <Link to="/categories"><button style={{ backgroundColor: "red", color: "white" }}>Submit</button></Link>{" "}
      <Link to="/categories"><button style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}>Back to Categories</button></Link>
    </div>
  );
}

export default Contact;