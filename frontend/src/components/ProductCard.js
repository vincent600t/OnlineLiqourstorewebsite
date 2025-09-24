// src/components/ProductCard.js
import React from "react";

function ProductCard({ product, onAddToCart }) {
  return (
    <div className="bg-gray-800 rounded-xl shadow hover:shadow-lg transition overflow-hidden">
      <img
        src={product.image}
        alt={product.name}
        className="w-full h-48 object-cover"
      />

      <div className="p-4 flex flex-col justify-between h-full">
        <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
        <p className="text-gray-300 mb-4">${product.price}</p>

        <button
          onClick={() => onAddToCart?.(product)}
          className="bg-yellow-500 text-black font-semibold py-2 px-4 rounded-lg hover:bg-yellow-400 transition"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}

export default ProductCard;
