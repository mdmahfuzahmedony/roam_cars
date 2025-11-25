import React from "react";
import {
  FaFacebookF,
  FaTwitter,
  FaInstagram,
  FaArrowUp,
  FaDiscord,
  FaTelegramPlane,
  FaWhatsapp,
  FaYoutube,
  FaGithub,
  FaGoogle,
  FaBitcoin,
  FaEthereum,
} from "react-icons/fa"; // For social media icons
import { MdEmail, MdLocationOn, MdAccessTime } from "react-icons/md"; // For contact icons

const Footer = () => {
  return (
    <div className="w-full  mx-auto bg-[#1a202c] text-white py-12">
      {" "}
      {/* Adjusted background color and text color */}
      <footer className="footer max-w-[1450px] md:mx-auto mx-4  py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Entox Section */}
        <aside className="space-y-4">
          <div className="flex items-center space-x-2">
            {/* You can replace this with an actual logo image */}
            <h2 className="text-3xl font-bold text-white">
              Roam <span className="font-black text-[#4bc0d9]">Car</span>
            </h2>
          </div>
          <p className="text-sm leading-relaxed text-gray-300">
            Lorem ipsum dolor sit amet consectetur
            <br />
            etur pisicing elit sed do eiusmod
            <br />
            tempor incididunt ut labore.
          </p>
          <button className="btn bg-[#4bc0d9] hover:bg-[#3caabf] text-white border-none rounded-md px-6 py-2">
            Submit Ad
          </button>
        </aside>

        {/* Explore Section */}
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Explore</h6>
          <a className="link link-hover block mb-2 text-gray-300 hover:text-[#4bc0d9]">
            Classic Search
          </a>
          <a className="link link-hover block mb-2 text-[#4bc0d9] hover:underline">
            Search map
          </a>
          <a className="link link-hover block mb-2 text-gray-300 hover:text-[#4bc0d9]">
            About
          </a>
          <a className="link link-hover block mb-2 text-gray-300 hover:text-[#4bc0d9]">
            How it works
          </a>
          <a className="link link-hover block mb-2 text-gray-300 hover:text-[#4bc0d9]">
            Contact
          </a>
        </nav>

        {/* Contact Section */}
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">Contact</h6>
          <a className="link link-hover flex items-center mb-2 text-gray-300 hover:text-[#4bc0d9]">
            <MdLocationOn className="mr-2 text-xl" /> 88 Broklyn Golden Street,
            USA
          </a>
          <a className="link link-hover flex items-center mb-2 text-gray-300 hover:text-[#4bc0d9]">
            <MdAccessTime className="mr-2 text-xl" /> Mon - Sat 8:00 - 6:30
          </a>
          <a className="link link-hover flex items-center mb-2 text-gray-300 hover:text-[#4bc0d9]">
            <MdEmail className="mr-2 text-xl" /> needhelp@company.com
          </a>
          <a className="link link-hover flex items-center mb-2 text-gray-300 hover:text-[#4bc0d9]">
            <span className="mr-2 text-xl">📞</span> 00 666 888 0000
          </a>
        </nav>

        {/* Newsletter Section */}
        <nav>
          <h6 className="footer-title text-lg font-semibold mb-4">
            Newsletter
          </h6>
          <p className="text-sm leading-relaxed text-gray-300 mb-4">
            There are many variations of simple
            <br />
            lorem ipsum available for not.
          </p>
          <div className="relative">
            <input
              type="email"
              placeholder="Email address"
              className="input input-bordered w-full pr-12 rounded-md py-2 px-4 bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#4bc0d9]"
            />
            <button className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-[#4bc0d9]">
              <MdEmail className="text-xl" />
            </button>
          </div>
        </nav>
      </footer>
      {/* Social Media & Copyright */}
      <div className="border-t border-gray-700 mt-8 pt-8 max-w-[1450px] mx-auto flex flex-col sm:flex-row justify-between items-center px-10">
        <div className="flex space-x-4 mb-4 sm:mb-0">
          <a
            href="#"
            className="p-3 bg-gray-700 rounded-full hover:bg-[#4bc0d9] text-white transition-colors duration-300"
          >
            <FaTwitter className="text-lg" />
          </a>
          <a
            href="#"
            className="p-3 bg-gray-700 rounded-full hover:bg-[#4bc0d9] text-white transition-colors duration-300"
          >
            <FaFacebookF className="text-lg" />
          </a>
          <a
            href="#"
            className="p-3 bg-gray-700 rounded-full hover:bg-[#4bc0d9] text-white transition-colors duration-300"
          >
            <FaInstagram className="text-lg" />
          </a>
        </div>
        <p className="text-sm text-center text-gray-400">
          © Copyright 2021 by roamcars.com <br />
          <span className="text-[#4bc0d9]  mt-4">Devolop by @mahfuzahmed</span>
        </p>
      </div>
    </div>
  );
};

export default Footer;
