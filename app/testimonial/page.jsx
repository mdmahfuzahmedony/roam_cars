"use client";

import React, { useEffect, useState } from "react";
import { FaQuoteLeft, FaStar, FaMapMarkerAlt } from "react-icons/fa";

const TestimonialSection = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  // Data Fetching from your API
  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const res = await fetch(
          "https://roam-car-server.vercel.app/testimonial"
        );
        const data = await res.json();
        setTestimonials(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <span className="loading loading-dots loading-lg text-blue-600"></span>
      </div>
    );
  }

  return (
    <section className="bg-base-200 my-20 py-16 md:py-24">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header Section */}
        <div className="text-center bg-base-200 mb-16">
          <h2 className="text-2xl font-bold text-white mb-4">
            Trusted by Thousands
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-md">
            See what our customers from around the world have to say about their
            experience with Roam Cars.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((item) => (
            <div
              key={item._id} 
              className="bg-gray-600 p-8 rounded-2xl shadow-lg  border-gray-100 flex flex-col hover:shadow-2xl transition-all duration-300 relative group"
            >
        
              <FaQuoteLeft className="text-blue-100 text-5xl absolute top-6 right-6 -z-0 group-hover:text-blue-200 transition-colors" />

              {/* Star Rating Logic based on item.rating */}
              <div className="flex text-yellow-400 mb-5 relative z-10">
                {[...Array(5)].map((_, i) => (
                  <FaStar
                    key={i}
                    className={
                      i < item.rating ? "text-yellow-400" : "text-gray-300"
                    }
                  />
                ))}
              </div>

              {/* Review Text */}
              <p className="text-gray-200 mt-4 text-base leading-relaxed mb-6 flex-grow relative z-10 italic">
                "{item.review}"
              </p>

              {/* User Profile Section */}
              <div className="flex items-center mt-auto pt-5 border-t border-gray-100 relative z-10">
                {/* User Image */}
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-blue-500 p-0.5"
                />

                {/* User Info */}
                <div className="ml-4">
                  <h4 className="text-lg font-bold text-blue-100 leading-none mb-1">
                    {item.name}
                  </h4>
                  <div className="text-sm text-gray-400 my-2 font-medium">
                    {item.role}
                  </div>

                  {/* Location with Icon */}
                  {item.location && (
                    <div className="flex items-center text-xs text-gray-400 mt-1">
                      <FaMapMarkerAlt className="mr-1" />
                      {item.location}
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
