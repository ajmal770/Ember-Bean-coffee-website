import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, LogOut, Check, X } from "lucide-react";

export default function ConfirmationModal({
  isOpen,
  title = "Are you sure?",
  message = "Please confirm this action to proceed.",
  confirmText = "Confirm",
  cancelText = "Cancel",
  isDestructive = false,
  onConfirm,
  onCancel,
}) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 15 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="w-full max-w-md bg-brand-deepBlack border border-brand-gold/40 rounded-3xl p-6 shadow-2xl space-y-5 text-left"
          >
            {/* Modal Header Icon */}
            <div className="flex items-center space-x-3.5">
              <div
                className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                  isDestructive
                    ? "bg-red-500/10 border-red-500/30 text-red-400"
                    : "bg-brand-gold/15 border-brand-gold/30 text-brand-gold"
                }`}
              >
                {isDestructive ? (
                  <AlertTriangle className="w-5 h-5 stroke-[2.2]" />
                ) : (
                  <LogOut className="w-5 h-5 stroke-[2.2]" />
                )}
              </div>
              <div>
                <h3 className="font-heading text-lg font-bold text-brand-cream">
                  {title}
                </h3>
                <span className="text-[10px] font-accent uppercase tracking-widest text-brand-gold font-bold">
                  EMBER & BEAN CONFIRMATION
                </span>
              </div>
            </div>

            {/* Message Body */}
            <p className="text-xs sm:text-sm text-brand-cream/70 leading-relaxed font-body">
              {message}
            </p>

            {/* Action Buttons */}
            <div className="pt-2 flex items-center justify-end space-x-3 border-t border-brand-warmSand/10">
              <button
                type="button"
                onClick={onCancel}
                className="px-5 py-2.5 rounded-2xl bg-brand-vantablack hover:bg-brand-warmSand/10 border border-brand-warmSand/20 text-brand-cream text-xs font-accent font-semibold transition-all cursor-pointer"
              >
                {cancelText}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                className={`px-6 py-2.5 rounded-2xl text-xs font-accent font-bold transition-all cursor-pointer shadow-lg ${
                  isDestructive
                    ? "bg-red-600 hover:bg-red-500 text-white shadow-red-900/30"
                    : "bg-brand-gold hover:bg-brand-gold/90 text-brand-deepBlack shadow-brand-gold/20"
                }`}
              >
                {confirmText}
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

