"use client";

import React, { useState } from "react";
// আপনার AuthProvider এর পাথ ঠিক করুন (যেমন: '@/providers/AuthProvider' বা '../context/AuthProvider')
import { useAuth } from "../component/auth/AuthProvider"; 
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaEnvelope, FaLock, FaEye, FaEyeSlash } from "react-icons/fa";

const LoginPage = () => {
  // আপনার AuthProvider থেকে ফাংশনগুলো আনা হলো
  const { signInUser, signInWithGoogle, resetPassword } = useAuth();
  const router = useRouter();

  // ফর্ম স্টেটস
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  // পাসওয়ার্ড রিসেট মডাল স্টেটস
  const [isResetOpen, setIsResetOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetMessage, setResetMessage] = useState("");

  // ১. ইমেইল ও পাসওয়ার্ড দিয়ে লগিন
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      // আপনার AuthProvider এর 'signInUser' ফাংশন কল করা হলো
      await signInUser(email, password);
      router.push("/"); // সফল হলে হোমপেজে রিডাইরেক্ট
    } catch (err) {
      console.error(err);
      setError("Incorrect email or password. Please try again.");
    }
    setLoading(false);
  };

  // ২. গুগল দিয়ে লগিন
  const handleGoogleLogin = async () => {
    setError("");
    try {
      // আপনার AuthProvider এর 'signInWithGoogle' ফাংশন কল করা হলো
      await signInWithGoogle();
      router.push("/");
    } catch (err) {
      console.error(err);
      setError("Google Sign-In failed or was cancelled.");
    }
  };

  // ৩. পাসওয়ার্ড রিসেট হ্যান্ডলার
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setResetMessage("");
    setError("");
    
    if(!resetEmail) return setError("Please enter your email address.");

    try {
      // আপনার AuthProvider এর 'resetPassword' ফাংশন (যদি যোগ করে থাকেন)
      if (resetPassword) {
        await resetPassword(resetEmail);
        setResetMessage("Password reset email sent! Check your inbox.");
        setTimeout(() => setIsResetOpen(false), 3000); // ৩ সেকেন্ড পর মডাল বন্ধ হবে
      } else {
        setError("Reset function not available properly.");
      }
    } catch (err) {
      console.error(err);
      setError("Failed to reset password. Email might not exist.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 space-y-6 border border-gray-100">
        
        {/* হেডার সেকশন */}
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="mt-2 text-sm text-gray-600">Sign in to Roam Cars</p>
        </div>

        {/* এরর মেসেজ দেখানোর জায়গা */}
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-3 rounded text-sm font-medium">
            {error}
          </div>
        )}

        {/* লগিন ফর্ম */}
        <form onSubmit={handleLogin} className="space-y-5">
          
          {/* ইমেইল ইনপুট */}
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

          {/* পাসওয়ার্ড ইনপুট */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label className="block text-sm font-semibold text-gray-700">Password</label>
              <button
                type="button"
                onClick={() => setIsResetOpen(true)}
                className="text-xs text-blue-600 hover:text-blue-800 hover:underline font-medium"
              >
                Forgot Password?
              </button>
            </div>
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
          </div>

          {/* সাবমিট বাটন */}
          <button
            type="submit"
            disabled={loading}
            className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-colors"
          >
            {loading ? <span className="loading loading-spinner loading-xs"></span> : "Sign In"}
          </button>
        </form>

        {/* ডিভাইডার */}
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-200"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-3 bg-white text-gray-500 font-medium">Or continue with</span>
          </div>
        </div>

        {/* গুগল লগিন বাটন */}
        <button
          onClick={handleGoogleLogin}
          type="button"
          className="w-full flex items-center justify-center gap-3 py-2.5 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-sm font-semibold text-gray-700 hover:bg-gray-50 hover:text-gray-900 transition-all active:scale-[0.98]"
        >
          <FaGoogle className="text-red-500 text-lg" />
          Sign in with Google
        </button>

        {/* রেজিস্ট্রেশন লিংক */}
        <div className="text-center text-sm text-gray-600 mt-4">
          Don't have an account?{" "}
          <Link href="/registerpage" className="font-bold text-blue-600 hover:text-blue-500 hover:underline">
            Register now
          </Link>
        </div>
      </div>

      {/* --- Forgot Password Modal --- */}
      {isResetOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 px-4 transition-opacity">
          <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative animate-fadeIn">
            <button 
              onClick={() => setIsResetOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 text-2xl font-light"
            >
              &times;
            </button>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Reset Password</h3>
            <p className="text-sm text-gray-500 mb-5">Enter your email address and  send you a link to reset your password.</p>
            
            {resetMessage && (
               <div className="mb-4 text-sm font-medium text-green-700 bg-green-100 p-3 rounded-lg border border-green-200">
                 {resetMessage}
               </div>
            )}
            
            <form onSubmit={handleResetPassword}>
              <div className="mb-4">
                <label className="block text-xs font-bold text-gray-500 uppercase mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="name@example.com"
                  className="w-full border border-gray-300 rounded-lg p-2.5 outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                />
              </div>
              <button 
                type="submit"
                className="w-full bg-gray-900 text-white py-2.5 rounded-lg font-bold hover:bg-gray-800 transition shadow-lg"
              >
                Send Reset Link
              </button>
            </form>
          </div>
        </div>
      )}
      {/* --- End Modal --- */}

    </div>
  );
};

export default LoginPage;