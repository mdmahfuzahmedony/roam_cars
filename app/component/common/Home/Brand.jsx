"use client";

import React, { useEffect, useState } from "react";
// Swiper এর প্রয়োজনীয় অংশ ইমপোর্ট
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

// Swiper CSS ইমপোর্ট
import "swiper/css";

const BrandSlider = () => {
  const [logos, setLogos] = useState([]);

  useEffect(() => {
    const fetchLogos = async () => {
      try {
        const res = await fetch(
          "https://roam-car-server.vercel.app/roam_cars",
          { cache: "no-store" }
        );
        const data = await res.json();

        // ডাটা থেকে brand_logo বের করা এবং null ভ্যালু বাদ দেওয়া
        const brandLogos = data.map((item) => item.brand_logo).filter(Boolean);

        // ডুপ্লিকেট লোগো বাদ দেওয়া
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
    <section className="bg-gray-600 max-w-[1450px] md:mx-auto my-20 mx-4 rounded-2xl py-12 md:py-16 overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-10 text-center">
          Our Valued Partners
        </h2>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={30} // দুই লোগোর মাঝের গ্যাপ
          slidesPerView={2} // মোবাইলে ২টা দেখাবে
          loop={true} // ইনফিনিটি লুপ
          speed={3000} // স্লাইড স্পিড (যত বেশি তত স্মুথ স্লো মোশন)
          autoplay={{
            delay: 0, // থামবে না, চলতেই থাকবে
            disableOnInteraction: false, // মাউস নিলেও থামবে না (চাইলে true করতে পারেন)
            pauseOnMouseEnter: true, // মাউস নিলে পজ হবে (অপশনাল)
          }}
          breakpoints={{
            640: {
              slidesPerView: 3,
            },
            768: {
              slidesPerView: 4,
            },
            1024: {
              slidesPerView: 6, // বড় স্ক্রিনে ৬টা লোগো দেখাবে
            },
          }}
          className="mySwiper [&>.swiper-wrapper]:transition-timing-function-linear" // লিনিয়ার মোশন এর জন্য কাস্টম ক্লাস
        >
          {logos.map((logo, index) => (
            <SwiperSlide
              key={index}
              className="flex items-center justify-center"
            >
              <div className="h-20 w-full flex items-center justify-center px-4">
                <img
                  src={logo}
                  alt={`Partner Brand ${index}`}
                  className="h-14 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300 cursor-pointer opacity-70 hover:opacity-100"
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default BrandSlider;
