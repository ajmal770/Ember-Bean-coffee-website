import React from "react";
import { Navigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ShieldAlert, ArrowLeft, Crown } from "lucide-react";

export default function RoleProtectedRoute({ children, allowedRoles = [] }) {
  const { currentUser, isAuthenticated, role, switchDemoUser } = useAuth();
  const location = useLocation();

  if (!isAuthenticated || !currentUser) {
    // If not authenticated, redirect to home page
    return <Navigate to="/" replace />;
  }

  // Check role authorization
  if (allowedRoles.length > 0 && !allowedRoles.includes(role)) {
    return (
      <div className="pt-32 pb-24 px-4 max-w-2xl mx-auto min-h-[75vh] flex items-center justify-center text-center">
        <div className="p-8 sm:p-10 rounded-3xl bg-brand-deepBlack border border-brand-gold/30 shadow-2xl space-y-6">
          <div className="w-16 h-16 rounded-full bg-red-500/10 border border-red-500/30 flex items-center justify-center mx-auto text-red-400">
            <ShieldAlert className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-accent uppercase tracking-widest text-red-400 font-bold">
              Access Restricted
            </span>
            <h2 className="font-heading text-2xl sm:text-3xl font-bold text-brand-cream">
              Insufficient Privileges
            </h2>
            <p className="text-xs sm:text-sm text-brand-cream/60 leading-relaxed font-body max-w-md mx-auto">
              Your account currently has the <strong className="text-brand-gold">{role}</strong> role, but this portal requires <strong className="text-brand-cream">{allowedRoles.join(" or ")}</strong> privileges.
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-brand-vantablack border border-brand-warmSand/20 text-brand-cream text-xs font-accent font-semibold hover:border-brand-gold transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Return Home</span>
            </Link>
            <button
              type="button"
              onClick={() => switchDemoUser("SUPER_ADMIN")}
              className="flex items-center space-x-2 px-5 py-2.5 rounded-2xl bg-brand-gold text-brand-deepBlack text-xs font-accent font-bold hover:shadow-lg hover:shadow-brand-gold/20 transition-all cursor-pointer"
            >
              <Crown className="w-4 h-4" />
              <span>Switch to Super Admin</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return children;
}

