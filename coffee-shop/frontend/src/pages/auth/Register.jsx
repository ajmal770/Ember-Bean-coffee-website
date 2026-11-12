import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import {
  User,
  Mail,
  Phone,
  Lock,
  Eye,
  EyeOff,
  UserPlus,
  Sparkles,
  AlertCircle,
  CheckCircle2,
} from "lucide-react";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [localError, setLocalError] = useState("");

  const { register, authLoading, authError } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!name || !email || !password || !confirmPassword) {
      setLocalError("Please fill out all required fields.");
      return;
    }

    if (password.length < 6) {
      setLocalError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setLocalError("Passwords do not match.");
      return;
    }

    const res = await register({
      name,
      email,
      phone,
      password,
    });

    if (res.success) {
      navigate("/profile", { replace: true });
    }
  };

  const errorMessage = localError || authError;

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen flex items-center justify-center bg-brand-vantablack text-brand-cream relative overflow-hidden select-none">
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-brand-gold/[0.04] rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-brand-deepBlack border border-brand-warmSand/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-left space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-vantablack border border-brand-gold/40 flex items-center justify-center text-brand-gold mx-auto shadow-md shadow-brand-gold/10">
            <UserPlus className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-[9px] font-accent uppercase tracking-[0.25em] text-brand-gold font-bold block">
            Exclusive Membership
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-cream tracking-tight">
            Join EMBER & BEAN
          </h1>
          <p className="text-xs text-brand-cream/60 font-body">
            Register your patron profile to save delivery addresses and track artisanal receipts.
          </p>
        </div>

        {errorMessage && (
          <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-start space-x-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-3.5">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-accent text-brand-cream/80 font-bold">
              Full Name *
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-brand-gold/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Liam Sterling"
                className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold/70 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Email */}
          <div className="space-y-1">
            <label className="block text-xs font-accent text-brand-cream/80 font-bold">
              Email Address *
            </label>
            <div className="relative">
              <Mail className="w-4 h-4 text-brand-gold/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="liam@example.com"
                className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold/70 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Phone */}
          <div className="space-y-1">
            <label className="block text-xs font-accent text-brand-cream/80 font-bold">
              Phone Number
            </label>
            <div className="relative">
              <Phone className="w-4 h-4 text-brand-gold/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="+91 98200 12345"
                className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold/70 focus:outline-none transition-all"
              />
            </div>
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="block text-xs font-accent text-brand-cream/80 font-bold">
              Create Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-gold/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="At least 6 characters"
                className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl pl-10 pr-10 py-2.5 text-xs text-brand-cream focus:border-brand-gold/70 focus:outline-none transition-all font-mono"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-brand-cream/40 hover:text-brand-cream"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Confirm Password */}
          <div className="space-y-1">
            <label className="block text-xs font-accent text-brand-cream/80 font-bold">
              Confirm Password *
            </label>
            <div className="relative">
              <Lock className="w-4 h-4 text-brand-gold/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type={showPassword ? "text" : "password"}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Repeat password"
                className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold/70 focus:outline-none transition-all font-mono"
              />
            </div>
          </div>

          <div className="pt-1">
            <button
              type="submit"
              disabled={authLoading}
              className="w-full py-3 rounded-2xl bg-brand-gold hover:bg-brand-gold/90 text-brand-deepBlack font-accent text-xs uppercase tracking-widest font-black shadow-lg shadow-brand-gold/20 flex items-center justify-center space-x-2 transition-all duration-300 disabled:opacity-50 cursor-pointer"
            >
              {authLoading ? (
                <div className="w-4 h-4 border-2 border-brand-deepBlack border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <UserPlus className="w-4 h-4" />
                  <span>Create Account</span>
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-2 border-t border-brand-warmSand/10">
          <p className="text-xs text-brand-cream/60">
            Already registered?{" "}
            <Link to="/" className="text-brand-gold font-bold hover:underline">
              Return to Experience
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

