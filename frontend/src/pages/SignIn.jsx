import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useToast } from "../context/ToastContext";
import { generateAlias } from "../utils/generateAlias";

if (!localStorage.getItem("alias")) {
  localStorage.setItem("alias", generateAlias());
}

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();
  const { signIn } = useAuth();
  const { showSuccess, showInfo } = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Show message from signup redirect
  useEffect(() => {
    if (location.state?.message) {
      showInfo(location.state.message);
    }
  }, [location.state]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!formData.email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password");
      return;
    }

    setLoading(true);

    const { data, error: signInError } = await signIn(
      formData.email,
      formData.password
    );

    setLoading(false);

    if (signInError) {
      setError(signInError.message);
      return;
    }

    // Success - show toast and redirect to feed
    showSuccess("Signed in successfully!");
    setTimeout(() => {
      navigate("/feed");
    }, 500);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center bg-linear-to-br from-purple-500 to-pink-500"
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
          Sign In
        </h1>
        <p className="text-sm text-center text-slate-600 mb-6">
          Welcome back! Please enter your details
        </p>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={loading}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-slate-300
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Password */}
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            disabled={loading}
            className="w-full mb-6 px-4 py-2 rounded-lg border border-slate-300
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Primary action */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg
                       font-semibold hover:bg-blue-700 transition-all
                       active:scale-95 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        {/* Secondary action */}
        <p className="text-sm text-center text-slate-600">
          Don’t have an account?{" "}
          <Link
            to="/signup"
            className="text-blue-600 font-medium hover:underline"
            >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}

export default SignIn;
