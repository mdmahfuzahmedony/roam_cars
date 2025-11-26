"use client"; 

import Link from "next/link";
import React from "react";
import { useAuth } from "../auth/AuthProvider"; 
import { FaUserCircle } from "react-icons/fa";
import Cookies from "js-cookie"; 
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logOut } = useAuth();
  const router = useRouter(); 

  const handleLogout = async () => {
    try {
      await logOut(); 
      Cookies.remove("token"); 
      router.push("/loginpage");
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // কমন লিংকগুলো একটা ভেরিয়েবলে রাখলাম যাতে দুই জায়গায় লিখতে সুবিধা হয়
  // তবে আপনি চাইলে সরাসরি নিচেও লিখতে পারেন
  const navLinks = (
    <>
      <li><Link href="/" className="hover:text-[#4bc0d9] transition-colors">Home</Link></li>
      <li><Link href="/all-products" className="hover:text-[#4bc0d9] transition-colors">All Products</Link></li>
      
      {/* 🔥 কন্ডিশন: ইউজার থাকলেই শুধু এই লিংকগুলো দেখাবে 🔥 */}
      {user && (
        <>
          <li><Link href="/add-product" className="hover:text-[#4bc0d9] transition-colors">Add Product</Link></li>
          <li><Link href="/manage-product" className="hover:text-[#4bc0d9] transition-colors">Manage Product</Link></li>
        </>
      )}
    </>
  );

  return (
    <div className="w-full bg-base-100 shadow-md py-4 sticky top-0 z-50 transition-all duration-300">

      <div className="navbar max-w-[1450px] mx-auto">
        {/* Navbar Start (Logo + Mobile Menu) */}
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-gray-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>

            {/* Mobile Menu Items */}
            <ul
              tabIndex="-1"
              className="menu menu-sm dropdown-content bg-white rounded-box z-[1] mt-3 w-52 p-2 shadow text-gray-700 font-semibold"
            >
              {/* আমি উপরে navLinks বানিয়ে নিয়েছি যাতে কোড ক্লিন থাকে */}
              {navLinks}
            </ul>
          </div>

          <Link href="/" className="text-3xl font-bold text-gray-100 cursor-pointer">
            Roam <span className="font-black text-[#4bc0d9]">Car</span>
          </Link>
        </div>

        {/* Navbar Center (Desktop Menu) */}
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal flex gap-4 font-bold text-[16px] px-5 text-gray-200">
             {/* ডেস্কটপেও একই লিংক ব্যবহার করলাম */}
             {navLinks}
          </ul>
        </div>

        {/* Navbar End (User Profile or Login Button) */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar ring ring-[#4bc0d9] ring-offset-base-100 ring-offset-2"
              >
                <div className="w-10 rounded-full">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName} />
                  ) : (
                    <FaUserCircle className="w-full h-full text-gray-400 bg-white" />
                  )}
                </div>
              </div>

              <ul
                tabIndex="-1"
                className="menu menu-sm dropdown-content bg-white mt-8 rounded-box z-[1] mt-3 w-64 p-4 shadow-xl border border-gray-100"
              >
                <li className="mb-2 border-b border-gray-100 pb-2">
                  <div className="flex flex-col items-center gap-2 pointer-events-none">
                    <div className="avatar">
                      <div className="w-16 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                        {user.photoURL ? (
                          <img src={user.photoURL} alt="profile" />
                        ) : (
                          <FaUserCircle className="w-full h-full text-gray-400" />
                        )}
                      </div>
                    </div>
                    <div className="text-center">
                      <p className="font-bold text-lg text-gray-800">
                        {user.displayName || "User Name"}
                      </p>
                      <p className="text-xs text-gray-500 font-medium">
                        {user.email}
                      </p>
                    </div>
                  </div>
                </li>

                <li>
                  <Link href="/profile" className="justify-between text-gray-600 font-medium">
                    View Profile
                    <span className="badge bg-[#4bc0d9] text-white border-none">New</span>
                  </Link>
                </li>

                <li className="mt-2">
                  <button
                    onClick={handleLogout}
                    className="bg-red-50 text-red-600 hover:bg-red-100 font-bold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex justify-center items-center gap-5">
              <Link href="/loginpage">
                <button className="btn bg-[#4bc0d9] text-white hover:bg-[#3aa8bf] border-none px-6 font-bold">
                  Sign in
                </button>
              </Link>

              <Link href="/registerpage">
                <button className="btn bg-[#4bc0d9] text-white hover:bg-[#3aa8bf] border-none px-6 font-bold">
                  Sign up
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;