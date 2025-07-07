import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  signInStart,
  signinSuccess,
  signinFailure,
} from "../redux/user/userSlice";
import Oauth from "../components/Oauth";
import { motion } from "framer-motion";
import { LogIn } from "lucide-react";

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch(
        // `${import.meta.env.VITE_BACKEND_URL}/api/auth/signin`,
        `/api/auth/signin`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(signinFailure(data.message));
        return;
      }
      dispatch(signinSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signinFailure(error.message));
    }
  };

  return (
    <motion.div
      className="p-6 max-w-md mx-auto bg-white shadow-md rounded-lg mt-10"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex items-center justify-center gap-2 mb-6">
        <LogIn className="w-6 h-6 text-slate-700" />
        <h1 className="text-3xl font-bold text-slate-700">Sign In</h1>
      </div>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
          id="email"
          onChange={handleChange}
        />
        <input
          type="password"
          placeholder="Password"
          className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-slate-600"
          id="password"
          onChange={handleChange}
        />
        <button
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:bg-slate-800 transition disabled:opacity-50"
          disabled={loading}
        >
          {loading ? "Loading..." : "Sign In"}
        </button>
        <Oauth />
      </form>
      <div className="flex gap-2 mt-5 justify-center">
        <p className="text-slate-600">Don't have an account?</p>
        <Link
          to="/sign-up"
          className="text-blue-700 font-semibold hover:underline"
        >
          Sign Up
        </Link>
      </div>
      {error && <p className="text-red-500 text-center mt-3">{error}</p>}
    </motion.div>
  );
};

export default SignIn;
