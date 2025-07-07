import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { UserPlus } from "lucide-react";
import Oauth from "../components/Oauth";

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      if (data.success === false) {
        setLoading(false);
        setError(data.message);
        return;
      }
      setLoading(false);
      setError(null);
      navigate("/sign-in");
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <motion.div
      className="p-6 max-w-md mx-auto bg-white rounded-xl shadow-lg border mt-10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="flex items-center justify-center gap-2 mb-6">
        <UserPlus className="w-6 h-6 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-700">Sign Up</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="text"
          placeholder="Username"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          id="username"
          onChange={handleChange}
        />
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-300"
          id="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-blue-700 transition disabled:opacity-75"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign Up"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5 text-sm justify-center">
        <p>Have an account?</p>
        <Link to="/sign-in" className="text-blue-700 hover:underline">
          Sign In
        </Link>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-4 text-center">{error}</p>
      )}
    </motion.div>
  );
};

export default SignUp;
