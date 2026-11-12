import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Lock, Eye, EyeOff, CheckCircle2, ArrowRight, AlertCircle, ShieldCheck } from "lucide-react";

export default function ResetPassword() {
  const [searchParams] = useSearchParams();
  const emailParam = searchParams.get("email") || "";

  const [email, setEmail] = useState(emailParam);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const handleReset = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !newPassword || !confirmPassword) {
      setError("Please complete all fields.");
      return;
    }

    if (newPassword.length < 6) {
      setError("New password must be at least 6 characters.");
      return;
    }

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    const res = resetPassword(email, newPassword);
    if (res.success) {
      setSuccess(true);
      setTimeout(() => {
        navigate("/profile", { replace: true });
      }, 2000);
    } else {
      setError(res.error || "Failed to reset password.");
    }
  };

  return (
    <div className="pt-28 pb-20 px-4 min-h-screen flex items-center justify-center bg-brand-vantablack text-brand-cream relative overflow-hidden select-none">
      <div className="absolute top-1/4 left-1/3 w-96 h-96 bg-brand-gold/[0.04] rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-md bg-brand-deepBlack border border-brand-warmSand/20 rounded-3xl p-6 sm:p-8 shadow-2xl relative z-10 text-left space-y-6"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl bg-brand-vantablack border border-brand-gold/40 flex items-center justify-center text-brand-gold mx-auto shadow-md shadow-brand-gold/10">
            <ShieldCheck className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-[9px] font-accent uppercase tracking-[0.25em] text-brand-gold font-bold block">
            Demo Security Renewal
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-cream tracking-tight">
            Set New Password
          </h1>
          <p className="text-xs text-brand-cream/60 font-body">
            Choose a new security passphrase for your EMBER & BEAN profile.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-start space-x-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {success ? (
          <div className="p-5 rounded-3xl bg-green-950/30 border border-green-500/40 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto" />
            <h3 className="font-heading text-base font-bold text-brand-cream">
              Password Updated Successfully!
            </h3>
            <p className="text-xs text-brand-cream/70 font-body">
              Your new password is now stored in Browser Local Storage. Redirecting you to sign in...
            </p>
          </div>
        ) : (
          <form onSubmit={handleReset} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-accent text-brand-cream/80 font-bold">
                Account Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="customer@emberandbean.com"
                className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl px-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold/70 focus:outline-none transition-all font-mono"
              />
            </div>

            <div className="space-y-1.5">
              <label className="block text-xs font-accent text-brand-cream/80 font-bold">
                New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-gold/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
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

            <div className="space-y-1.5">
              <label className="block text-xs font-accent text-brand-cream/80 font-bold">
                Confirm New Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-brand-gold/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Repeat new password"
                  className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold/70 focus:outline-none transition-all font-mono"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-brand-gold hover:bg-brand-gold/90 text-brand-deepBlack font-accent text-xs uppercase tracking-widest font-black shadow-lg shadow-brand-gold/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Save New Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="text-center pt-2 border-t border-brand-warmSand/10">
          <Link to="/" className="text-xs text-brand-gold hover:underline font-accent">
            Back to Home
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

