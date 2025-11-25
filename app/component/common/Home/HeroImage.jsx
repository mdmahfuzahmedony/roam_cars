import React from "react";
import Link from "next/link"; // ✔ Correct import

const HeroSection = () => {
  return (
    <div className="bg-gray-50 min-h-[600px]  py-4 my-10 md-my-20 max-w-[1450px] mx-auto rounded-2xl flex items-center relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100 opacity-50 blur-3xl"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-red-100 opacity-50 blur-3xl"></div>

      <div className="container mx-auto px-4 md:px-8 lg:px-16">
        <div className="flex flex-col-reverse lg:flex-row items-center justify-between gap-10">
          {/* Left */}
          <div className="w-full lg:w-1/2 text-center lg:text-left z-10">
            <span className="inline-block py-1 px-3 rounded-full bg-blue-100 text-blue-600 text-sm font-semibold mb-4">
              Premium Car Rental
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Drive Your <span className="text-blue-600">Dream Car</span> Today.
            </h1>
            <p className="text-md md:text-lg text-gray-600 mb-8 leading-relaxed">
              Experience the thrill of the road with our premium fleet.
            </p>

            {/* Buttons */}
            <div className="flex  md:flex-row sm:flex-row items-center justify-center lg:justify-start gap-4">
              {/* ✔ Explore → Go to /all-products */}
              <Link href="/all-products">
                <button className="btn btn-primary sm:w-auto px-8 py-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg transition duration-300 transform hover:scale-105">
                  Explore
                </button>
              </Link>

              <button className="btn btn-primary sm:w-auto px-8 py-6 bg-white border-2 border-gray-200 hover:border-blue-600 text-gray-700 hover:text-blue-600 font-semibold rounded-lg transition duration-300">
                View Fleet
              </button>
            </div>

            {/* Stats */}
            <div className="mt-10 flex items-center justify-center lg:justify-start gap-8 text-gray-500 text-sm font-medium">
              <div className="flex items-center gap-2">🚙 50+ Cars</div>
              <div className="flex items-center gap-2">⚡ Fast Booking</div>
            </div>
          </div>

          {/* Right */}
          <div className="w-full lg:w-1/2 relative z-10">
            <img
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7"
              alt="Luxury Sports Car"
              className="w-full h-auto object-cover rounded-xl shadow-2xl transform hover:scale-[1.02] transition duration-500"
            />

            <div className="absolute -bottom-6 -left-6 md:bottom-10 md:-left-10 bg-white p-4 rounded-lg shadow-xl border border-gray-100 hidden md:block">
              <p className="text-gray-500 text-xs uppercase font-bold tracking-wider">
                Daily Rate
              </p>
              <p className="text-2xl font-bold text-gray-900">
                $45.00{" "}
                <span className="text-sm font-normal text-gray-500">/day</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
