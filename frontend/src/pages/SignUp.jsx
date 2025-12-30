import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

function SignUp() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!formData.name.trim()) {
      setError("Please enter your name");
      return;
    }

    if (!formData.email.trim()) {
      setError("Please enter your email");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { data, error: signUpError } = await signUp(
      formData.email,
      formData.password,
      formData.name
    );

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    // Show success message
    setSuccess(true);
    
    // Redirect to signin after 3 seconds
    setTimeout(() => {
      navigate("/signin", { state: { message: "Account created! Please sign in." } });
    }, 3000);
  };

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

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 rounded-lg bg-red-100 border border-red-300 text-red-700 text-sm">
            {error}
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="mb-4 p-4 rounded-lg bg-green-100 border border-green-300 text-green-800">
            <div className="flex items-center gap-2 mb-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <p className="font-semibold">Account Created Successfully!</p>
            </div>
            <p className="text-sm">A confirmation email has been sent to <strong>{formData.email}</strong>.</p>
            <p className="text-sm mt-1">Redirecting to sign in page...</p>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Name */}
          <input
            type="text"
            name="name"
            placeholder="Anonymous Username"
            value={formData.name}
            onChange={handleChange}
            disabled={loading}
            className="w-full mb-4 px-4 py-2 rounded-lg border border-slate-300
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />

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
            placeholder="Password (min 6 characters)"
            value={formData.password}
            onChange={handleChange}
            disabled={loading || success}
            className="w-full mb-6 px-4 py-2 rounded-lg border border-slate-300
                       focus:outline-none focus:ring-2 focus:ring-blue-500
                       disabled:opacity-50 disabled:cursor-not-allowed"
          />

          {/* Primary action */}
          <button
            type="submit"
            disabled={loading || success}
            className="w-full bg-blue-600 text-white py-2 rounded-lg
                       font-semibold hover:bg-blue-700 transition-all
                       active:scale-95 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : success ? "Success!" : "Sign Up"}
          </button>
          {/* <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-2 rounded-lg
                       font-semibold hover:bg-blue-700 transition-all
                       active:scale-95 mb-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button> */}
        </form>

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
