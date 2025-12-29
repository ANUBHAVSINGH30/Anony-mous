import React, { useState } from "react";
import { Link } from "react-router-dom";

function SignUp() {

  return (
    <div className="min-h-screen flex items-center justify-center"
    style={{
      backgroundImage: "url('/background.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat"
    }}
    >
<div className="bg-white/20 backdrop-blur-md w-full max-w-sm rounded-2xl p-8
                shadow-[0_20px_50px_rgba(0,0,0,0.35)]
                border border-white/30
                transition-transform duration-300 hover:scale-105">        
        {/* Heading */}
        <h1 className="text-3xl font-bold text-center text-slate-900 mb-2">
          Sign Up
        </h1>
        <p className="text-sm text-center text-slate-600 mb-6">
          Create new Account
        </p>

        {/* Name (optional, can be removed later) */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 px-4 py-2 rounded-lg border border-slate-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 px-4 py-2 rounded-lg border border-slate-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 px-4 py-2 rounded-lg border border-slate-300
                     focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Primary action */}
        <button
          className="w-full bg-blue-600 text-white py-2 rounded-lg
                     font-semibold hover:bg-blue-700 transition-all
                     active:scale-95 mb-4"
        >
          Sign Up
        </button>

        {/* Secondary action */}
        <p className="text-sm text-center text-slate-600">
          Already have an account?{" "}
          <Link
            to="/signin"
            className="text-blue-600 font-medium cursor-pointer hover:underline"
          >
            Sign In
          </Link>
        </p>
      </div>
    </div>  
  );
}

export default SignUp;
