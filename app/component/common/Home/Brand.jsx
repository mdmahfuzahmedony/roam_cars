"use client";

import React, { useEffect, useState } from "react";

const BrandSlider = () => {
  const [logos, setLogos] = useState([]);

  // Fetch products and extract only unique brand logos
  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch("http://localhost:2002/roam_cars", {
          cache: "no-store",
        });
        const data = await res.json();

        // Assume each product has a `brandLogo` field (or `image` as logo)
        const brandLogos = data
          .map((item) => item.brandLogo || item.image)
          .filter(Boolean); // remove null / undefined

        // Remove duplicates
        const uniqueLogos = [...new Set(brandLogos)];
        setLogos(uniqueLogos);
      } catch (error) {
        console.error("Error fetching brand logos:", error);
      }
    };

    fetchLogos();
  }, []);

  if (logos.length === 0) return null;

  return (
    <section className="bg-white max-w-[1400px] mx-auto my-20 rounded-4xl py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-8 text-center">
          Our Valued Partners
        </h2>

        <div className="relative w-full overflow-hidden whitespace-nowrap py-4">
          {/* Slider Track */}
          <div className="flex animate-slide-left-infinite">
            {logos.concat(logos).map((logo, index) => (
              <img
                key={index}
                src={logo}
                alt={`Brand Logo ${index + 1}`}
                className="h-16 w-auto mx-8 filter grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer"
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandSlider;
