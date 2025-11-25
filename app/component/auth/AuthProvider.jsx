// providers/AuthProvider.jsx
"use client"; // Next.js এ Context API এর জন্য এটি মাস্ট

import React, { createContext, useState, useEffect, useContext } from "react";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  updateProfile,
  sendPasswordResetEmail, // এটি ইমপোর্ট করা হয়েছে
} from "firebase/auth";
import { auth } from "../../Firebase/Firebase"; // সঠিক পাথ দিন

export const AuthContext = createContext(null);

// Custom Hook (যাতে বারবার useContext কল করতে না হয়)
export const useAuth = () => {
  return useContext(AuthContext);
};

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Create User & Update Profile together
  const createUser = (email, password, displayName, photoURL) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        // একাউন্ট খোলার সাথে সাথে নাম ও ছবি আপডেট করা হবে
        return updateProfile(result.user, {
          displayName: displayName,
          photoURL: photoURL,
        });
      })
      .finally(() => setLoading(false));
  };

  // Login with Email/Password
  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() =>
        setLoading(false)
      );
  };

  // Google Login
  const googleProvider = new GoogleAuthProvider();
  const signInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider).finally(() =>
      setLoading(false)
    );
  };

  // Logout
  const logOut = () => {
    setLoading(true);
    return signOut(auth).finally(() => setLoading(false));
  };

  // Update Profile later
  const updateUserProfile = (name, photoURL) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoURL,
    });
  };

  // Forget Password (নতুন যোগ করা হয়েছে)
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  // Observer
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  const authInfo = {
    user,
    loading,
    createUser,
    signInUser,
    signInWithGoogle,
    logOut,
    updateUserProfile,
    resetPassword, // এটি এক্সপোর্ট করা হলো
  };

  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;