// app/(main)/products/[id]/page.jsx
import React from "react";
import { FaTag, FaPhoneAlt, FaWhatsapp } from "react-icons/fa"; // আইকনের জন্য (অপশনাল, না থাকলে বাদ দিতে পারেন)

export default async function SingleProductPage({ params }) {
  // Params resolve logic as per your request
  const resolvedParams = await Promise.resolve(params);
  const { id } = resolvedParams;

  const res = await fetch(
    `https://roam-car-server.vercel.app/roam_cars/${id}`,
    { cache: "no-store" }
  );

  // Error handling logic
  if (!res.ok) {
    console.error(`Backend fetch failed with status: ${res.status}`);
    return (
      <div className="text-center py-20 text-red-600 font-semibold">
        Failed to load product details. Status: {res.status}
      </div>
    );
  }

  let product;
  try {
    product = await res.json();
  } catch (e) {
    console.error("Failed to parse backend response as JSON:", e);
    return (
      <div className="text-center py-20 text-red-600">
        Invalid data received.
      </div>
    );
  }

  if (!product || !product._id) {
    return (
      <div className="text-center py-20 text-red-600 text-xl">
        Product not found.
      </div>
    );
  }

  return (
    <section className="bg-base-200 max-w-[1450px] mx-auto my-20 rounded-4xl min-h-screen py-12 flex items-center justify-center">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* Back Button (Optional) */}
        <div className="mb-6">
          <a
            href="/all-products"
            className="text-gray-500 hover:text-blue-600 transition-colors"
          >
            ← Back to Listings
          </a>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-2">
            {/* Left Side: Image */}
            <div className="relative h-96 md:h-auto bg-gray-200">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.title}
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  No Image Available
                </div>
              )}
              {/* Badge on Image */}
              <div className="absolute top-4 left-4">
                <span className="bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide shadow-md">
                  Featured
                </span>
              </div>
            </div>

            {/* Right Side: Product Details */}
            <div className="p-8 md:p-12 flex flex-col justify-center">
              {/* Meta / Category */}
              <div className="flex items-center text-blue-600 mb-3 text-sm font-semibold tracking-wider uppercase">
                <FaTag className="mr-2" />
                {product.meta || "General"}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <p className="text-3xl font-bold text-gray-900 mb-6">
                {product.price}
              </p>

              {/* Description */}
              <div className="mb-8">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  Description
                </h3>
                <p className="text-gray-600 text-base leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Divider */}
              <div className="border-t border-gray-200 my-6"></div>

              {/* Call to Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="flex-1 bg-gray-900 text-white py-3 px-6 rounded-lg font-semibold hover:bg-gray-800 transition duration-300 flex items-center justify-center shadow-lg">
                  <FaPhoneAlt className="mr-2" /> Contact Dealer
                </button>
                <button className="flex-1 border-2 border-green-600 text-green-600 py-3 px-6 rounded-lg font-semibold hover:bg-green-50 transition duration-300 flex items-center justify-center">
                  <FaWhatsapp className="mr-2 text-xl" /> WhatsApp
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
