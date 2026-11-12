import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { Mail, ArrowLeft, ArrowRight, KeyRound, AlertCircle, Sparkles } from "lucide-react";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [demoApproved, setDemoApproved] = useState(false);

  const { requestDemoReset } = useAuth();
  const navigate = useNavigate();

  const handleRequest = (e) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Please enter your registered email address.");
      return;
    }

    const res = requestDemoReset(email);
    if (!res.success) {
      setError(res.error || "No account found with this email.");
      return;
    }

    setDemoApproved(true);
  };

  const handleProceed = () => {
    navigate(`/reset-password?email=${encodeURIComponent(email)}`);
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
            <KeyRound className="w-6 h-6 stroke-[2]" />
          </div>
          <span className="text-[9px] font-accent uppercase tracking-[0.25em] text-brand-gold font-bold block">
            Demo Recovery
          </span>
          <h1 className="font-heading text-2xl sm:text-3xl font-extrabold text-brand-cream tracking-tight">
            Reset Password
          </h1>
          <p className="text-xs text-brand-cream/60 font-body">
            Verify your registered account email to proceed with local credential renewal.
          </p>
        </div>

        {error && (
          <div className="p-3.5 rounded-2xl bg-red-950/40 border border-red-500/40 flex items-start space-x-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {!demoApproved ? (
          <form onSubmit={handleRequest} className="space-y-4">
            <div className="space-y-1.5">
              <label className="block text-xs font-accent text-brand-cream/80 font-bold">
                Registered Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-brand-gold/60 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. customer@emberandbean.com"
                  className="w-full bg-brand-vantablack border border-brand-warmSand/20 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-brand-cream focus:border-brand-gold/70 focus:outline-none transition-all"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 rounded-2xl bg-brand-gold hover:bg-brand-gold/90 text-brand-deepBlack font-accent text-xs uppercase tracking-widest font-black shadow-lg shadow-brand-gold/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Verify Registered Email</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        ) : (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-brand-vantablack border border-brand-gold/40 space-y-2 text-xs">
              <span className="text-brand-gold font-bold block uppercase tracking-wider text-[10px]">
                Demo Verification Authorized
              </span>
              <p className="text-brand-cream/80 font-body leading-relaxed">
                Found active account for <strong className="text-brand-cream">{email}</strong>. In this browser demo, no external email server is called. Click below to enter your new password directly.
              </p>
            </div>

            <button
              type="button"
              onClick={handleProceed}
              className="w-full py-3 rounded-2xl bg-brand-gold hover:bg-brand-gold/90 text-brand-deepBlack font-accent text-xs uppercase tracking-widest font-black shadow-lg shadow-brand-gold/20 flex items-center justify-center space-x-2 transition-all cursor-pointer"
            >
              <span>Continue to New Password</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        )}

        <div className="text-center pt-2 border-t border-brand-warmSand/10">
          <Link
            to="/"
            className="inline-flex items-center space-x-2 text-xs text-brand-cream/60 hover:text-brand-gold font-accent"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Return to Home</span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

