import React from "react";
import Link from "next/link";

const ProductCard = ({ product }) => {
  return (
    <div className="border border-gray-200 rounded-2xl overflow-hidden shadow-md w-72 m-4 font-sans hover:shadow-lg transition-shadow duration-300">
      <img
        src={product.image}
        alt={product.title}
        className="w-full h-48 object-cover border-b border-gray-200"
      />
      <div className="p-4">
        <h3 className="text-[17PX] font-semibold text-gray-100 mb-2">
          {product.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 h-10 overflow-hidden">
          {product.description}
        </p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-bold text-blue-600">{product.price}</span>
          <span className="text-xs text-gray-300">{product.meta}</span>
        </div>
        <Link href={`/products/${product._id.toString()}`} passHref>
          <button className="w-full py-2 px-4 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
