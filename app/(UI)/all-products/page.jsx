"use client";

import { useState, useEffect } from "react";
import ProductCard from "../../component/productcard"; // adjust path

export default function Page() {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("none");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch(
          "https://roam-car-server.vercel.app/roam_cars",
          { cache: "no-store" }
        );
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        const data = await res.json();
        setProducts(data);
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAndSortedProducts = [...filteredProducts].sort((a, b) => {
    const getPrice = (p) => parseFloat(p.price.replace("$", "")); // convert "$24.50" -> 24.50
    if (sortBy === "price-asc") return getPrice(a) - getPrice(b);
    if (sortBy === "price-desc") return getPrice(b) - getPrice(a);
    return 0;
  });

  if (loading)
    return (
      <div className="text-white text-center py-10">Loading products...</div>
    );
  if (error)
    return <div className="text-red-500 text-center py-10">Error: {error}</div>;

  return (
    // 1. এখানে px-4 যোগ করা হয়েছে যাতে মোবাইলে কন্টেন্ট একদম বর্ডারে লেগে না থাকে
    <div className="max-w-[1450px] mx-auto my-10 px-4">
      <div className="flex flex-col md:flex-row justify-between items-center mb-5 p-4 bg-gray-800 rounded-lg shadow-md">
        <div className="flex-1 w-full md:w-auto mb-4 md:mb-0">
          <h1 className="text-white text-2xl font-semibold text-center md:text-left">
            All Products:{" "}
            <span className="text-blue-700">{products.length}</span>
          </h1>
        </div>

        {/* 2. সমস্যা এইখানে ছিল। মোবাইলে এগুলো নিচে নিচে (flex-col) এবং ডেস্কটপে পাশাপাশি (md:flex-row) থাকবে */}
        <div className="flex-1 w-full flex flex-col md:flex-row justify-end items-center gap-3 md:gap-5">
          <input
            type="text"
            placeholder="Search by title..."
            // 3. w-full ঠিক আছে কারণ এখন parent flex-col, তাই নিচে নিচে থাকবে
            className="w-full md:w-80 p-2 rounded-md bg-gray-700 text-white border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />

          <select
            className="w-full md:w-auto p-2 bg-gray-700 text-white border border-gray-600 rounded-md cursor-pointer"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="none">Sort by</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
        {filteredAndSortedProducts.length > 0 ? (
          filteredAndSortedProducts.map((product) => (
            <ProductCard key={product._id.toString()} product={product} />
          ))
        ) : (
          <p className="text-white col-span-full text-center text-lg">
            No products found.
          </p>
        )}
      </div>
    </div>
  );
}
