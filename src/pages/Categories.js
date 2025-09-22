import React from "react";
import { Link } from "react-router-dom";

function Categories() {
  return (
    <div style={{ backgroundColor: "white", padding: "2rem" }}>
      <h1>Categories Page</h1>
      <div>
        <Link to="/cart"><button style={{ backgroundColor: "red", color: "white" }}>Whiskey</button></Link>{" "}
        <Link to="/cart"><button style={{ backgroundColor: "red", color: "white" }}>Vodka</button></Link>{" "}
        <Link to="/cart"><button style={{ backgroundColor: "red", color: "white" }}>Wine</button></Link>{" "}
        <Link to="/cart"><button style={{ backgroundColor: "red", color: "white" }}>Beer</button></Link>{" "}
      </div><br />
      <Link to="/contact"><button style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}>Contact</button></Link>{" "}
      <Link to="/"><button style={{ backgroundColor: "white", color: "black", border: "1px solid black" }}>Logout</button></Link>
    </div>
  );
}

export default Categories;


