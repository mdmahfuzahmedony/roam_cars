"use client";

import React, { useState } from "react";
// আপনার AuthProvider এর সঠিক পাথ দিন (Layout এ যে পাথ ব্যবহার করেছেন)
import { useAuth } from "../component/auth/AuthProvider"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaEnvelope, FaLock, FaUser, FaImage, FaEye, FaEyeSlash } from "react-icons/fa";

const RegisterPage = () => {
  const { createUser, signInWithGoogle } = useAuth();
  const router = useRouter();

  // Form States
  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // UI States
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // Handle Registration
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic Validation
    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      setLoading(false);
      return;
    }

    try {
      // AuthProvider এর createUser ফাংশন কল করা হচ্ছে (email, password, name, photo)
      await createUser(email, password, name, photoURL);
      router.push("/"); // সফল হলে হোমপেজে রিডাইরেক্ট
    } catch (err) {
      console.error(err);
      // Firebase এর কমন এররগুলো হ্যান্ডেল করা
      if (err.code === 'auth/email-already-in-use') {
        setError("This email is already registered. Please login.");
      } else {
        setError("Registration failed. Please try again.");
      }
    }
    setLoading(false);
  };

  // Handle Google Login from Register Page
  const handleGoogleRegister = async () => {
    setError("");
    try {
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Google Sign-In failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-100">
        
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="mt-2 text-sm text-gray-600">Join Roam Cars community today</p>
        </div>

        {/* Error Display */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm font-medium animate-pulse">
            {error}
          </div>
        )}

        {/* Register Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          
          {/* Name Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="John Doe"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Photo URL Input (Optional) */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Photo URL <span className="text-gray-400 font-normal">(Optional)</span></label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaImage className="text-gray-400" />
              </div>
              <input
                type="url"
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="https://example.com/photo.jpg"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
              />
            </div>
          </div>

          {/* Email Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                required
                className="w-full pl-10 pr-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Input */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                required
                className="w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
            <p className="text-xs text-gray-500 mt-1">Must be at least 6 characters long</p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors mt-2"
          >
            {loading ? <span className="loading loading-spinner loading-xs"></span> : "Create Account"}
          </button>
        </form>

        {/* Divider */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500 font-medium">Or register with</span>
          </div>
        </div>

        {/* Google Button */}
        <button
          onClick={handleGoogleRegister}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-[0.98]"
        >
          <FaGoogle className="text-red-500 text-lg" />
          Sign up with Google
        </button>

        {/* Link to Login */}
        <div className="text-center text-sm text-gray-600 mt-4">
          Already have an account?{" "}
          <Link href="/loginpage" className="font-bold text-blue-600 hover:text-blue-500 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;