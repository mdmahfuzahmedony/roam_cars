"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link"; // Next.js Link import
import { FaChevronLeft, FaChevronRight, FaBookmark } from "react-icons/fa";
import { FiExternalLink } from "react-icons/fi";

const FeatureProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);

  const itemsPerPage = 4; // এক স্লাইডে ৪টি প্রোডাক্ট দেখাবে

  // Data Fetching logic
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://roam-car-server.vercel.app/roam_cars"
        );
        const data = await response.json();

        setProducts(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching products:", error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Slider Logic
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? totalPages - 1 : prevIndex - 1
    );
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === totalPages - 1 ? 0 : prevIndex + 1
    );
  };

  const startIndex = currentIndex * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  if (loading) {
    return <div className="text-center py-20">Loading products...</div>;
  }

  return (
    <section className="bg-base-300 py-16 my-20 md:py-20">
      <div className="container max-w-[1450px] mx-auto px-4 ">
        {/* Section Header */}
        <div className="flex justify-between items-center mb-10 md:mb-12">
          <h2 className="text-2xl  md:text-5xl font-bold text-white">
            Recently Added
          </h2>
          <Link
            href="/products"
            className="flex items-center text-blue-600 hover:text-blue-800 font-semibold transition-colors duration-200"
          >
            View All
            <FiExternalLink className="ml-2 text-lg" />
          </Link>
        </div>

        {/* Product Cards Slider */}
        <div className="relative">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-7 md:gap-8 transition-transform duration-500 ease-in-out">
              {currentProducts.map((product) => (
                <div
                  key={product._id}
                  className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden border border-gray-200 flex flex-col h-full"
                >
                  {/* Image Section */}
                  <div className="relative h-48 flex-shrink-0">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />

                    {/* Badge Logic (Optional: যদি ডাটাবেসে badge থাকে তবে দেখাবে, না থাকলে ডিফল্ট কিছু দিতে পারেন) */}
                    {product.badge && (
                      <span className="absolute top-4 left-4 text-xs font-semibold px-3 py-1 rounded-full bg-blue-100 text-blue-800">
                        {product.badge}
                      </span>
                    )}

                    <button className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-sm hover:shadow-md transition-shadow duration-200 text-gray-500 hover:text-blue-600">
                      <FaBookmark className="w-5 h-5" />
                    </button>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2 leading-tight line-clamp-1">
                      {product.title}
                    </h3>

                    {/* Description or Meta data */}
                    <p className="text-gray-600 text-sm mb-3 line-clamp-2 flex-grow">
                      {/* যদি description থাকে সেটা দেখাবে, অথবা meta ডাটা */}
                      {product.description ||
                        product.meta ||
                        "No description available"}
                    </p>

                    <div className="mt-auto">
                      <p className="text-2xl font-bold text-gray-900 mb-4">
                        {product.price}
                      </p>

                      <Link
                        href={`/products/${product._id}`}
                        className="flex items-center text-blue-600 hover:text-blue-800 font-medium transition-colors duration-200"
                      >
                        View Details
                        <FiExternalLink className="ml-1 text-base" />
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>

        {/* Slider Navigation Arrows (Show only if more than itemsPerPage) */}
        {products.length > itemsPerPage && (
          <div className="flex justify-center mt-12 space-x-4">
            <button
              onClick={prevSlide}
              className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={nextSlide}
              className="p-3 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <FaChevronRight className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default FeatureProduct;
