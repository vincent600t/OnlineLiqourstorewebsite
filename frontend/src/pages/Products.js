import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Products.css"; // import CSS file

function Products() {
  const { categoryId } = useParams();
  const { addToCart } = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://127.0.0.1:5000/api/products?category=${categoryId}`)
      .then((res) => res.json())
      .then((data) => setProducts(data.products || [])) // ✅ only keep the array
      .catch((err) => console.error("Failed to fetch products:", err));
  }, [categoryId]);

  return (
    <div className="products-page">
      {/* Back link */}
      <Link to="/categories" className="back-link">
        ← Back to Categories
      </Link>

      {/* Title */}
      <h1 className="category-title">{categoryId}</h1>

      {/* Product grid */}
      <div className="products-grid">
        {Array.isArray(products) && products.length > 0 ? (
          products.map((product) => (
            <div key={product.id} className="product-card">
              {/* Product image */}
              <img
                src={product.image || "https://via.placeholder.com/300x200"}
                alt={product.name}
                className="product-image"
              />

              {/* Product details */}
              <div className="product-info">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">${product.price.toFixed(2)}</p>

                {/* Add to Cart button */}
                <button
                  onClick={() => addToCart(product)}
                  className="add-to-cart-btn"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))
        ) : (
          <p>No products found in this category.</p>
        )}
      </div>
    </div>
  );
}

export default Products;
